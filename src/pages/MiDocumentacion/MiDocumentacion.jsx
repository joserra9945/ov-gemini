/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import isNaN from 'lodash/isNaN';
import AccionRequeridaService from 'utils/services/accion-requerida-service';
import DniService from 'utils/services/dni-service';
import DocumentacionRequeridaEfectoService from 'utils/services/documentacion-requerida-efecto-service';
import DocumentacionRequeridaEmpresaService from 'utils/services/documentacion-requerida-empresa-service';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import DocumentoEmpresaService from 'utils/services/documento-empresa-service';
import DocumentoRepresentanteService from 'utils/services/documento-representante-service';
import PagareService from 'utils/services/pagare-service';
import {
  faArrowDownToBracket,
  faExclamationCircle,
  faFileExcel,
  faShare,
  faTrashAlt,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDocumentoDeCesion, useEfecto } from '@shared/hooks';
import {
  estadosRevisionDocumentos,
  initialQueryState,
  notDeleteIdDocs,
  tipoDocumentoString,
} from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';
import {
  binaryToBlob,
  fetchDocumentos,
  groupBy,
  mergePaginationResponses,
  parseAccionesRequeridas,
} from '@shared/utils/utilsOv';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import DocumentacionRequeridaDevolucion from 'components/DocumentacionRequerida/templates/DocumentacionRequeridaDevolucion';
import TableDocumentacionReq from 'components/tables/TableDocumentacionRequerida/TableDocumentacionReq';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import { tableColumns } from '../../components/DocumentacionRequerida/tableColumns';
import { DocumentacionRequeridaOperacion } from '../../components/DocumentacionRequerida/templates';
import DocumentViewer from '../../components/DocumentViewer';

import { DocumentacionRequeridaContext } from './context';

import './style.scss';

const miDocumentacion = {
  DocRequerida: 0,
  DocViewer: 1,
};

const dataEmpresaResponsesOrder = {
  EMPRESA: 0,
  EMPRESA_CESIONES: 1,
  ACCIONES: 2,
  ACCIONES_CESIONES: 3,
};
const pagareService = new PagareService();
const accionRequeridaService = new AccionRequeridaService();
const dniService = new DniService();
const documentoEmpresaService = new DocumentoEmpresaService();
const documentoEfectoService = new DocumentoEfectoService();
const documentoRepresentanteService = new DocumentoRepresentanteService();
const documentacionRequeridaEfectoService =
  new DocumentacionRequeridaEfectoService();
const documentacionRequeridaEmpresaService =
  new DocumentacionRequeridaEmpresaService();

