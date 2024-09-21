/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DocumentoDeCesionService from 'utils/services/documento-cesion-service';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import DocumentoDeEmpresaService from 'utils/services/documento-empresa-service';
import DocumentoRepresentanteService from 'utils/services/documento-representante-service';
import FacturasService from 'utils/services/facturas-service';
import PagareService from 'utils/services/pagare-service';
import TomaRazonService from 'utils/services/toma-razon-service';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spinner } from '@shared/components/Spinner';
import { InputCalendar } from '@shared/form';
import {
  tipoAccionRequerida,
  tipoDocumento,
  tipoDocumentoString,
} from '@shared/utils/constants';
import { toLocalFormat } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';
import { downloadFile } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';
import Modal from '@shared/components/Legacy/Modal';

import Afterbanks from 'components/Afterbanks';
import BasicTempalte from 'components/Dialogs/BasicTemplate';
import FirmaDevolverPagare from 'components/Dialogs/FirmaDevolverPagare';
import FirmaTomaRazon from 'components/Dialogs/FirmaTomaRazon';
import Pagare from 'components/Dialogs/Pagare';
import SubirDocumento from 'components/Dialogs/SubirDocumento';
import SubirDocumentoSiblings from 'components/Dialogs/SubirDocumentoSiblings';
import {
  efectoTableColumns,
  empresaTableColumns,
  operacionTableColumns,
} from 'components/DocumentacionRequerida/tableColumns';
import { FileUploader } from 'components/FileUploader';
import TableWrapper from 'components/TableWrapper';
import VincularFacturaPagare from 'components/VincularFacturaPagare';
import { DocumentacionRequeridaContext } from 'pages/MiDocumentacion/context';

import { TABLA_DOC_REQUERIDA_KEYS } from './constants/columns';
import EstadoDocumentoTemplate from './Templates/EstadoDocumentoTemplate';
import MotivoRechazoTemplate from './Templates/MotivoRechazoTemplate';
import TipoDocumentoTemplate from './Templates/TipoDocumentoTemplate';

import './tableDocumentacionRequerida.scss';

const documentoDeEfectoService = new DocumentoEfectoService();
const documentoDeEmpresaService = new DocumentoDeEmpresaService();
const facturaService = new FacturasService();
const pagareService = new PagareService();
const documentoDeCesionService = new DocumentoDeCesionService();
const tomaRazonService = new TomaRazonService();
const documentoDeRepresentanteService = new DocumentoRepresentanteService();

const actualDate = new Date();
const tomorrow = actualDate.setDate(actualDate.getDate() + 1);

