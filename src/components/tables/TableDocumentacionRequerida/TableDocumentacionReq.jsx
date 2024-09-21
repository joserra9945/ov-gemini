import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spinner } from '@shared/components/Spinner';
import { InputCalendar } from '@shared/form';
import {
  useDocumento,
  useDocumentoDeCesion,
  useDocumentoDeEfecto,
  useDocumentoDeEmpresa,
  useDocumentoDeRepresentante,
  useFactura,
  usePagare,
  useTomaDeRazon,
} from '@shared/hooks';
import { tipoAccionRequerida, tipoDocumento } from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import Afterbanks from 'components/Afterbanks';
import FirmaDevolverPagare from 'components/Dialogs/FirmaDevolverPagare';
import FirmaTomaRazon from 'components/Dialogs/FirmaTomaRazon';
import Pagare from 'components/Dialogs/Pagare';
import SubirDocumento from 'components/Dialogs/SubirDocumento';
import SubirDocumentoSiblings from 'components/Dialogs/SubirDocumentoSiblings';
import { FileUploader } from 'components/FileUploader';
import VincularFacturaPagare from 'components/VincularFacturaPagare';
import { DocumentacionRequeridaContext } from 'pages/MiDocumentacion/context';

import { columns } from './constants/columns';

const TableDocumentacionReq = ({
  data,
  fetchEmpresa,
  loading,
  handleUpload,
  modalSubirDocumento,
  setModalSubirDocumento,
}) => {
  const [selectedDocRequerida, setSelectedDocRequerida] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDevolverPagare, setIsOpenDevolverPagare] = useState(false);
  const [modalEnviarPagare, setModalEnviarPagare] = useState(false);
  const [modalSubirDocumentoSibling, setModalSubirDocumentoSibling] =
    useState(false);
  const [modalPagare, setModalPagare] = useState(false);
  const [modalAfterBanks, setModalAfterBanks] = useState(false);
  const [ibanDetalle, setIbanDetalle] = useState('');
  const [modalVincularFactura, setModalVincularFactura] = useState(false);
  const [modalDni, setModalDni] = useState(false);
  const [modalTomaRazon, setModalTomaRazon] = useState(false);
  const [dni, setDni] = useState([]);

  const { actualizarDocRequeridaEmpresa, actualizarDocRequeridaEfecto } =
    useContext(DocumentacionRequeridaContext);

  const { pagareFicherosByIdPut } = usePagare();
  const { facturaFicherosByIdPut, facturaFicheroReemplazoByIdPost } =
    useFactura();
  const {
    documentoDeRepresentantePost,
    documentoDeRepresentanteFicheroReemplazoByIdPost,
  } = useDocumentoDeRepresentante();
  const { pagareFicheroReemplazoByIdPost } = usePagare();
  const { documentoDeCesionFicheroReemplazoByIdPost } = useDocumentoDeCesion();
  const { tomaDeRazonFirmarPorLibradorByIdPost, tomaDeRazonIdByEfectoIdGet } =
    useTomaDeRazon();
  const { documentoDeEfectoFicheroReemplazoByIdPost } = useDocumentoDeEfecto();
  const { documentoDeEmpresaFicheroReemplazoByIdPost } =
    useDocumentoDeEmpresa();
  const { downloadDocumentoPdfByIdGet } = useDocumento();

  const rhForm = useForm();
  const navigate = useNavigate();

  const { getValues, handleSubmit } = rhForm;

  const actualDate = new Date();
  const tomorrow = actualDate.setDate(actualDate.getDate() + 1);

  const isPagare = async (formData, selectedDoc) => {
    if (!selectedDoc?.files?.lenght) {
      return notifications.warning({
        body: 'Debe añadir una imagen para poder guardar el pagaré',
      });
    }
    setIsLoading(true);
    await pagareFicherosByIdPut(selectedDoc, selectedDoc?.efectoId);
    await actualizarDocRequeridaEfecto();
    setIsLoading(false);
    setModalSubirDocumento(false);
  };

  const isFactura = async (formData, selectedDoc) => {
    if (!selectedDoc?.files.length) {
      return notifications.warning({
        body: 'Debe añadir una imagen para poder guardar la factura',
      });
    }
    setIsLoading(true);
    await facturaFicherosByIdPut(selectedDoc, selectedDoc?.efectoId);
    await actualizarDocRequeridaEfecto();
    setIsLoading(false);
    setModalSubirDocumento(false);
  };

  const isDocRepresentante = async (formData, selectedDoc) => {
    setIsLoading(true);
    await documentoDeRepresentantePost(formData, selectedDoc);
    await actualizarDocRequeridaEmpresa();
    setIsLoading(false);
    setModalSubirDocumento(false);
  };

  const isDni = async () => {
    setIsLoading(true);
    const { fechaVencimiento } = getValues();
    const {
      representanteId,
      empresaExternaId: empresaId,
      tipoDocumentoId,
    } = selectedDocRequerida;
    const postData = {
      representanteId,
      empresaId,
      tipoDocumentoId,
      fechaVencimiento,
    };
    await documentoDeRepresentantePost(dni.files, postData);
    await actualizarDocRequeridaEmpresa();
    setModalDni(false);
    setIsLoading(false);
  };

  const checkUpload = (files, selectedDoc) => {
    setIsLoading(true);
    switch (selectedDocRequerida.tipoDocumentoId) {
      case +tipoDocumento.PAGARE:
        isPagare(files, selectedDoc);
        break;
      case +tipoDocumento.FACTURA:
        isFactura(files, selectedDoc);
        break;
      case +tipoDocumento.ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO:
        isDocRepresentante(files, selectedDoc);
        break;
      default:
        handleUpload(files, selectedDoc);
        break;
    }
    setIsLoading(false);
  };

  const handleReplaceFile = async (files) => {
    setIsLoading(true);
    switch (selectedDocRequerida.tipoDocumentoId) {
      case tipoDocumento.PAGARE:
        await pagareFicheroReemplazoByIdPost(
          selectedDocRequerida?.documentoRechazadoId,
          files
        );
        break;
      case tipoDocumento.FACTURA:
        await facturaFicheroReemplazoByIdPost(
          selectedDocRequerida?.documentoRechazadoId,
          files
        );
        break;
      case tipoDocumento.DNI:
        await documentoDeRepresentanteFicheroReemplazoByIdPost(
          selectedDocRequerida?.documentoRechazadoId,
          files
        );
        actualizarDocRequeridaEmpresa();
        break;
      case tipoDocumento.CONTRATO_OBRA:
        await documentoDeCesionFicheroReemplazoByIdPost(
          selectedDocRequerida?.documentoRechazadoId,
          files
        );
        actualizarDocRequeridaEmpresa();
        break;
      case tipoDocumento.TOMA_RAZON:
        await tomaDeRazonFirmarPorLibradorByIdPost(
          selectedDocRequerida?.documentoRechazadoId
        );
        actualizarDocRequeridaEfecto();
        break;
      default:
        if (selectedDocRequerida?.efectoId) {
          await documentoDeEfectoFicheroReemplazoByIdPost(
            selectedDocRequerida?.documentoRechazadoId,
            files
          );
        } else {
          await documentoDeEmpresaFicheroReemplazoByIdPost(
            selectedDocRequerida?.documentoRechazadoId,
            files
          );
          actualizarDocRequeridaEmpresa();
        }
        break;
    }
    setModalSubirDocumento(false);
    setIsLoading(false);
  };

  const onClickAction = async (rowData) => {
    setSelectedDocRequerida(rowData);
    switch (rowData?.tipo?.id) {
      case +tipoAccionRequerida.VALIDAR_CUENTA:
        setIbanDetalle(rowData?.descripcion);
        return setModalAfterBanks(true);
      case +tipoAccionRequerida.FIRMA_CESION_NOTARIO:
        return navigate('/cesiones');
      case +tipoAccionRequerida.ADD_REPRESENTANTE:
        return navigate('/firmantes', { state: { openModalFirmante: true } });
      case +tipoAccionRequerida.VINCULAR_FACTURA_PAGARE:
        if (rowData?.efectoId) {
          setModalVincularFactura(true);
          setSelectedDocRequerida(rowData?.efectoId);
        }
        return;
      default:
        break;
    }
    switch (rowData?.tipoDocumentoId) {
      case +tipoDocumento.CERTIFICADO_HACIENDA:
      case +tipoDocumento.CERTIFICADO_SS:
        return setModalSubirDocumentoSibling(true);
      case +tipoDocumento.DNI:
        setSelectedDocRequerida(rowData);
        return setModalDni(true);
      case +tipoDocumento.TOMA_RAZON:
        const tomaDeRazon = data.items.find(
          (doc) => doc.tipoDocumentoId === +tipoDocumento.TOMA_RAZON
        );
        const tomaDeRazonId = await tomaDeRazonIdByEfectoIdGet(
          tomaDeRazon?.efectoId
        );
        await downloadDocumentoPdfByIdGet(tomaDeRazonId);
        setModalTomaRazon(true);
        return;
      case +tipoDocumento.DEVOLUCION_PAGARE:
        setIsOpenDevolverPagare(true);
        return;
      default:
        setModalSubirDocumento(true);
        break;
    }

    if (
      (rowData?.motivoRechazo || rowData?.operacionNumero) &&
      rowData?.tipoDocumentoId !== +tipoDocumento.TOMA_RAZON
    ) {
      setModalSubirDocumento(true);
    }
    if (
      rowData?.operacionNumero &&
      rowData?.tipo?.id === +tipoAccionRequerida.ENVIAR_PAGARE
    ) {
      setModalEnviarPagare(true);
    }
  };
  const header = (
    <div style={{ fontSize: '20px' }}>
      Documentación requerida:{' '}
      <div style={{ color: 'black', display: 'inline-block' }}>Empresa</div>
    </div>
  );

  return (
    <FormProvider {...rhForm}>
      <TurboTable
        tableTitle={header}
        columns={columns(onClickAction)}
        value={data?.items}
        isLoading={isLoading || loading}
        showColumnOptions={false}
      />
      {modalVincularFactura && (
        <Dialog
          isOpen={modalVincularFactura}
          close={() => setModalVincularFactura(false)}
        >
          <VincularFacturaPagare
            pagareId={selectedDocRequerida}
            setModal={() => {
              setModalVincularFactura(false);
              actualizarDocRequeridaEfecto();
            }}
          />
        </Dialog>
      )}
      {modalSubirDocumento && (
        <SubirDocumento
          isOpen={modalSubirDocumento}
          cancelFunc={() => setModalSubirDocumento(false)}
          onClose={() => setModalSubirDocumento(false)}
          setData={setSelectedDocRequerida}
          loading={loading || isLoading}
          header={selectedDocRequerida?.tipoDocumentoNombre}
          data={selectedDocRequerida}
          handleUpload={checkUpload}
          handleReplaceFile={handleReplaceFile}
        />
      )}
      {modalSubirDocumentoSibling && (
        <SubirDocumentoSiblings
          fetchDataEmpresa={fetchEmpresa}
          isOpen={modalSubirDocumentoSibling}
          toggle={() => setModalSubirDocumentoSibling(false)}
          cancelFunc={() => setModalSubirDocumentoSibling(false)}
          loading={loading || isLoading}
          data={selectedDocRequerida}
          header={selectedDocRequerida?.tipoDocumentoNombre}
        />
      )}
      {modalPagare && (
        <Pagare
          isOpen={modalPagare}
          toggle={() => setModalPagare(false)}
          cancelFunc={() => setModalPagare(false)}
          setData={setSelectedDocRequerida}
          loading={loading || isLoading}
          data={selectedDocRequerida}
          submit={isPagare}
          header={selectedDocRequerida?.tipoDocumentoNombre}
        />
      )}
      {modalAfterBanks && (
        <Dialog
          isOpen={modalAfterBanks}
          close={() => setModalAfterBanks(false)}
          header="Añadir cuenta bancaria"
          closeButtonLinkAppareance
          closeButtonColor="secondary"
        >
          <Afterbanks
            cancelar={() => setModalAfterBanks(false)}
            iban={ibanDetalle}
            onPreviousStep={() => {
              setModalAfterBanks(false);
            }}
            onNextStep={() => actualizarDocRequeridaEmpresa()}
          />
        </Dialog>
      )}
      {modalDni && (
        <Dialog
          isOpen={modalDni}
          close={() => setModalDni(false)}
          header="DNI"
          closeButtonLinkAppareance
          closeButtonColor="secondary"
          customHeight={window.innerWidth < 1201 ? '' : 'h-4/5'}
        >
          <form onSubmit={handleSubmit(isDni)} className="flex flex-col">
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
                      data={dni}
                      setData={setDni}
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

            {!isLoading && (
              <div className="flex justify-end gap-5">
                <Button
                  label="Cancelar"
                  color="light"
                  type="button"
                  onClick={() => setModalDni(false)}
                />
                <Button label="Guardar" type="submit" />
              </div>
            )}
          </form>
        </Dialog>
      )}
      {modalTomaRazon && (
        <FirmaTomaRazon
          isOpen={modalTomaRazon}
          toggle={() => setModalTomaRazon(false)}
          data={selectedDocRequerida}
          onSubmit={() => {
            actualizarDocRequeridaEfecto();
            actualizarDocRequeridaEmpresa();
            setModalTomaRazon(false);
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
            setIsOpenDevolverPagare(false);
          }}
        />
      )}
      {modalEnviarPagare && (
        <Dialog
          isOpen={modalEnviarPagare}
          onClose={() => setModalEnviarPagare(false)}
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
              utilizando el servicio BAG 19 a portes debidos y dirija el sobre a
              la siguiente dirección: Av. de Aragón nº 2 Bis Entlo.- 46021
              Valencia. A la atención de Tesorería.
            </p>
            <div className="flex items-center w-full alerta-enviar-pagare">
              <div className="icono-alerta-enviar-pagare">
                <FontAwesomeIcon icon={faCircleExclamation} color="blue" />
              </div>
              <div className="w-5/6">
                Esta alerta le aparecerá hasta que nuestros analistas recojan su
                pagaré y den conformidad del mismo.
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </FormProvider>
  );
};

export default TableDocumentacionReq;
