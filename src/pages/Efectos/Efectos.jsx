/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import cloneDeep from 'lodash/cloneDeep';
import CesionService from 'utils/services/cesion-service';
import EfectoService from 'utils/services/efectos-service';
import FacturasService from 'utils/services/facturas-service';
import PagaresService from 'utils/services/pagare-service';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { esFicticio, tipoDocumentoString } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';

import { Button as ButtonLoader } from '@shared/components/Legacy/Button';

import BasicTempalte from 'components/Dialogs/BasicTemplate';
import EfectosButtonBar from 'components/EfectosButtonBar';
import { FileUploader } from 'components/FileUploader';
import FacturaForm from 'components/forms/FacturaForm';
import PagareForm from 'components/forms/PagareForm';
import VincularFacturaPagare from 'components/VincularFacturaPagare';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import './styles.scss';

const facturasService = new FacturasService();
const pagaresService = new PagaresService();
const efectoService = new EfectoService();
const cesionService = new CesionService();

const nextStepEnum = {
  CONTINUE_TO_CREATE_OTHER: 1,
  CONTINUE_TO_ADD_DOCUMENTS: 2,
  CONTINUE_TO_SUMMARY: 3,
};

const Efectos = ({ onSetInfoEffect, onSetStep, switchEffectView }) => {
  const params = useParams();
  const [, setData] = useState([]);
  const [facturasToDropdown, setFacturasToDropdown] = useState([]);
  const [pagaresToDropdown, setPagaresToDropdown] = useState([]);
  const subirEfectos = '/subir-efectos';
  const location = useLocation();
  const isDisabledFromDocReq = location?.state?.fromDocReq;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [factura, setFactura] = useState({});
  const [pagare, setPagare] = useState({});
  const [lastModificationDate, setLastModificationDate] = useState(null);
  const [eraFicticio, setEraFicticio] = useState(false);
  const rhForm = useForm({ mode: 'onBlur' });
  const [cesionesLibrador, setCesionesLibrador] = useState([]);
  const { libradorId, isAdUser } = useSelector((store) => store.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, tipo, entryPointFlow } = params;

  const changeStep = useCallback(
    (newStep) => {
      onSetStep({ currentStep: newStep, onBoard: true });
    },
    [onSetStep]
  );

  useEffect(() => {
    if (entryPointFlow) {
      changeStep(0);
    }
  }, [entryPointFlow, changeStep]);

  const getTipoPagare = (pagare) => {
    if (!pagare) return 'PAGOR';
    if (pagare.esALaOrden && pagare.esTruncable) return 'PAGOR';
    if (!pagare.esALaOrden && pagare.esTruncable) return 'PAGNO';
    if (pagare.esALaOrden && !pagare.esTruncable) return 'PAGOT';
    if (!pagare.esALaOrden && !pagare.esTruncable) return 'PAGNT';
  };

  const isFactura = tipo === tipoDocumentoString.FACTURA;
  const isPagare = tipo === tipoDocumentoString.PAGARE;
  const isFacturaPagare = tipo === tipoDocumentoString.FACTURA_PAGARE;
  const isFicticio = isFactura ? factura?.esFicticio : pagare?.esFicticio;
  const shouldShowUploader =
    isFicticio === esFicticio.NO || !isFicticio || !entryPointFlow;
  const [showVincularFactura, setShowVincularFactura] = useState(false);

  const handleNavigate = (link, state) => {
    return <Navigate to={link} state={state} />;
  };

  const parseEfectos = (array, defaultFacturas, tipoDoc) => {
    const res = defaultFacturas ? cloneDeep(defaultFacturas) : [];
    array.map((item) =>
      res.push({
        name: `${item?.numero} - ${formatCurrency(item?.importeNominal)}`,
        code: item?.id,
        id: item?.id,
      })
    );
    if (parseInt(tipoDoc, 10) === +tipoDocumentoString.FACTURA) {
      setFacturasToDropdown(res);
    } else {
      setPagaresToDropdown(res);
    }
  };

  const continueToResume = (clonedEfectos) => {
    onSetStep({ currentStep: 1, onBoard: true });
    handleNavigate('/', {
      ...location?.state,
      nuevaOp: true,
      efectos: clonedEfectos,
      step: 1,
    });
  };

  const fetchEfectos = useCallback(
    async (libradoCif, defaultFacturas, tipoDoc) => {
      const response = await efectoService.getEfectosPedientesByEmpresaActiva(
        true
      );
      if (!response || response.length === 0) {
        parseEfectos([], defaultFacturas, tipoDoc);
        return;
      }
      parseEfectos(
        response.items.filter(
          (item) =>
            !item.esFicticio &&
            item?.tipo?.id === tipoDoc &&
            item.libradoCif === libradoCif
        ),
        defaultFacturas,
        tipoDoc
      );
    },
    []
  );

  const getTipoEfectoToString = () => {
    if (entryPointFlow) {
      if (isFactura) return 'Añadir factura';
      return 'Añadir pagaré';
    }
    if (isFactura) return 'Factura';
    if (isPagare) return 'Pagaré';

    return 'Sin setear';
  };

  const setFacturasDePagare = useCallback(
    (facturasAsociadas) => {
      if (facturasAsociadas && location.state?.facturas) {
        return facturasAsociadas.concat(location.state?.facturas);
      }
      if (facturasAsociadas) {
        return facturasAsociadas;
      }
      if (location.state?.facturas) {
        handleNavigate(location.state?.facturas);
      }
      return [];
    },
    [location]
  );

  const initializeCesiones = (cesionesContrato, setInitialCesion = false) => {
    let cesionInitialValue = '';
    if (setInitialCesion) {
      cesionInitialValue = cesionesContrato?.length ? cesionesContrato[0] : '';
    }
    setFactura((f) => ({ ...f, cesion: cesionInitialValue }));
    setCesionesLibrador(cesionesContrato);
  };

  const fetchCesiones = useCallback(
    async (libradoCif) => {
      try {
        const cesiones = await cesionService.getDisponiblesByLibradoLibrador(
          libradoCif,
          isAdUser,
          '&SortingCriteria=tipo DESC'
        );

        initializeCesiones(cesiones?.items, true);
      } catch {
        initializeCesiones([], []);
      }
    },
    [isAdUser]
  );

  const fetchFacturas = useCallback(
    async (librado) => {
      const facturas = await facturasService.getFacturaByPagareId(
        librado?.id,
        libradorId
      );
      if (!facturas || !facturas?.items?.length) {
        parseEfectos([]);
        return;
      }
      const selectableFacturas = facturas.items.filter((item) => {
        if (
          !item.esFicticio &&
          item.tipoDocumentoId === parseInt(tipoDocumentoString.FACTURA, 10) &&
          item.libradoCif === librado?.cif
        ) {
          return true;
        }
        return false;
      });
      parseEfectos(selectableFacturas, false, tipoDocumentoString.FACTURA);
    },
    [libradorId]
  );

  useEffect(() => {
    if (isFactura) {
      const getFactura = async () => {
        const res = await facturasService.getFacturaById(id);
        if (res) {
          const file = !res.esFicticio
            ? await facturasService.getFacturaFileByIdPDF(id)
            : null;
          setEraFicticio(res.esFicticio);
          const newFactura = {
            id,
            esFicticio: entryPointFlow ? false : res.esFicticio,
            libradoCif: res.libradoCif || '',
            libradoRazonSocial: res.libradoRazonSocial || '',
            numero: res.numero || '',
            importeNominal: res.importeNominal || '',
            fechaEmision: res.fechaEmision ? new Date(res.fechaEmision) : '',
            fechaVencimiento: res.fechaVencimiento
              ? new Date(res.fechaVencimiento)
              : '',
            files: [],
            pagare: '',
          };
          if (file)
            newFactura.files.push({
              file,
              id: 0,
            });
          setFactura(newFactura);
          setLastModificationDate(res.lastModificationTime);
          setData([
            {
              id: 0,
              file: file || '',
              factura: newFactura,
            },
          ]);
          fetchEfectos(res.libradoCif, null, +tipoDocumentoString.PAGARE);
        }
        fetchCesiones(res.libradoCif);
      };
      getFactura();
    } else if (isPagare) {
      const getPagare = async () => {
        const res = await pagaresService.getPagareById(id);
        if (res) {
          let file = null;
          if (!res.esFicticio) {
            file = await pagaresService.getPagareFileByIdPDF(id);
          }
          setEraFicticio(res.esFicticio);
          let facturasAsociadas;
          if (res.tieneFacturas) {
            facturasAsociadas = await facturasService.getFacturaByPagareId(id);
            facturasAsociadas = facturasAsociadas?.items?.map((item) => ({
              name: `${item.numero} - ${formatCurrency(item.importeNominal)}`,
              id: item.id,
            }));
          }
          const newPagare = {
            id,
            esFicticio: entryPointFlow ? false : res.esFicticio,
            libradoCif: res.libradoCif,
            libradoRazonSocial: res.libradoRazonSocial,
            numero: res.numero || '',
            importeNominal: res.importeNominal || '',
            lugarEmision:
              res?.lugarEmision === 'undefined' ? null : res?.lugarEmision,
            tipo: getTipoPagare(res),
            fechaEmision: res.fechaEmision ? new Date(res.fechaEmision) : '',
            fechaVencimiento: res.fechaVencimiento
              ? new Date(res.fechaVencimiento)
              : '',
            files: [],
            facturas: setFacturasDePagare(facturasAsociadas),
            operacionId: res.operacionId,
          };
          if (file)
            newPagare.files.push({
              file,
              id: 0,
            });
          setPagare(newPagare);
          setLastModificationDate(res.lastModificationTime);
          setData([
            {
              id: 0,
              file: file || '',
              pagare: newPagare,
            },
          ]);
          fetchFacturas({ id: res?.libradoId, cif: res?.libradoCif });
        }
      };
      getPagare();
    }
  }, [
    id,
    tipo,
    entryPointFlow,
    fetchEfectos,
    isFactura,
    isPagare,
    setFacturasDePagare,
    fetchCesiones,
    fetchFacturas,
  ]);

  useEffect(() => {
    if (factura?.esFicticio === esFicticio.SI) {
      setFactura((value) => ({ ...value, files: [] }));
    }
  }, [factura.esFicticio]);

  useEffect(() => {
    if (pagare?.esFicticio === esFicticio.SI) {
      setPagare((value) => ({ ...value, files: [] }));
    }
  }, [pagare.esFicticio]);

  const getPromise = () => {
    return isFactura
      ? facturasService.putFacturaById(
          factura,
          id,
          lastModificationDate,
          entryPointFlow ? isFicticio : false
        )
      : pagaresService.putPagareById(
          pagare,
          id,
          lastModificationDate,
          entryPointFlow ? isFicticio : false
        );
  };

  const onSubmitEdit = async (nextStep) => {
    setIsSubmitting(true);
    try {
      let effectId;
      if (
        (isPagare
          ? pagare?.files?.length === 0
          : factura?.files?.length === 0 ||
            (isDisabledFromDocReq && factura?.files?.length === 0)) &&
        (isPagare
          ? pagare?.isFicticio === 2
          : factura?.isFicticio === 2 ||
            (isDisabledFromDocReq && factura?.files?.length === 0))
      ) {
        Notifications.warning({
          title: '¡Aviso!',
          body: 'Debe subir una imagen antes de continuar',
        });
        setIsSubmitting(false);

        return true;
      }
      if (eraFicticio || (isFactura && factura.cesion)) {
        const apiPromise = getPromise();
        effectId = await apiPromise;
        if (effectId) {
          const title = isFactura ? 'Factura Editada!' : 'Pagaré Editado!';
          const body = isFactura ? 'la factura' : 'el pagaré';
          Notifications.success({
            title,
            body: isDisabledFromDocReq
              ? 'Factura subida correctamente'
              : `Se ha editado ${body} correctamente`,
          });
          if (isFactura && factura?.files?.length) {
            await facturasService.putFacturaFileById(factura);
          } else if (isPagare && pagare?.files?.length) {
            await pagaresService.putPagareFileById(pagare);
          }
        }
      }
      dispatch(
        getDocumentosPendientesLibrador(
          libradorId || sessionStorage.getItem('libradorId')
        )
      );
      if (isPagare && pagare?.facturas?.length) {
        const promises = pagare.facturas.map(async () => {
          return null;
        });
        await Promise.all(promises);
      }
      setIsSubmitting(false);
      if (!entryPointFlow && !isFactura) {
        setShowVincularFactura(true);
      } else if (
        effectId &&
        nextStep === nextStepEnum.CONTINUE_TO_CREATE_OTHER
      ) {
        onSetInfoEffect({
          step: nextStep,
          efectoId: effectId,
          esFicticio: false,
          efectos: [
            {
              tipoDoc: isFactura
                ? +tipoDocumentoString.FACTURA
                : +tipoDocumentoString.PAGARE,
              efectoId: effectId,
            },
          ],
          tipoEfecto: isFactura
            ? tipoDocumentoString.FACTURA
            : tipoDocumentoString.PAGARE,
        });
        handleNavigate(subirEfectos);
      } else if (effectId && nextStep === nextStepEnum.CONTINUE_TO_SUMMARY) {
        if (isDisabledFromDocReq) {
          handleNavigate('/');
        }
        onSetStep({ currentStep: 1, onBoard: true });
        return handleNavigate('/nueva-operacion/true', {
          nuevaOp: true,
          efectos: [
            {
              tipoDoc: +isFactura
                ? +tipoDocumentoString.FACTURA
                : +tipoDocumentoString.PAGARE,
              efectoId: effectId,
            },
          ],
          step: 1,
        });
      }
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  const fetchPagares = useCallback(
    (e) => fetchEfectos(e, null, +tipoDocumentoString.PAGARE),
    [fetchEfectos]
  );

  if (!factura && !pagare)
    return (
      <div
        style={{ minHeight: '560px' }}
        className="d-flex justify-content-center align-items-center"
      >
        <ProgressSpinner />
      </div>
    );

  return (
    <div className="edit-effect__container col-9 m-auto">
      <div className="card effect-container">
        <div className="titulo-stepper">
          <h2 className="card-title">
            <FontAwesomeIcon
              className="card-title__arrow"
              icon={faArrowLeft}
              onClick={() => {
                navigate(-1);
              }}
            />
            {getTipoEfectoToString()}
          </h2>
        </div>
        <div className="filepond-with-form">
          <div className="row">
            {shouldShowUploader && (
              <div className="col-md-4 effect-filepond__container">
                <FileUploader
                  docType={isFactura ? 'FACTURA' : 'PAGARÉ'}
                  data={isFactura ? factura : pagare}
                  type={tipo}
                  setData={isFactura ? setFactura : setPagare}
                  isEditing={!entryPointFlow}
                  eraFicticio={eraFicticio}
                  isDisabled={
                    !entryPointFlow &&
                    (isFactura ? !factura.esFicticio : !pagare.esFicticio)
                  }
                />
              </div>
            )}

            <div className={shouldShowUploader ? 'col-md-8' : 'col-md-12'}>
              {isFactura && (
                <FacturaForm
                  factura={factura}
                  showButtonPagare={false}
                  setFactura={setFactura}
                  isEditing={!entryPointFlow}
                  eraFicticio={eraFicticio}
                  isDisabled={!entryPointFlow && !factura.esFicticio}
                  isFacturaPagare={isFacturaPagare}
                  fetchPagares={fetchPagares}
                  pagaresToDropdown={pagaresToDropdown}
                  uploadAnotherEffectType={(data) => {
                    onSetInfoEffect({
                      razonSocial: factura?.libradoRazonSocial,
                      cif: factura?.libradoCif,
                      step: 1,
                      tipoEfecto: +tipoDocumentoString.PAGARE,
                      originEditionUrl: window.location.pathname,
                    });
                    switchEffectView(data);
                    handleNavigate(subirEfectos);
                  }}
                  cesionesLibrador={cesionesLibrador}
                  rhForm={rhForm}
                />
              )}
              {isPagare && (
                <PagareForm
                  pagare={pagare}
                  setPagare={setPagare}
                  facturasToDropdown={facturasToDropdown}
                  setFacturasToDropdown={setFacturasToDropdown}
                  fetchFacturas={fetchFacturas}
                  isEditing={!entryPointFlow}
                  isDisabled={!entryPointFlow && !pagare.esFicticio}
                  uploadAnotherEffectType={(data) => {
                    onSetInfoEffect({
                      razonSocial: pagare.libradoRazonSocial,
                      cif: pagare.libradoCif,
                      step: 1,
                      tipoEfecto: +tipoDocumentoString.FACTURA_PAGARE,
                      originEditionUrl: window.location.pathname,
                    });
                    switchEffectView(data);
                    handleNavigate(subirEfectos);
                  }}
                  rhForm={rhForm}
                />
              )}
            </div>
            <BasicTempalte
              isOpen={showVincularFactura}
              onCancel={() => setShowVincularFactura(false)}
              className="vincular__form"
              header="Vincular factura a pagaré"
            >
              <VincularFacturaPagare
                pagareId={pagare?.id}
                setModal={() => {
                  setShowVincularFactura(false);
                }}
                onNextFromParent={() => {
                  const clonedEfectos = [
                    {
                      tipoDoc: +tipoDocumentoString.PAGARE,
                      efectoId: pagare?.id,
                    },
                  ];
                  onSetInfoEffect &&
                    onSetInfoEffect({
                      step: 1,
                      efectoId: pagare?.id,
                      efectos: clonedEfectos,
                      tipoEfecto: +tipoDocumentoString.PAGARE,
                    });
                  continueToResume(clonedEfectos);
                }}
              />
            </BasicTempalte>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-end">
          <div className="col-md-6">
            <div className="d-flex justify-content-between save__button">
              {!entryPointFlow && !isFactura ? (
                <ButtonLoader
                  label="Vincular facturas"
                  color="light"
                  className="form__loader-button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (!isSubmitting) {
                      rhForm.handleSubmit(() => onSubmitEdit())();
                    }
                  }}
                  loading={isSubmitting}
                />
              ) : (
                <EfectosButtonBar
                  disableAll={isSubmitting}
                  typeOfDocument={tipo}
                  submitButtonLabel="Siguiente"
                  thirdButtonLabel="Subir otra documentación"
                  isEditing={!entryPointFlow}
                  backFunc={() => {
                    rhForm.handleSubmit(() =>
                      onSubmitEdit(nextStepEnum.CONTINUE_TO_CREATE_OTHER)
                    )();
                  }}
                  submitFunc={() => {
                    rhForm.handleSubmit(() =>
                      onSubmitEdit(nextStepEnum.CONTINUE_TO_SUMMARY)
                    )();
                  }}
                  thirdButtonFunc={() => {
                    rhForm.handleSubmit(() =>
                      onSubmitEdit(nextStepEnum.CONTINUE_TO_ADD_DOCUMENTS)
                    )();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Efectos;