const TableDocumentacionRequerida = ({
  tableKey,
  data,
  loading,
  handleUpload,
  isRedirect,
  fetchDataEmpresa,
  columns = [
    {
      id: 0,
      header: 'Tipo',
      body: TipoDocumentoTemplate,
      className: 'tipo__documento',
    },
    {
      id: 1,
      header: 'Estado del documento',
      body: EstadoDocumentoTemplate,
      className: 'estado__documento',
    },
    {
      id: 2,
      header: 'Motivo del rechazo',
      body: MotivoRechazoTemplate,
      className: 'motivo-rechazo__documento',
    },
  ],
  withOnRowAction = true,
}) => {
  const { actualizarDocRequeridaEmpresa, actualizarDocRequeridaEfecto } =
    useContext(DocumentacionRequeridaContext) || {};
  const rhForm = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [paramOperaciones, setParamOperaciones] = useState({
    Estados: [1, 2, 3, 4],
    SortingCriteria: '',
    MaxResultCount: 12,
    SkipCount: 0,
  });
  const [first, setFirst] = useState(0);
  const [modalSubirDoc, setModalSubirDoc] = useState(false);
  const [modalSubirDocSiblings, setModalSubirDocSiblings] = useState(false);
  const [modalPagare, setModalPagare] = useState(false);
  const [modalEnviarPagare, setModalEnviarPagare] = useState(false);
  const [isOpenTomaRazon, setIsOpenTomaRazon] = useState(false);
  const [isOpenDevolverPagare, setIsOpenDevolverPagare] = useState(false);
  const [isOpenAfterbanks, setIsOpenAfterbanks] = useState(false);
  const [isOpenDni, setIsOpenDni] = useState(false);
  const [showVincularFactura, setShowVincularFactura] = useState(false);
  const [selectedDocRequerida, setSelectedDocRequerida] = useState();
  const [disabledButton, setDisabledButton] = useState(false);
  const [dniData, setDniData] = useState({
    fechaVencimiento: '',
    numero: '',
    files: [],
  });
  const [finalData, setFinalData] = useState(data);
  const [loadingPost, setLoadingPost] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [loadingReplaceDoc, setLoadingReplaceDoc] = useState(false);
  const [tomaRazonId, setTomaRazonId] = useState(null);
  const [pdfjs, setPdfjs] = useState(null);
  const tableRef = useRef();

  const toggleAfterbanks = () =>
    setIsOpenAfterbanks((prevStatus) => !prevStatus);

  const toggleDni = () => setIsOpenDni((prevStatus) => !prevStatus);

  const toggle = (setter) => setter((prevData) => !prevData);

  const onClose = useCallback(() => {
    setModalEnviarPagare(!modalEnviarPagare);
  }, [modalEnviarPagare]);

  const resetModals = () => {
    setShowVincularFactura(false);
    setModalSubirDoc(false);
    setModalPagare(false);
    setIsOpenAfterbanks(false);
    setIsOpenDni(false);
    setIsOpenTomaRazon(false);
    setDetalle(false);
  };

  const getTomaRazonId = useCallback(async () => {
    if (!Array.isArray(data)) return;
    const tomaRazon = data.find(
      (operacion) => operacion.tipoDocumentoId === tipoDocumento.TOMA_RAZON
    );
    if (!tomaRazon) return;
    const res = await tomaRazonService.getTomaRazonIdByEfectoId(
      tomaRazon.efectoId
    );
    if (res) {
      setTomaRazonId(res);
    }
  }, [data]);

  // #region events
  const onpageChange = (event) => {
    setParamOperaciones({
      ...paramOperaciones,
      SkipCount: event.first,
    });
    setFirst(event.first);
  };

  const signTomaRazon = async (files) => {
    if (files && files[0]) {
      const b64 = await FileToBase64(files[0]);
      const blobUrl = URL.createObjectURL(files[0]);
      const doc = await pdfjs.getDocument(blobUrl).promise;
      const pages = [...new Array(doc.numPages)];
      pages.forEach(async (numPage, index) => {
        const page = await doc.getPage(index + 1);
        const content = await page.getTextContent();
        const item = content.items.find((it) => it.str === 'firma_electronica');
        if (item) {
          const lowerLeftX = Math.round(item.transform[4]);
          const lowerLeftY = Math.round(
            item.transform[5] - eSignatureDimensions.height / 2
          );
          const upperRightX = Math.round(
            item.transform[4] + eSignatureDimensions.width
          );
          const upperRightY = Math.round(
            item.transform[5] + eSignatureDimensions.height / 2
          );
          // eslint-disable-next-line no-undef
          [, pdfBase64] = b64.split(',');
          // eslint-disable-next-line no-undef
          doSignAndSave(
            {
              page: 1,
              upperRightX,
              upperRightY,
              lowerLeftX,
              lowerLeftY,
            },
            signResultCallback,
            signErrorCallback
          );
        }
      });
    }
  };

  const downloadTomaRazon = async (download = true) => {
    const file = await tomaRazonService.getTomaRazonFile(tomaRazonId);
    if (download) {
      downloadFile({ file, tipoDocumentoNombre: 'TomasDeRazon' });
    } else {
      signTomaRazon([file]);
    }
  };

  // tipoId es para Acción requerida y tipoDocumentoId es para documentación requerida.
  const onRowSelect = async (e, isRowClick) => {
    const rowData = isRowClick ? e.data : e;

    if (isRedirect) {
      return navigate({
        pathname: `/efecto/2/${e?.data.efectoId}`,
        state: { fromDocReq: true },
      });
    }
    if (rowData.tipo?.id === tipoAccionRequerida.FIRMA_CESION_NOTARIO) {
      return navigate(`/cesiones`);
    }
    if (rowData.tipo?.id === tipoAccionRequerida.ADD_REPRESENTANTE) {
      return navigate(`/firmantes`, { state: { openModalFirmante: true } });
    }
    if (rowData.tipo?.id === tipoAccionRequerida.VINCULAR_FACTURA_PAGARE) {
      setSelectedDocRequerida(rowData?.efectoId);
      return setShowVincularFactura(true);
    }
    if (rowData?.tipo?.id === tipoAccionRequerida.VALIDAR_CUENTA) {
      setDetalle(rowData?.descripcion);
      setIsOpenAfterbanks(true);
    } else if (!loading) {
      setSelectedDocRequerida({ ...e, files: [] });
      if (
        rowData?.motivoRechazo &&
        rowData?.tipoDocumentoId !== +tipoDocumentoString.TOMA_DE_RAZON
      ) {
        return setModalSubirDoc(true);
      }
      if (
        rowData?.operacionNumero &&
        rowData?.tipo?.id === tipoAccionRequerida.ENVIAR_PAGARE
      ) {
        return setModalEnviarPagare(true);
      }
      if (
        rowData?.operacionNumero &&
        rowData?.tipoDocumentoId !== +tipoDocumentoString.TOMA_DE_RAZON
      ) {
        return setModalSubirDoc(true);
      }
      switch (rowData?.tipoDocumentoId) {
        case +tipoDocumentoString.DNI:
          rowData?.representanteId && setModalSubirDocSiblings(true);
          break;
        case +tipoDocumentoString.TOMA_DE_RAZON:
          setIsOpenTomaRazon(true);
          downloadTomaRazon();
          break;
        case +tipoDocumentoString.DEVOLER_PAGARE:
          setIsOpenDevolverPagare(true);
          break;
        case +tipoDocumentoString.CESION:
          navigate(
            `/cesiones/create/false/${
              rowData?.efectoLibradoCif || rowData?.libradoCif || ''
            }/${
              rowData.efectoLibradoRazonSocial ||
              rowData.libradoRazonSocial ||
              ''
            }`
          );
          break;
        case +tipoDocumentoString.CERTIFICADO_HACIENDA:
          setModalSubirDocSiblings(true);
          break;
        case +tipoDocumentoString.CERTIFICADO_SS:
          setModalSubirDocSiblings(true);
          break;
        default:
          setModalSubirDoc(true);
          break;
      }
    }
  };

  const TableDocumentacionRequeridaColumns = () => {
    switch (tableKey) {
      case TABLA_DOC_REQUERIDA_KEYS.OPERACION:
        return operacionTableColumns(onRowSelect);
      case TABLA_DOC_REQUERIDA_KEYS.EMPRESA:
        return empresaTableColumns;
      case TABLA_DOC_REQUERIDA_KEYS.EFECTO:
        return efectoTableColumns(onRowSelect);
      default:
        return columns;
    }
  };

  const dynamicColumns = TableDocumentacionRequeridaColumns().map((col) => {
    return col.body ? (
      <Column
        key={col.id}
        body={col.body}
        header={col.header}
        className={col.className}
        style={
          col?.style || {
            textAlign: !col.align ? 'left' : col.align,
          }
        }
      />
    ) : (
      <Column
        key={col.id}
        field={col.field}
        header={col.header}
        className={col.className}
        style={col?.style || { textAlign: !col.align ? 'center' : col.align }}
      />
    );
  });

  const postPagare = async (formData, data) => {
    if (data?.files?.length === 0) {
      notifications.warning({
        body: 'Debe añadir una imagen para poder guardar el pagaré',
      });
      return;
    }
    setLoadingPost(true);
    try {
      const res = await pagareService.putPagareFileById(data, data?.efectoId);

      if (res) {
        await actualizarDocRequeridaEfecto();
        notifications.success({
          title: '¡Éxito!',
          body: 'Se ha adjuntado el pagaré correctamente.',
        });
      }
      setLoadingPost(false);
      resetModals();
    } catch {
      setLoadingPost(false);
    }
  };

  const postFactura = async (formData, data) => {
    if (!data?.files?.length) {
      return notifications.warning({
        body: 'Debe añadir una imagen para poder guardar la factura',
      });
    }
    setLoadingPost(true);
    try {
      const res = await facturaService.putFacturaFileById(data, data?.efectoId);

      if (res) {
        await actualizarDocRequeridaEfecto();
        notifications.success({
          title: '¡Éxito!',
          body: 'Se ha adjuntado la factura correctamente.',
        });
      }
      setLoadingPost(false);
      resetModals();
    } catch {
      setLoadingPost(false);
    }
  };

  const onSubmitDni = async (data) => {
    try {
      setDisabledButton(true);
      const res = await documentoDeRepresentanteService.post({
        representanteId: data?.representanteId,
        tipoDocumentoId: data?.tipoDocumentoId,
        fechaVencimiento: toLocalFormat(data?.fechaVencimiento),
      });
      if (res) {
        notifications.success({ body: 'DNI subido correctamente' });
      } else {
        notifications.warning({ body: 'Error al subir el DNI' });
      }

      resetModals();
      setIsLoading(false);
      setDisabledButton(false);
      await actualizarDocRequeridaEmpresa();
    } catch {
      notifications.warning({ body: 'Error al subir el DNI' });
      setIsLoading(false);
      setDisabledButton(false);
    }
  };

  const postDocRepresentante = async (files, data) => {
    try {
      setDisabledButton(true);
      const res = await documentoDeRepresentanteService.post(files, {
        ...data,
      });
      if (res) {
        notifications.success({ body: 'Escritura subida correctamente' });
      } else {
        notifications.warning({ body: 'Error al subir la escritura' });
      }
      resetModals();
      setIsLoading(false);
      setDisabledButton(false);
      await actualizarDocRequeridaEmpresa();
    } catch {
      setIsLoading(false);
      setDisabledButton(false);
    }
  };

  const handleReplaceFile = async (files) => {
    setLoadingReplaceDoc(true);
    let serviceCall;
    let uploadFunc = actualizarDocRequeridaEfecto;
    switch (selectedDocRequerida.tipoDocumentoId) {
      case +tipoDocumentoString.PAGARE:
        serviceCall = pagareService.postFicheroReemplazoById;
        break;
      case +tipoDocumentoString.FACTURA:
        serviceCall = facturaService.postFicheroReemplazoById;
        break;
      case +tipoDocumentoString.DNI: {
        serviceCall = documentoDeRepresentanteService.postFicheroReemplazoById;
        uploadFunc = actualizarDocRequeridaEmpresa;
        break;
      }
      case +tipoDocumentoString.CONTRATO_OBRA:
        serviceCall = documentoDeCesionService.postFicheroReemplazoById;
        uploadFunc = actualizarDocRequeridaEmpresa;
        break;
      case +tipoDocumentoString.TOMA_DE_RAZON:
        serviceCall = tomaRazonService.uploadTomaRazonFirmada;
        uploadFunc = actualizarDocRequeridaEfecto;
        break;
      default:
        if (selectedDocRequerida?.efectoId) {
          serviceCall = documentoDeEfectoService.postFicheroReemplazoById;
        } else {
          serviceCall = documentoDeEmpresaService.postFicheroReemplazoById;
          uploadFunc = actualizarDocRequeridaEmpresa;
        }
        break;
    }
    const res = await serviceCall(
      selectedDocRequerida?.documentoRechazadoId,
      files
    );
    uploadFunc && uploadFunc();
    if (res) {
      notifications.success({
        title: 'Subida realizada con éxito!',
        body: 'Se ha subido el documento requerido.',
      });
    }
    setLoadingReplaceDoc(false);
    resetModals();
  };

  useEffect(() => {
    if (data) {
      setFinalData(data);
      resetModals();
      getTomaRazonId();
    }
  }, [data, getTomaRazonId]);

  useEffect(() => {
    const initPdfLibrary = async () => {
      const auxpdfjs = await import('pdfjs-dist/build/pdf');
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

      auxpdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      setPdfjs(auxpdfjs);
    };
    initPdfLibrary();
  }, []);

  const checkUpload = (files, selectedDoc) => {
    switch (selectedDocRequerida.tipoDocumentoId) {
      case +tipoDocumentoString.PAGARE:
        postPagare(files, selectedDoc);
        break;
      case +tipoDocumentoString.FACTURA:
        postFactura(files, selectedDoc);
        break;
      case +tipoDocumentoString.ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO:
        postDocRepresentante(files, selectedDoc);
        break;
      default:
        handleUpload(files, selectedDoc);
        break;
    }
  };

  return (
    <>
      <TableWrapper data={finalData?.items || finalData} isLoading={false}>
        <div className="datatable-component datatable-responsive">
          <DataTable
            ref={tableRef}
            className="p-datatable-responsive p-datatable-striped p-datatable-not datatable-tablet datatable-app"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Hay un total de {totalRecords} documentos pendientes"
            paginator={finalData?.totalCount > finalData?.items?.length}
            selectionMode={withOnRowAction && 'single'}
            value={finalData?.items || finalData || []}
            lazy
            totalRecords={finalData?.totalCount ? finalData?.totalCount : 0}
            first={first}
            onPage={onpageChange}
            onRowSelect={(e) => withOnRowAction && onRowSelect(e, true)}
          >
            {dynamicColumns}
          </DataTable>
        </div>
      </TableWrapper>
      <SubirDocumento
        isOpen={modalSubirDoc}
        toggle={() => toggle(setModalSubirDoc)}
        cancelFunc={() => toggle(setModalSubirDoc)}
        setData={setSelectedDocRequerida}
        loading={loading || loadingPost || loadingReplaceDoc}
        data={selectedDocRequerida?.data || selectedDocRequerida}
        handleUpload={checkUpload}
        handleReplaceFile={handleReplaceFile}
        header={
          selectedDocRequerida?.data?.tipoDocumentoNombre ||
          selectedDocRequerida?.tipoDocumentoNombre
        }
      />
      <SubirDocumentoSiblings
        fetchDataEmpresa={fetchDataEmpresa}
        isOpen={modalSubirDocSiblings}
        toggle={() => toggle(setModalSubirDocSiblings)}
        cancelFunc={() => toggle(setModalSubirDocSiblings)}
        loading={loading || loadingPost}
        data={selectedDocRequerida}
        header={selectedDocRequerida?.tipoDocumentoNombre}
      />
      <Pagare
        isOpen={modalPagare}
        toggle={() => toggle(setModalPagare)}
        cancelFunc={() => toggle(setModalPagare)}
        setData={setSelectedDocRequerida}
        loading={loadingPost}
        data={selectedDocRequerida}
        submit={postPagare}
        header={selectedDocRequerida?.tipoDocumentoNombre}
      />
      <Dialog
        isOpen={isOpenAfterbanks && detalle}
        close={() => {
          toggleAfterbanks();
          setDetalle(false);
        }}
        header="Añadir cuenta bancaria"
        closeButtonLinkAppareance
        closeButtonColor="secondary"
        className="afterbanks-dialog"
      >
        <Afterbanks
          cancelar={toggleAfterbanks}
          iban={detalle}
          onPreviousStep={() => {
            setDetalle(false);
            setIsOpenAfterbanks(false);
          }}
          onNextStep={() => actualizarDocRequeridaEmpresa()}
        />
      </Dialog>
      <BasicTempalte
        isOpen={showVincularFactura}
        onCancel={() => setShowVincularFactura(false)}
        header="Vincular factura a pagaré"
        className="vincular__form"
      >
        <VincularFacturaPagare
          pagareId={selectedDocRequerida}
          setModal={() => {
            setShowVincularFactura(false);
            actualizarDocRequeridaEfecto();
          }}
        />
      </BasicTempalte>

      <Dialog
        isOpen={isOpenDni}
        close={toggleDni}
        header="DNI"
        closeButtonLinkAppareance
        closeButtonColor="secondary"
        customHeight={window.innerWidth < 1201 ? '' : 'h-4/5'}
      >
        <form
          onSubmit={rhForm.handleSubmit(onSubmitDni)}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-5">
            {isLoading ? (
              <Spinner className="flex justify-center" />
            ) : (
              <>
                <InputCalendar
                  name="fechaVencimiento"
                  label="Fecha de validez"
                  required
                  minDate={new Date(tomorrow)}
                  className="w-3/6"
                />
                <div>
                  <FileUploader
                    data={dniData}
                    setData={setDniData}
                    docType="DNI"
                    allowMultiple={
                      selectedDocRequerida?.tipoDocumentoId !==
                      tipoDocumento.TOMA_RAZON
                    }
                    maxFiles={2}
                  />
                </div>
              </>
            )}
          </div>

          {!loading && (
            <div className="flex justify-end gap-5">
              <Button
                label="Cancelar"
                color="light"
                type="button"
                onClick={toggleDni}
              />
              <Button label="Guardar" type="submit" />
            </div>
          )}
        </form>
      </Dialog>
      {isOpenTomaRazon && (
        <FirmaTomaRazon
          isOpen={isOpenTomaRazon}
          toggle={() => setIsOpenTomaRazon(!isOpenTomaRazon)}
          data={selectedDocRequerida}
          onSubmit={() => {
            actualizarDocRequeridaEmpresa();
            actualizarDocRequeridaEfecto();
            resetModals();
          }}
        />
      )}
      {isOpenDevolverPagare && (
        <FirmaDevolverPagare
          isOpen={isOpenDevolverPagare}
          toggle={() => setIsOpenDevolverPagare(!isOpenDevolverPagare)}
          data={selectedDocRequerida}
          onSubmit={() => {
            actualizarDocRequeridaEfecto();
            actualizarDocRequeridaEmpresa();
            resetModals();
          }}
        />
      )}
      {modalEnviarPagare && (
        <Modal
          className="enviar-pagare-dialog"
          isOpen={modalEnviarPagare}
          onClose={onClose}
          title="Enviar pagaré a central"
        >
          <div className="enviar-pagare-content">
            <p>
              Para dar curso a su operación de pagarés, necesitamos que envíe
              su(s) pagaré(s) físicamente{' '}
              <span className="bolder">firmado(s) por detrás</span> a través de
              MRW.{' '}
            </p>
            <p>
              Para utilizar el servicio de MRW, llame al teléfono 963801500
              utilizando el servicio BAG 19, nº oficina 04323 y de abonado 692 y
              dirija el sobre a la siguiente dirección: Calle San Vicente Mártir
              nº 81 1-1, 46007 Valencia, a la atención de Tesorería.
            </p>
            <div className="d-flex col-12 alerta-enviar-pagare align-items-center">
              <div className="icono-alerta-enviar-pagare">
                <FontAwesomeIcon icon={faCircleExclamation} color="blue" />
              </div>
              <div className="col-10">
                Esta alerta le aparecerá hasta que nuestros analistas recojan su
                pagaré y den conformidad del mismo.
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TableDocumentacionRequerida;
