import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccionRequeridaService from 'utils/services/accion-requerida-service';
import DocumentacionRequeridaEfectoService from 'utils/services/documentacion-requerida-efecto-service';
import DocumentacionRequeridaEmpresaService from 'utils/services/documentacion-requerida-empresa-service';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import DocumentoEmpresaService from 'utils/services/documento-empresa-service';
import DocumentoRepresentanteService from 'utils/services/documento-representante-service';
import PagareService from 'utils/services/pagare-service';
import { faExclamationCircle } from '@fortawesome/pro-light-svg-icons';

import notifications from '@shared/utils/notificationsOv';
import {
  fetchDocumentos,
  mergePaginationResponses,
  parseAccionesRequeridas,
} from '@shared/utils/utils';

import {
  DocumentacionRequeridaEfecto,
  DocumentacionRequeridaOperacion,
} from 'components/DocumentacionRequerida/templates';
import Messages from 'components/Messages/Messages';
import TableDocumentacionReq from 'components/tables/TableDocumentacionRequerida/TableDocumentacionReq';
import { DocumentacionRequeridaContext } from 'pages/MiDocumentacion/context';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

const accionRequeridaService = new AccionRequeridaService();
const documentoEmpresaService = new DocumentoEmpresaService();
const documentoEfectoService = new DocumentoEfectoService();
const documentoRepresentanteService = new DocumentoRepresentanteService();
const documentacionRequeridaEmpresaService =
  new DocumentacionRequeridaEmpresaService();
const documentacionRequeridaEfectoService =
  new DocumentacionRequeridaEfectoService();
const pagareService = new PagareService();

const dataEmpresaResponsesOrder = {
  EMPRESA: 0,
  EMPRESA_CESIONES: 1,
  ACCIONES: 2,
  ACCIONES_CESIONES: 3,
};

const initStateData = { items: [], totalCount: 0 };

