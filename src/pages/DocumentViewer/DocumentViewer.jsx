import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import EfectoService from 'utils/services/efectos-service';
import FacturasService from 'utils/services/facturas-service';
import { faDownload, faInfo, faUndo } from '@fortawesome/pro-light-svg-icons';

import { useDocumentoDeFinanciacion, useFichero } from '@shared/hooks';
import {
  estadosRevisionDocumentos,
  initialQueryState,
  tipoDocumentoString,
} from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';
import { binaryToBlob } from '@shared/utils/utils';

import { Button } from '@shared/components/Legacy/Button';

import DocumentViewerComponent from '../../components/DocumentViewer';
import { tableColumns } from '../../components/DocumentViewer/tableColumns';

import './documentViewer.scss';

const documentoEfectoService = new DocumentoEfectoService();
const efectoService = new EfectoService();
const facturasService = new FacturasService();

const DocumentViewer = () => {
  const { documentoDeFinanciacionByFinanciacionIdGet } =
    useDocumentoDeFinanciacion();
  const params = useParams();
  const [, setEffectId] = useState();
  const [documents, setDocuments] = useState([]);
  const [selectedBase64, setSelectedBase64] = useState();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [rowSelected, setRowSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isAdUser } = useSelector((store) => store.userState);
  const { ficheroPDFByDocumentoIdGet } = useFichero();

  const prepareResponseToTable = async (res, effect, effectFile) => {
    let parsedItems = cloneDeep(res.items);
    parsedItems = await Promise.all(
      parsedItems.map(async (item) => {
        const itemFile = !item.esFicticio
          ? await documentoEfectoService.getFicheroInPDFById(item.id)
          : null;
        return { ...item, file: itemFile };
      })
    );
    const newItems = cloneDeep(parsedItems);
    if (effect && Array.isArray(newItems)) {
      newItems.unshift({
        motivoRequerimiento: '',
        tipoDocumentoNombre: effect.tipoDocumentoNombre,
        tipoDocumentoId: effect.tipoDocumentoId,
        estadoRevisionId: effect.estadoRevisionId,
        estadoRevisionNombre: effect.estadoRevisionNombre,
        estadoRevisionDescripcion: effect.estadoRevisionDescripcion,
        id: effect.id,
        file: effectFile,
      });
    }

    setSelectedBase64(newItems[0]?.file);
    setRowSelected(newItems[0]);
    setIsLoading(false);
    return { ...res, items: newItems };
  };

  const prepareContratoResponseToTable = useCallback(
    async (documentosOperacion) => {
      if (documentosOperacion?.items) {
        let parsedItems = cloneDeep(documentosOperacion.items);
        parsedItems = await Promise.all(
          parsedItems.map(async (item) => {
            const itemFile = !item.esFicticio
              ? await ficheroPDFByDocumentoIdGet(item.id)
              : null;
            return { ...item, file: itemFile };
          })
        );
        setDocuments({ ...documentosOperacion, items: parsedItems });
        setSelectedBase64(parsedItems[0]?.file);
        setRowSelected(parsedItems[0]);
      }
      setIsLoading(false);
    },
    [ficheroPDFByDocumentoIdGet]
  );

  const getCurrencyFormat = (importe) => {
    const options = { style: 'currency', currency: 'EUR' };
    const currencyFormat = new Intl.NumberFormat('es-ES', options);
    let importeNominal = '';
    if (!Number.isNaN(importe)) {
      importeNominal = currencyFormat.format(importe);
    }
    return importeNominal;
  };

  const getEfectoNumero = (numero) => {
    return numero ? `${numero} | ` : '';
  };

  const fetchDocuments = useCallback(async (id, urlParams) => {
    let effectFile;
    let facturasAsociadas;
    setIsLoading(true);
    const effect = await efectoService.getEfectoById(id);
    if (effect) {
      setTitle('Documentos del efecto');
      setSubTitle(
        `${effect.libradoRazonSocial} | ${
          effect.tipoDocumentoNombre
        } | ${getEfectoNumero(effect.numero)} ${getCurrencyFormat(
          effect.importeNominal
        )}`
      );
      if (!effect.esFicticio) {
        effectFile = await efectoService.getFicheroInPDFById(id);
      }
      if (effect.tieneFacturas) {
        facturasAsociadas = await facturasService.getFacturaByPagareId(id);
      }
    }
    const res =
      await documentoEfectoService.getDocumentosDeEfectoVistaClienteById(
        id,
        urlParams
      );
    if (res) {
      let finalItems;
      if (facturasAsociadas) {
        facturasAsociadas = facturasAsociadas.items?.map((facturaPagare) => ({
          ...facturaPagare,
          tipoDocumentoId: tipoDocumentoString.FACTURA_PAGARE,
        }));
        const totalItems = res?.items.concat(facturasAsociadas);
        const totalDocuments = {
          items: totalItems,
          totalCount: +res.totalCount + 2,
        };
        finalItems = await prepareResponseToTable(
          totalDocuments,
          effect,
          effectFile
        );
      } else {
        const totalDocuments = {
          items: res.items,
          totalCount: +res.totalCount + 1,
        };
        finalItems = await prepareResponseToTable(
          totalDocuments,
          effect,
          effectFile
        );
      }
      setDocuments({
        items: finalItems.items,
        totalCount: finalItems.items.leght,
      });
    }
  }, []);

  const fetchContrato = useCallback(
    async (id, queryState) => {
      setIsLoading(true);
      const documentosOperacion =
        await documentoDeFinanciacionByFinanciacionIdGet(id, queryState);

      prepareContratoResponseToTable(documentosOperacion);
    },
    [documentoDeFinanciacionByFinanciacionIdGet, prepareContratoResponseToTable]
  );

  useEffect(() => {
    if (params.id) {
      setEffectId(params.id);
      if (params.comesFromOperation) {
        setTitle('Documentos de operación');
        fetchContrato(params.id);
      } else {
        fetchDocuments(params.id);
      }
    }
  }, [fetchContrato, fetchDocuments, params]);

  const onRowSelect = (rowData) => {
    setRowSelected(rowData.data);
    if (rowData?.data?.file) {
      setSelectedBase64(rowData?.data?.file);
    } else {
      notifications.warning({
        title: ' ',
        body: 'No se encuentra el fichero asociado a este documento.',
      });
      setSelectedBase64('');
    }
  };

  const downloadFile = (data) => {
    const a = document.createElement('a');
    const blob = binaryToBlob(data?.file);

    a.href = URL.createObjectURL(blob);
    a.download = `Documento de ${data.tipoDocumentoNombre}.pdf`;
    a.click();
  };

  const goToOperaciones = () => {
    return <Navigate to="/" />;
  };

  const resetEstadoRevisionDocumento = useCallback(
    async (data) => {
      await documentoEfectoService.setEstadoRevisionDocumentoById(
        estadosRevisionDocumentos.Pendiente,
        data.id,
        data.tipoDocumentoId
      );
      setDocuments([]);
      setIsLoading(true);
      if (params.comesFromOperation) {
        setTitle('Documentos de operación');
        fetchContrato(params.id);
      } else {
        fetchDocuments(params.id);
      }
      notifications.success({
        title: '!Éxito¡',
        body: 'Operación realizada correctamente.',
      });
    },
    [fetchContrato, fetchDocuments, params.comesFromOperation, params.id]
  );

  const handleDetalleDeLaFacturaNavigate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    return <Navigate to={`/efecto/${tipoDocumentoString.FACTURA}/${id}`} />;
  };

  const OpcionesTemplate = useCallback(
    (data) => {
      const { file, estadoRevisionId, tipoDocumentoId, id } = data || {};
      return (
        <div className="table-actions__container">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              downloadFile(data);
            }}
            className="efectos-action-button"
            color="light"
            icon={faDownload}
            size="xl"
            disabled={!file}
            tooltipText="Descargar"
          />
          {isAdUser && estadoRevisionId !== 1 && (
            <Button
              onClick={() => {
                resetEstadoRevisionDocumento(data);
              }}
              className="efectos-action-button"
              color="light"
              icon={faUndo}
              size="xl"
              disabled={!file}
              tooltipText="Reiniciar estado de revisión"
            />
          )}
          {tipoDocumentoId === tipoDocumentoString.FACTURA_PAGARE && (
            <Button
              onClick={handleDetalleDeLaFacturaNavigate}
              className="efectos-action-button"
              color="light"
              icon={faInfo}
              size="xl"
              tooltipText="Detalle de la factura"
            />
          )}
        </div>
      );
    },
    [isAdUser, resetEstadoRevisionDocumento]
  );

  const onPage = (e) => {
    const urlParams = `?MaxResult=${e.rows}&SkipCount=${e.first}`;

    if (params.comesFromOperation) {
      const queryState = { ...initialQueryState };
      queryState.maxResult = e.rows;
      queryState.skipCount = e.first;
      fetchContrato(params.id, queryState);
    } else {
      fetchDocuments(params.id, urlParams);
    }
  };

  return (
    <DocumentViewerComponent
      documents={documents}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      tableColumns={tableColumns}
      OpcionesTemplate={OpcionesTemplate}
      selectedBase64={selectedBase64}
      goToOperaciones={goToOperaciones}
      title={title}
      subTitle={subTitle}
      onPage={onPage}
      rowSelected={rowSelected}
    />
  );
};

DocumentViewer.propTypes = {};

export default DocumentViewer;
