/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectButton } from 'primereact/selectbutton';
import ConfiguracionDocumentoEfecto from 'utils/services/configuracion-documento-efecto';
import DireccionService from 'utils/services/direccion-service';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import EfectoService from 'utils/services/efectos-service';
import EmpresaService from 'utils/services/empresa-externa-service';
import OperacionesService from 'utils/services/operaciones-service';
import PreciosService from 'utils/services/precios-service';
import { tipoStep } from 'utils/stepsConfig/nuevaOperacionFlow';
import { faClock, faHistory } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useProcedimientoDeCobro } from '@shared/hooks';
import {
  estadoEfectoCliente,
  operacionesPageTabEnum,
  tipoDocumento,
  tipoDocumentoString,
} from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';
import { esDenegadoPRAS } from '@shared/utils/params';
import {
  getInfoByIncompleteCompany,
  hasFormasContacto,
  parseDataFromDireccion,
} from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';
import Modal from '@shared/components/Legacy/Modal';
import { Tab, Tabs } from '@shared/components/Legacy/Tabs';

import LayoutContext from 'context/LayoutContext';
import { alertType } from 'components/Alert/utils';
import CrearEstudio from 'components/Dialogs/CrearEstudio';
import SubirDocumento from 'components/Dialogs/SubirDocumento';
import RightButtonTemplate from 'components/ResumenOperacionFlow/templates/RightButtonTemplate';
import TableOperacionEfectos from 'components/tables/TableOperacionEfectos';
import TableOperacionesActivas from 'components/tables/TableOperacionesActivas';
import TableOperacionesHistorial from 'components/tables/TableOperacionesHistorial/TableOperacionesHistorial';
import { add } from 'store/actions/actions-alert';

import FechaPagoForm from './FechaPagoForm';
import { FinanciarButtons, Header } from './Header';

import './Operaciones.scss';

const efectosService = new EfectoService();
const empresaService = new EmpresaService();
const operacionesServices = new OperacionesService();
const documentoDeEfectoService = new DocumentoEfectoService();
const configuracionDocumentoEfecto = new ConfiguracionDocumentoEfecto();

const EFECTOS_TABLE_IDS = {
  ACTIVAS: 1,
  HISTORIAL: 2,
};

const optionsEfectosTable = [
  {
    name: 'Activas',
    value: EFECTOS_TABLE_IDS.ACTIVAS,
    icon: faClock,
    title: 'Facturas y pagarés sin asignar',
  },
  {
    name: 'Historial',
    value: EFECTOS_TABLE_IDS.HISTORIAL,
    icon: faHistory,
    title: 'Histórico de facturas y pagarés',
  },
];