const DocRequerida = ({ operacionId, efectoId }) => {
  const [loading, setLoading] = useState({
    empresa: false,
    operacion: false,
    efecto: false,
  });
  const [numDocRequerida, setNumDocRequerida] = useState(0);
  const [totalAccionesRequeridas, setTotalAccionesRequeridas] = useState(0);

  const [efectosData, setEfectosData] = useState(initStateData);
  const [empresasData, setEmpresasData] = useState(initStateData);
  const [operacionesData, setOperacionesData] = useState(initStateData);
  const [loader, setLoader] = useState(true);
  const { libradorId } = useSelector((store) => store.userState);
  const dispatch = useDispatch();

  const fetchDataEmpresa = useCallback(async () => {
    setLoading((l) => ({ ...l, empresa: true }));
    const promises = [
      documentacionRequeridaEmpresaService.getByLibradorId(),
      documentacionRequeridaEmpresaService.getDocumentacionRequeridaCesionByLibradorId(),
      accionRequeridaService.getAccionesRequeridasEmpresa(),
      accionRequeridaService.getAccionesRequeridasCesionEmpresa(),
    ];
    const responses = await Promise.allSettled(promises);
    const finalData = responses.reduce(
      (previusValue, currentValue, currentIndex) => {
        if (currentValue.status === 'fulfilled') {
          const { value } = currentValue;
          if (
            [
              dataEmpresaResponsesOrder.ACCIONES,
              dataEmpresaResponsesOrder.ACCIONES_CESIONES,
            ].includes(currentIndex)
          ) {
            const { items } = parseAccionesRequeridas(value) || {};
            setTotalAccionesRequeridas(value.totalCount);
            return {
              items: [...previusValue.items, ...(items || [])],
              totalCount: previusValue.totalCount + value.totalCount,
            };
          }
          return {
            items: [...previusValue.items, ...value.items],
            totalCount: previusValue.totalCount + value.totalCount,
          };
        }
        return previusValue;
      },
      { items: [], totalCount: 0 }
    );
    setEmpresasData(finalData);
    setLoading((l) => ({ ...l, empresa: false }));
    setLoader(false);
  }, []);

  const fetchDataEfecto = useCallback(async () => {
    if (!efectoId) return;
    setLoading((l) => ({ ...l, efecto: true }));
    const res = await fetchDocumentos(
      documentacionRequeridaEfectoService.getDocumentacionRequeridaEfectoPendientesByEfectoId(
        true,
        efectoId
      )
    );
    const resAccionRequerida = await fetchDocumentos(
      pagareService.getPagareAccionRequeridas(efectoId)
    );
    const finalRes = mergePaginationResponses([
      res,
      parseAccionesRequeridas(resAccionRequerida),
    ]);
    if (finalRes) {
      setEfectosData(finalRes);
    }
    setLoading((l) => ({ ...l, efecto: false }));
    setLoader(false);
  }, [efectoId]);

  const fetchDataOperaciones = useCallback(async () => {
    if (!operacionId) return;
    setLoading((l) => ({ ...l, operacion: true }));
    const res = await fetchDocumentos(
      documentacionRequeridaEfectoService.getPendientesByOperacionId(
        operacionId
      )
    );
    const resAcciones = await fetchDocumentos(
      pagareService.getPagareAccionRequeridaWithOperationByOperacion(
        operacionId
      )
    );
    const total = mergePaginationResponses([
      res,
      parseAccionesRequeridas(resAcciones),
    ]);
    if (total) {
      setOperacionesData(total);
    }
    setLoading((l) => ({ ...l, operacion: false }));
    setLoader(false);
  }, [operacionId]);

  const handleSuccessUpload = useCallback(
    (isDocumentoDeEfecto, showMessage = true) => {
      if (showMessage) {
        notifications.success({
          title: 'Subida realizada con éxito!',
          body: 'Se ha subido el documento requerido.',
        });
      }
      // actualizamos el counter de documentacion pendiente
      dispatch(
        getDocumentosPendientesLibrador(
          libradorId || sessionStorage.getItem('libradorId')
        )
      );
      // actualizamos datos de la tabla
      if (isDocumentoDeEfecto) {
        fetchDataOperaciones();
        fetchDataEfecto();
      } else {
        fetchDataEmpresa();
      }
    },
    [
      libradorId,
      dispatch,
      fetchDataEfecto,
      fetchDataEmpresa,
      fetchDataOperaciones,
    ]
  );

  const handleUploadDocumento = (files, rowData, table) => {
    setLoading((l) => ({ ...l, [table]: true }));
    let apiCall;
    const isDocumentoDeEfecto = !!rowData?.efectoId;
    const isDocumentoDeRepresentante = !!rowData?.representanteId;
    if (isDocumentoDeEfecto) {
      apiCall = () =>
        documentoEfectoService.postDocumentoDeEfecto({
          files,
          efectoId: rowData.efectoId,
          tipoDocumentoId: rowData.tipoDocumentoId,
        });
    } else if (isDocumentoDeRepresentante) {
      apiCall = () =>
        documentoRepresentanteService.post(
          sessionStorage.getItem('libradorId'),
          rowData,
          files
        );
    } else {
      apiCall = () =>
        documentoEmpresaService.postDocumentoDeEmpresa(
          sessionStorage.getItem('libradorId'),
          rowData,
          files
        );
    }
    apiCall()
      .then((res) => {
        if (res) {
          handleSuccessUpload(isDocumentoDeEfecto);
        }
      })
      .finally(() => {
        setLoading((l) => ({ ...l, [table]: false }));
      });
  };

  useEffect(() => {
    fetchDataEmpresa();
  }, [fetchDataEmpresa]);

  useEffect(() => {
    fetchDataOperaciones();
  }, [fetchDataOperaciones]);

  useEffect(() => {
    fetchDataEfecto();
  }, [fetchDataEfecto]);

  useEffect(() => {
    if (
      empresasData?.totalCount != null &&
      operacionesData?.totalCount != null &&
      efectosData?.totalCount != null
    ) {
      const total =
        empresasData.totalCount -
        totalAccionesRequeridas +
        operacionesData.totalCount +
        efectosData.totalCount;
      setNumDocRequerida(total);
    }
  }, [totalAccionesRequeridas, efectosData, empresasData, operacionesData]);

  const contextValue = useMemo(
    () => ({
      actualizarDocRequeridaEmpresa: () => handleSuccessUpload(false, false),
      actualizarDocRequeridaEfecto: () => handleSuccessUpload(true, false),
    }),
    [handleSuccessUpload]
  );

  return (
    <div
      className={`doc-requerida-container ${
        loader ? 'doc-requerida-container--loading' : ''
      }`}
    >
      {numDocRequerida === 0 ? (
        <Messages
          icon={faExclamationCircle}
          severity="info"
          message="No tienes documentación pendiente"
        />
      ) : (
        <Messages
          icon={faExclamationCircle}
          severity="caution"
          message="Hay documentos requeridos"
        />
      )}
      <DocumentacionRequeridaContext.Provider value={contextValue}>
        {efectosData?.items?.length > 0 && (
          <DocumentacionRequeridaEfecto
            data={efectosData}
            loading={loading.efecto}
            handleUpload={(file, rowData) => {
              handleUploadDocumento(file, rowData, 'efecto');
            }}
          />
        )}
        {empresasData?.items?.length > 0 && (
          <div className="card">
            <TableDocumentacionReq
              data={empresasData}
              loading={loading.empresa}
              handleUpload={(file, rowData) => {
                handleUploadDocumento(file, rowData, 'empresa');
              }}
            />
          </div>
        )}
        {!efectoId && operacionesData?.items?.length > 0 && (
          <DocumentacionRequeridaOperacion
            data={operacionesData}
            title={
              <>
                Documentación requerida:{' '}
                <div className="inline-block text-black">Operación</div>
              </>
            }
            loading={loading.operacion}
            handleUpload={(file, rowData) => {
              handleUploadDocumento(file, rowData, 'operacion');
            }}
          />
        )}
      </DocumentacionRequeridaContext.Provider>
    </div>
  );
};

export default DocRequerida;