const MiDocumentacion = ({ libradorId }) => {
  const [data, setData] = useState(null);
  const [modalSubirDocumento, setModalSubirDocumento] = useState(false);
  const [numDocRequerida, setNumDocRequerida] = useState(0);
  const [operacionesData, setOperacionesData] = useState(null);
  const [devoluciones, setDevoluciones] = useState(null);
  const [, setEfectosData] = useState(null);
  const [loading, setLoading] = useState({
    empresa: false,
    efecto: false,
    operacion: false,
    devolucion: false,
  });
  const [position, setPosition] = useState(miDocumentacion.DocRequerida);
  const [documents, setDocuments] = useState([]);
  const [selectedBase64, setSelectedBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState();
  const { isAdUser } = useSelector((store) => store.userState);
  const [botonDisabled, setBotonDisabled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { documentoDeCesionCrearContratoDeObraPost } = useDocumentoDeCesion();
  const { efectoDocumentacionRequeridaPendienteByLibradorIdGet } = useEfecto();

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
          // Acciones requeridas
          if (
            [
              dataEmpresaResponsesOrder.ACCIONES,
              dataEmpresaResponsesOrder.ACCIONES_CESIONES,
            ].includes(currentIndex)
          ) {
            const currentItems = parseAccionesRequeridas(value)?.items || [];
            return {
              items: [...(previusValue?.items || []), ...currentItems],
              totalCount: previusValue?.totalCount || 0 + value.totalCount || 0,
            };
          }
          return {
            items: [...(previusValue?.items || []), ...(value?.items || [])],
            totalCount: previusValue?.totalCount || 0 + value.totalCount || 0,
          };
        }
        return previusValue;
      },
      { items: [], totalCount: 0 }
    );
    setData(finalData);
    setLoading((l) => ({ ...l, empresa: false }));
  }, []);

  const fetchDataOperaciones = useCallback(async () => {
    setLoading((l) => ({ ...l, operacion: true }));

    const res = await efectoDocumentacionRequeridaPendienteByLibradorIdGet(
      libradorId,
      { ...initialQueryState, params: '&tieneOperacion=true', maxResult: 100 }
    );
    const resAcciones = await fetchDocumentos(
      pagareService.getPagareAccionRequeridaWithOperationByEmpresa()
    );

    const total = mergePaginationResponses([
      res,
      parseAccionesRequeridas(resAcciones),
    ]);

    if (total) {
      const g = groupBy(total.items, 'operacionNumero');
      setOperacionesData({ items: g, totalCount: total.length });
    }
    setLoading((l) => ({ ...l, operacion: false }));
  }, [efectoDocumentacionRequeridaPendienteByLibradorIdGet, libradorId]);

  const fetchDataEfectos = useCallback(async () => {
    setLoading((l) => ({ ...l, efecto: true }));

    const res = efectoDocumentacionRequeridaPendienteByLibradorIdGet(
      libradorId,
      {
        ...initialQueryState,
        params: '&tieneOperacion=false',
        maxResult: 100,
      }
    );

    if (res) {
      setEfectosData(res);
    }
    setLoading((l) => ({ ...l, efecto: false }));
  }, [efectoDocumentacionRequeridaPendienteByLibradorIdGet, libradorId]);

  const fetchDataDevoluciones = useCallback(async () => {
    setLoading((l) => ({ ...l, devolucion: true }));
    const res =
      await documentacionRequeridaEfectoService.getEfectoDocumentacionRequeridaWithDevolucionPendiente(
        libradorId
      );
    if (res) {
      setDevoluciones(res?.items);
    }
    setLoading((l) => ({ ...l, devolucion: false }));
  }, [libradorId]);

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
        fetchDataEfectos();
        fetchDataOperaciones();
      } else {
        fetchDataEmpresa();
      }
    },
    [
      dispatch,
      fetchDataEfectos,
      fetchDataEmpresa,
      fetchDataOperaciones,
      libradorId,
    ]
  );

  const handleUploadDocumento = (files, rowData, table) => {
    const isDocumentoDeEfecto = !!rowData?.efectoId || !!rowData?.efecto?.id;
    const isDocumentoDeRepresentante = !!rowData?.representanteId;
    let res;

    setLoading((l) => ({ ...l, [table]: true }));

    if (isDocumentoDeEfecto) {
      res = documentoEfectoService.postDocumentoDeEfecto({
        files,
        efectoId: rowData?.efectoId || rowData?.efecto?.id,
        tipoDocumentoId: rowData?.tipoDocumentoId || rowData?.tipoDocumento?.id,
      });
    } else if (
      isDocumentoDeRepresentante ||
      rowData?.tipoDocumentoId === +tipoDocumentoString.ESCRITURA_NOMBRAMIENTO
    ) {
      res = documentoRepresentanteService.post(
        sessionStorage.getItem('libradorId'),
        rowData,
        files
      );
    } else if (
      rowData?.tipoDocumentoId === +tipoDocumentoString.CONTRATO_OBRA
    ) {
      documentoDeCesionCrearContratoDeObraPost(files, rowData?.cesionId);
    } else {
      res = documentoEmpresaService.postDocumentoDeEmpresa(
        sessionStorage.getItem('libradorId'),
        rowData,
        files
      );
    }
    if (res) {
      handleSuccessUpload(isDocumentoDeEfecto);
    }
    setLoading((l) => ({ ...l, [table]: false }));
    setModalSubirDocumento(false);
  };

  const buttonVerFunc = () => {
    setPosition(miDocumentacion.DocRequerida);
  };

  const buttonBackFunc = () => {
    setPosition(miDocumentacion.DocViewer);
  };
  // #endregion

  useEffect(() => {
    if (location.pathname === '/doc-requerida') {
      buttonVerFunc();
    } else {
      buttonBackFunc();
    }
  }, [location]);

  useEffect(() => {
    fetchDataEmpresa();
    fetchDataOperaciones();
    fetchDataEfectos();
    fetchDataDevoluciones();
  }, [
    fetchDataDevoluciones,
    fetchDataEfectos,
    fetchDataEmpresa,
    fetchDataOperaciones,
  ]);

  useEffect(() => {
    const total =
      (data?.totalCount ? data.totalCount : 0) +
      (operacionesData?.totalCount ? operacionesData.totalCount : 0);
    if (isNaN(total)) {
      setNumDocRequerida(0);
    } else {
      setNumDocRequerida(total);
    }
  }, [data, operacionesData]);

  // #region document viewer
  const prepareResponseToTable = async (doculibrador) => {
    let parsedItems = doculibrador?.items ? cloneDeep(doculibrador.items) : [];
    parsedItems = await Promise.all(
      parsedItems.map(async (item) => {
        try {
          const itemFile = !item.esFicticio
            ? await documentoEmpresaService.getFicheroInPDFById(item.id)
            : null;
          return !itemFile ? { ...item } : { ...item, file: itemFile };
        } catch (e) {
          return { ...item };
        }
      })
    );
    const newItems = cloneDeep(parsedItems);
    setDocuments({ ...doculibrador, items: newItems });
    setSelectedBase64(newItems[0]?.file);
    setRowSelected(newItems[0]);
    setIsLoading(false);
  };
  const fetchDocuments = useCallback(async (id, urlParams) => {
    setIsLoading(true);
    const doculibrador = await documentoEmpresaService.getData(id, urlParams);
    await prepareResponseToTable(doculibrador);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (position !== 1) return;
    setIsLoading(true);
    if (libradorId) {
      fetchDocuments(libradorId);
    }
  }, [position, libradorId, fetchDocuments]);
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

  const reenviarEstado = useCallback(
    async (data) => {
      setBotonDisabled(true);
      try {
        if (data?.tipoDocumentoId === +tipoDocumentoString.DNI) {
          await dniService.setEstadoRevision(
            data?.id,
            estadosRevisionDocumentos.Pendiente
          );
        } else {
          await documentoEmpresaService.setEstadoRevisionDocumentoEmpresaById(
            estadosRevisionDocumentos.Pendiente,
            data?.id
          );
        }
        setIsLoading(true);
        await fetchDocuments(libradorId);

        notifications.success({
          title: '¡Éxito!',
          body: 'Estado restaurado correctamente.',
        });
      } finally {
        setBotonDisabled(false);
      }
    },
    [fetchDocuments, libradorId]
  );

  const eliminarDocumento = useCallback(
    async (data) => {
      setBotonDisabled(true);
      try {
        await documentoEmpresaService.removeFicheroDocDeEmpresa(data?.id);
        setIsLoading(true);
        await fetchDocuments(libradorId);

        notifications.success({
          title: '¡Éxito!',
          body: 'Documento eliminado correctamente.',
        });
      } finally {
        setBotonDisabled(false);
      }
    },
    [fetchDocuments, libradorId]
  );

  const OpcionesTemplate = useCallback(
    (data) => {
      const { file } = data || {};
      const { estadoRevisionNombre } = data;
      return (
        <div className="items-center flex gap-2 mr-2">
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                downloadFile(data);
              }}
              className={
                file
                  ? 'flex items-center justify-center min-w-10 min-h-10 cursor-pointer hover:shadow rounded hover:text-secondary text-lg hover:text-xl hover:bg-white'
                  : 'flex items-center justify-center min-w-10 min-h-10 text-lg cursor-pointer shadow rounded bg-gray-300 text-white'
              }
              disabled={!file}
            >
              <Tooltip content="Descargar">
                <FontAwesomeIcon icon={faArrowDownToBracket} />
              </Tooltip>
            </button>
          </div>

          {isAdUser && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  reenviarEstado(data);
                }}
                className={
                  estadoRevisionNombre !== 'Pendiente'
                    ? 'flex items-center justify-center min-w-10 min-h-10 cursor-pointer hover:shadow rounded hover:text-secondary text-lg hover:text-xl hover:bg-white'
                    : 'flex items-center justify-center min-w-10 min-h-10 text-lg cursor-pointer shadow rounded bg-gray-300 text-white'
                }
                disabled={estadoRevisionNombre === 'Pendiente' || botonDisabled}
              >
                <Tooltip content="Reenviar">
                  <FontAwesomeIcon icon={faShare} />
                </Tooltip>
              </button>

              {!notDeleteIdDocs.includes(data?.tipoDocumentoId) && (
                <Tooltip content="Eliminar">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      eliminarDocumento(data);
                    }}
                    className="text-danger min-w-10 min-h-10 cursor-pointer hover:shadow rounded text-lg hover:text-xl hover:bg-white"
                    disabled={botonDisabled}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </Tooltip>
              )}
            </>
          )}
        </div>
      );
    },
    [botonDisabled, eliminarDocumento, isAdUser, reenviarEstado]
  );

  const FicheroNoExisteTemplate = useCallback((data) => {
    const { file } = data || {};
    return (
      <span className="table-icons__container">
        {!file && (
          <Tooltip content="No hay fichero asociado a este documento">
            <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '2em' }} />
          </Tooltip>
        )}
      </span>
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      actualizarDocRequeridaEmpresa: () => handleSuccessUpload(false, false),
      actualizarDocRequeridaEfecto: () => handleSuccessUpload(true, false),
    }),
    [handleSuccessUpload]
  );

  switch (position) {
    case miDocumentacion.DocRequerida:
      return (
        <div className="doc-requerida p-4 flex flex-col box-border gap-4">
          <DocumentacionRequeridaContext.Provider value={contextValue}>
            <div className="card doc-requerida-header m-0">
              <h2 className="title-h2 w-full">Documentación requerida</h2>
              {numDocRequerida ? (
                <span className="doc-requerida-notification">
                  <FontAwesomeIcon icon={faExclamationCircle} /> Hay documentos
                  requeridos
                </span>
              ) : (
                <span className="doc-requerida-zero-documents">
                  <FontAwesomeIcon icon={faExclamationCircle} /> No tienes
                  documentación pendiente
                </span>
              )}
            </div>
            <div className="mb-4 card">
              <TableDocumentacionReq
                data={data}
                fetchEmpresa={fetchDataEmpresa}
                loading={loading.empresa}
                handleUpload={(file, rowData) => {
                  handleUploadDocumento(file, rowData, 'empresa');
                }}
                modalSubirDocumento={modalSubirDocumento}
                setModalSubirDocumento={setModalSubirDocumento}
              />
            </div>
            {!!devoluciones?.length && (
              <DocumentacionRequeridaDevolucion
                data={devoluciones}
                title="Facturas no cedidas"
                loading={loading?.devolucion}
                isRedirect
              />
            )}
            {operacionesData?.items.map((el) => {
              const header = (
                <>
                  Documentación requerida:{' '}
                  <div style={{ color: 'black', display: 'inline-block' }}>
                    Operación #{el[0]}
                  </div>
                </>
              );
              return (
                <DocumentacionRequeridaOperacion
                  data={el[1]}
                  title={header}
                  loading={loading?.operacion}
                  handleUpload={(file, rowData) => {
                    handleUploadDocumento(file, rowData, 'operacion');
                  }}
                />
              );
            })}
          </DocumentacionRequeridaContext.Provider>
        </div>
      );
    case miDocumentacion.DocViewer:
      return (
        <DocumentViewer
          buttonBar
          title="Documentación"
          documents={documents}
          isLoading={isLoading}
          onRowSelect={onRowSelect}
          FicheroNoExisteTemplate={FicheroNoExisteTemplate}
          tableColumns={tableColumns}
          OpcionesTemplate={OpcionesTemplate}
          selectedBase64={selectedBase64}
          rowSelected={rowSelected}
          fetchDocuments={fetchDocuments}
        />
      );
    default:
      break;
  }
};

export default MiDocumentacion;