const Operaciones = ({
  onSetSelectedEffects,
  onSetFacturaCreada,
  isAdUser,
  onSetStep,
}) => {
  const [buttonValue, setButtonValue] = useState(1);
  const [efectosSelectButton, setEfectosSelectButton] = useState(
    EFECTOS_TABLE_IDS.ACTIVAS
  );
  const [selectedEfectos, setSelectedEfectos] = useState([]);
  const [efectos, setEfectos] = useState([]);
  const [disableActivos, setDisableActivos] = useState(false);
  const [disableHistorial, setDisableHistorial] = useState(false);
  const [efectosIsLoading, setEfectosIsLoading] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [operaciones, setOperaciones] = useState({
    items: [],
  });
  const [selectedTab, setSelectedTab] = useState(
    operacionesPageTabEnum.EFECTOS_SIN_ASIGNAR
  );
  const [isLoading, setIsLoading] = useState(true);
  const [needLoad, setNeedLoad] = useState(true);
  const [selectedEfecto, setSelectedEfecto] = useState(null);
  const [isOpenDireccionesEmpresa, setIsOpenDireccionesEmpresa] =
    useState(false);
  const [openCrearEstudio, setOpenCrearEstudio] = useState(false);
  const [efectosNoAprobadosPorPRAS, setEfectosNoAprobadosPorPRAS] = useState(
    []
  );
  const [empresa, setEmpresa] = useState();
  const [tieneOperacionPendienteDePago, setTieneOperacionPendienteDePago] =
    useState(false);
  const [direccion, setDireccion] = useState();
  const [formasContacto, setFormasContacto] = useState([]);
  const [tieneFormasContacto, setTieneFormasContacto] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSubirDoc, setModalSubirDoc] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);
  const [newDocuments, setNewDocuments] = useState({ files: [] });
  const [documentoEfectoOptions, setDocumentoDeEfectoOptions] = useState([]);
  const [scoringUpdate, setScoringUpdate] = useState(false);
  const [openModalPeriodoPago, setOpenModalPeriodoPago] = useState(false);
  const [showCarga, setShowCarga] = useState(false);
  const [totales, setTotales] = useState(0);
  const context = useContext(LayoutContext);

  const { ref } = useInView({ threshold: 0.1 });
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { razonSocial } = useSelector((state) => state.userState);

  const { procedimientoDeCobroSinCesionAceptadaGet } =
    useProcedimientoDeCobro();

  const libradorId = sessionStorage.getItem('libradorId');

  const options = [
    {
      name: 'Activas',
      className: 'label-select-button',
      value: 1,
      icon: faClock,
      disabled: disableActivos,
    },
    { name: 'Historial', value: 2, icon: faHistory },
  ];

  useEffect(() => {
    if (context.hiddenHeader && context.hiddenSidebar) {
      context.setHiddenSidebar(false);
      context.setHiddenHeader(false);
    }
  }, [context]);

  useEffect(() => {
    const cargarScriptDespuesDelLogin = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
      ! function () {
        var e = window.Median = window.Median || [];
        if (!e._initialized)
          if (e._snippet_loaded) console.warn("Median Snippet loaded twice.");
          else {
            e._snippet_loaded = !0, e._snippet_version = 3, e.methods = ["init", "identify", "endSession",
              "on"], e.factory = function (n) {
                return function () {
                  var t = Array.prototype.slice.call(arguments);
                  e?.push?.([n, t])
                }
              };
            for (var n = 0; n < e.methods.length; n++) {
              var t = e?.methods[n];
              e[t] = e?.factory?.(t)
            }
            var i = document.createElement("script");
            i.type = "text/javascript", i.async = !0, i.src =
            "https://js.hellomedian.com/v1/mdn-screenshare.js";
            var a = document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(i, a)
          }
      }();
      Median.init("3e232186-5454-4066-951c-73a58ebd1dc4");
      Median.identify("${razonSocial}");
      `;

      document.head.appendChild(script);
    };

    const iniciarSesion = () => {
      cargarScriptDespuesDelLogin();
    };

    iniciarSesion();
  }, [isAdUser, razonSocial]);

  const fetchPlazoDePago = useCallback(
    async (libradoId, libradorId) => {
      const res = await procedimientoDeCobroSinCesionAceptadaGet(
        libradoId,
        libradorId
      );
      return res;
    },
    [procedimientoDeCobroSinCesionAceptadaGet]
  );

  const fetchPlazoPago = useCallback(async () => {
    const plazosDePagoArray = [];

    for await (const efecto of selectedEfectos) {
      const plazo = await fetchPlazoDePago(efecto?.libradoId, libradorId);
      plazosDePagoArray.push(plazo);
    }

    return plazosDePagoArray;
  }, [fetchPlazoDePago, libradorId, selectedEfectos]);

  const resetModal = () => {
    setSelectedOption();
    setNewDocuments({ files: [] });
  };

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const fetchDataOperaciones = useCallback(async () => {
    const result = await operacionesServices.getOperacionesCliente();
    if (result) {
      setOperaciones(result);
    }
    setIsLoading(false);
  }, []);

  const fetchOperacionesPendienteDePago = useCallback(async () => {
    const res =
      await operacionesServices.getOperacionesClientePendienteDePago();
    res.items.length && setTieneOperacionPendienteDePago(true);
    setIsLoading(false);
  }, []);

  const hasOperacionesPendientesDePago = useCallback(() => {
    if (tieneOperacionPendienteDePago) {
      dispatch(
        add({
          id: 'DOCUMENTACION_REQUERIDA',
          message:
            'Para proceder al pago de su operación, deberá completar la documentación requerida necesaria.',
          linkLabel: 'Ir a Documentación requerida.',
          linkFunction: () => navigate('/doc-requerida'),
          type: alertType.ERROR,
          canHide: true,
          type_priority: 2,
        })
      );
    }
  }, [tieneOperacionPendienteDePago, dispatch, navigate]);

  useEffect(() => {
    if (state?.tab != null) {
      setSelectedTab(state.tab);
    }
  }, [state]);

  useEffect(() => {
    if (buttonValue === 1) {
      fetchDataOperaciones();
      fetchOperacionesPendienteDePago();
    }
  }, [buttonValue, fetchDataOperaciones, fetchOperacionesPendienteDePago]);

  useEffect(() => {
    hasOperacionesPendientesDePago();
  }, [hasOperacionesPendientesDePago]);

  useEffect(() => {
    const getConfiguracionEfecto = async () => {
      const res =
        await configuracionDocumentoEfecto.getConfiguracionDeEfectoInicial(
          null,
          selectedEfecto?.tipo?.id
        );
      if (res) {
        setDocumentoDeEfectoOptions(res);
      }
    };
    if (selectedEfecto) getConfiguracionEfecto();
  }, [selectedEfecto]);

  const fetchEfectosWithoutOperacion = useCallback(async () => {
    setEfectosIsLoading(true);
    efectosService
      .getEfectosPedientesByEmpresaActiva(
        efectosSelectButton === EFECTOS_TABLE_IDS.ACTIVAS
      )
      .then((success) => {
        if (success) {
          setEfectos(success.items);
        }
      })
      .finally(() => {
        setEfectosIsLoading(false);
      });
  }, [efectosSelectButton]);

  useEffect(() => {
    if (needLoad) {
      fetchEfectosWithoutOperacion();
    }
  }, [needLoad, fetchEfectosWithoutOperacion]);

  useEffect(() => {
    const totalImporteNominal = selectedEfectos.reduce(
      (acc, efecto) => acc + (efecto.importeNominal || 0),
      0
    );
    setTotales(totalImporteNominal);
  }, [selectedEfectos]);

  useEffect(() => {
    onSetFacturaCreada(false);
  }, [onSetFacturaCreada]);

  const getValidEfectos = () =>
    selectedEfectos.reduce((accumulator, currentEfecto) => {
      if (
        currentEfecto.estadoEfectoClienteId === estadoEfectoCliente.APROBADO ||
        !esDenegadoPRAS(currentEfecto.scoring)
      ) {
        accumulator.push(currentEfecto.id);
      }
      return accumulator;
    }, []);

  const generarOperacion = async () => {
    const resIds = getValidEfectos();
    onSetStep({
      currentStep: tipoStep.RESUMEN_INICIAL,
    });
    const plazoDePago = await fetchPlazoPago();
    onSetSelectedEffects(resIds);
    const onlyFacturasonEfectos = selectedEfectos.filter(
      (efecto) => efecto.tipo.id === tipoDocumento.FACTURA
    );

    const hasPlazoDePago = plazoDePago.some((item) => item?.plazoDePago);
    if (hasPlazoDePago && onlyFacturasonEfectos.length) {
      setOpenModalPeriodoPago(!openModalPeriodoPago);
    } else {
      navigate(`/nueva-operacion`, {
        state: {
          nuevaOp: true,
          efectos: resIds,
          step: 1,
          isPagareType:
            Array.isArray(selectedEfectos) &&
            selectedEfectos.length &&
            selectedEfectos[0]?.tipo?.id &&
            +selectedEfectos[0].tipo.id === +tipoDocumentoString.PAGARE,
        },
      });
    }
  };

  const handleScoring = () => {
    setNeedLoad(true);
    toggleModal();
  };

  const handleGenerateOperation = async (skipDireccionesCheck = false) => {
    if (selectedEfectos?.length === 0) return;

    let resScoring;

    if (resScoring === true) {
      setScoringUpdate(true);
      setNeedLoad(false);
      return setIsOpen(true);
    }

    const efectosNoAprobadosPorPRAS = selectedEfectos.filter(
      (efecto) =>
        efecto.estadoEfectoClienteId === estadoEfectoCliente.PENDIENTE_ESTUDIO
    );
    let res;
    const libradoIds = selectedEfectos.map((el) => el.libradoId);
    if (!skipDireccionesCheck && !libradoIds.length) {
      res = await empresaService.getEmpresaWhitoutDireccionSocial(libradoIds);
    }

    if (res?.length) {
      const tmpEmpresa = getInfoByIncompleteCompany(res);
      if (tmpEmpresa) {
        const { formasContacto: fc } = tmpEmpresa;
        if (fc) {
          setFormasContacto(fc);
        }
        if (hasFormasContacto(fc)) {
          setTieneFormasContacto(true);
        }

        setEmpresa(tmpEmpresa);
        if (tmpEmpresa?.direccionSocial) {
          setDireccion(parseDataFromDireccion(tmpEmpresa.direccionSocial));
        }
      }
      setIsOpenDireccionesEmpresa(true);
    } else if (efectosNoAprobadosPorPRAS?.length) {
      setEfectosNoAprobadosPorPRAS(efectosNoAprobadosPorPRAS);
      setOpenCrearEstudio(true);
    } else {
      generarOperacion();
    }
  };

  const handleCrearEstudio = async () => {
    setDisableButtons(true);
    setNeedLoad(false);
    const efectosIds = efectosNoAprobadosPorPRAS.map((efecto) => efecto.id);
    const data = { efectosIds };
    try {
      await efectosService.addToEstudio(data);
      setDisableButtons(false);
      notifications.success({
        body: 'Se ha enviado el efecto al departamento de Riesgos para su aprobación.',
        title: '¡Éxito!',
      });
      const selectedIds = getValidEfectos();
      if (!selectedIds?.length) {
        setOpenCrearEstudio(false);
        return setNeedLoad(true);
      }
      generarOperacion();
    } catch {
      setDisableButtons(false);
    }
  };

  const addDocumentation = (e, data) => {
    e.stopPropagation();
    e.preventDefault();
    setModalSubirDoc(true);
    setSelectedEfecto(data);
  };

  const footerTemplate = (
    <div className="mt-10 footer-desktop">
      <span className="resumen-totals">Total: {formatCurrency(totales)}</span>
      {RightButtonTemplate(
        selectedEfectos?.length === 0,
        handleGenerateOperation
      )}
    </div>
  );

  const responsiveFooterTemplate = (
    <div className="responsive-footer">
      <span className="resumen-totals">Total: {formatCurrency(totales)}</span>
      {RightButtonTemplate(selectedEfectos?.length === 0, generarOperacion)}
    </div>
  );

  // #endregion

  // #region SELECT BUTTON
  const optionsTemplate = (option) => {
    return (
      <div data-id={option.name.toLowerCase()} className="button-select">
        <FontAwesomeIcon
          color={buttonValue === option.value && '#558DD2'}
          icon={option.icon}
        />
        <span className="label-select-button bolder">{option.name}</span>
      </div>
    );
  };
  // #endregion

  const handleUpload = async () => {
    setLoading(true);
    try {
      const res = await documentoDeEfectoService.postDocumentoDeEfecto({
        files: newDocuments?.files,
        efectoId: selectedEfecto?.id,
        tipoDocumentoId: selectedOption,
      });
      if (res) {
        notifications.success({
          body: 'La acción se ha realizado con éxito',
        });
      }
      setLoading(false);
      setModalSubirDoc(false);
      setSelectedEfecto(null);
      setNewDocuments({ files: [] });
    } catch (error) {
      setLoading(false);
      notifications.warning({
        title: '¡Atención!',
        body: 'Debe seleccionar un tipo de documento',
      });
    }
  };
  return (
    <div
      className="main-container operaciones w-full h-full flex flex-col p-4"
      ref={ref}
    >
      <FinanciarButtons />
      <Tabs
        setSelectedTab={(tab) => {
          setSelectedTab(tab);
          if (tab !== selectedTab) setShowCarga(false);
        }}
        selectedTab={selectedTab}
      >
        <Tab
          dataId="efectos-sin-asignar-tab"
          title={`Efectos sin asignar  (${efectos?.length || 0})`}
          key={1}
        >
          <div data-id="efectos-sin-asignar-container" className="table-card">
            <Header
              efectosSelectButton={efectosSelectButton}
              setEfectosSelectButton={setEfectosSelectButton}
              options={optionsEfectosTable}
            />

            <TableOperacionEfectos
              selectedEfectos={selectedEfectos}
              setSelectedEfectos={setSelectedEfectos}
              addDocumentation={addDocumentation}
              sinAsignar
              isLoading={efectosIsLoading}
              footerDesktop={
                efectosSelectButton === EFECTOS_TABLE_IDS.ACTIVAS &&
                footerTemplate
              }
              footer={responsiveFooterTemplate}
              data={efectos}
              selectedTable={efectosSelectButton}
              isAdUser={isAdUser}
              setDisableActivos={(value) => {
                setDisableActivos(value);
              }}
              changeToHistorial={() => {
                setButtonValue(2);
              }}
              setNeedLoad={setNeedLoad}
              showCarga={showCarga}
              setShowCarga={setShowCarga}
            />
          </div>
        </Tab>
        <Tab
          dataId="operaciones-activas-tab"
          title={`Operaciones activas (${operaciones?.items?.length || 0})`}
          key={2}
        >
          {(!disableActivos || !disableHistorial) && (
            <div data-id="operaciones-activas-container" className="table-card">
              <div className="header-table header-table--operaciones">
                <h2 className="title-h2">
                  {buttonValue === 1
                    ? 'Operaciones activas'
                    : 'Historial de operaciones'}
                </h2>
                <div className="select-buttton-operaciones-wrapper">
                  <SelectButton
                    value={buttonValue}
                    optionValue="value"
                    options={options}
                    onChange={(e) => {
                      setButtonValue(e.value ? e.value : 1);
                    }}
                    itemTemplate={optionsTemplate}
                  />
                </div>
              </div>
              {buttonValue === 1 ? (
                <TableOperacionesActivas
                  isAdUser={isAdUser}
                  isLoading={isLoading}
                  operaciones={operaciones}
                  setOperaciones={setOperaciones}
                  addDocumentation={addDocumentation}
                  setDisableActivos={(value) => {
                    setDisableActivos(value);
                  }}
                  changeToHistorial={() => {
                    setButtonValue(2);
                  }}
                  setNeedLoad={setNeedLoad}
                />
              ) : (
                <TableOperacionesHistorial
                  data={operaciones}
                  setDisableHistorial={() => {
                    setDisableHistorial(true);
                  }}
                />
              )}
            </div>
          )}
        </Tab>
      </Tabs>
      {scoringUpdate && (
        <Dialog
          isOpen={isOpen}
          close={handleScoring}
          className="update-scoring"
          closeButtonLinkAppareance
        >
          <>
            <div className="m-4 text-center">
              <b>
                Sus precios han sido actualizados. Por favor revise sus efectos
                y vuelva a generar contrato.
              </b>
            </div>

            <Button
              label="Aceptar"
              onClick={handleScoring}
              className="p-button-primary"
            />
          </>
        </Dialog>
      )}
      <CrearEstudio
        onSubmit={handleCrearEstudio}
        cancelFunc={() => setOpenCrearEstudio(false)}
        isOpen={openCrearEstudio}
        toggle={() => setOpenCrearEstudio(!openCrearEstudio)}
        efectosNoAprobadosPorPRAS={efectosNoAprobadosPorPRAS}
        disableButtons={disableButtons}
      />
      <SubirDocumento
        isOpen={modalSubirDoc}
        toggle={() => {
          setModalSubirDoc(!modalSubirDoc);
          resetModal();
        }}
        cancelFunc={() => {
          setModalSubirDoc(false);
          resetModal();
        }}
        loading={loading}
        data={newDocuments}
        setData={setNewDocuments}
        handleUpload={handleUpload}
        header="Añadir documento de efecto"
        options={documentoEfectoOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        optionValue="id"
        optionLabel="description"
      />
      <Modal
        isOpen={openModalPeriodoPago}
        onClose={() => setOpenModalPeriodoPago(false)}
        title="Información de su cliente"
        className="w-1/2 periodo-pago__modal h-fit"
      >
        <FechaPagoForm
          className="h-100"
          selectedEfectos={selectedEfectos}
          setOpenModalPeriodoPago={setOpenModalPeriodoPago}
          openModalPeriodoPago={openModalPeriodoPago}
          onSetSelectedEffects={onSetSelectedEffects}
          onSetStep={onSetStep}
        />
      </Modal>
    </div>
  );
};

export default Operaciones;
