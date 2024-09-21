/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import EfectoService from 'utils/services/efectos-service';
import FacturaDePagareService from 'utils/services/factura-de-pagare-service';
import FacturasService from 'utils/services/facturas-service';

import { esFicticio, tipoDocumentoString } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';
import notifications from '@shared/utils/notificationsOv';
import { radioYesNoValues } from '@shared/utils/utilsOv';

import LayoutContext from 'context/LayoutContext';
import DragModal from 'components/DragModal';
import EfectosButtonBar from 'components/EfectosButtonBar';
import { FileUploader } from 'components/FileUploader';
import FacturaForm from 'components/forms/FacturaForm';
import { CurrentFileContext } from 'pages/SubirEfectos/context';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';
import * as Actions from 'store/actions/actions-effect';

import FacturaPagareButtonBar from './ButtonBar';

import './factura.scss';

const facturasService = new FacturasService();
const facturaDePagareService = new FacturaDePagareService();
const efectoService = new EfectoService();

const titles = [
  {
    tipo: parseInt(tipoDocumentoString.FACTURA, 10),
    title: 'Añadir factura',
  },
  {
    tipo: parseInt(tipoDocumentoString.FACTURA_PAGARE, 10),
    title: 'Añadir factura de pagaré',
  },
];

const Factura = ({
  onSetCurrentEffect,
  effectsState,
  fromDocRequerida = false,
  onSetStep,
  libradorCif,
  switchEffectView,
  actualizar,
  libradoCif,
}) => {
  const {
    tipoEfecto,
    razonSocial,
    efectos,
    originEditionUrl,
    pagareFormData = {},
    facturaFormData = {},
    efectoId,
  } = effectsState;
  const { currentFiles, setCurrentFiles } =
    useContext(CurrentFileContext) || {};
  const [factura, setFactura] = useState({});
  const [pagaresToDropdown, setPagaresToDropdown] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const rhForm = useForm({ mode: 'onBlur' });
  const { libradorId } = useSelector((store) => store.userState);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const isFacturaPagare =
    tipoEfecto === parseInt(tipoDocumentoString.FACTURA_PAGARE, 10);
  const context = useContext(LayoutContext);

  const parsePagares = (array) => {
    const res = [];
    array.map((item) =>
      res.push({
        name: `${item.numero} - ${formatCurrency(item.importeNominal)}`,
        code: item.id,
        id: item.id,
      })
    );
    setPagaresToDropdown(res);
  };

  const fetchPagares = useCallback(async (libradoCif) => {
    const response = await efectoService.getEfectosPedientesByEmpresaActiva(
      true
    );
    if (!response || response.length === 0) {
      parsePagares([]);
      return;
    }
    parsePagares(
      response.items.filter((item) => {
        if (
          !item.esFicticio &&
          item?.tipo?.id === parseInt(tipoDocumentoString.PAGARE, 10) &&
          item.libradoCif === libradoCif
        ) {
          return true;
        }
        return false;
      })
    );
  }, []);

  const setInitialValues = useCallback(
    (facturaData) => {
      if (parseInt(tipoDocumentoString.FACTURA_PAGARE, 10) === tipoEfecto) {
        setFactura({
          esFacturaPagare: radioYesNoValues.NO,
          libradoCif: pagareFormData?.libradoCif || libradoCif,
          libradoRazonSocial: pagareFormData?.libradoRazonSocial || razonSocial,
          numero: '',
          importeNominal: 0,
          fechaEmision: '',
          fechaVencimiento: '',
          files: [],
          cesion: '',
          pagare: '',
          libradorId,
        });
        return;
      }
      setFactura({
        esFacturaPagare: radioYesNoValues.NO,
        libradoCif: facturaData?.libradoCif || '',
        libradoRazonSocial: facturaData?.libradoRazonSocial || '',
        numero: facturaData?.numero || '',
        importeNominal: facturaData?.importeNominal || 0,
        fechaEmision: facturaData?.fechaEmision || '',
        fechaVencimiento: facturaData?.fechaVencimiento || '',
        files: [],
        cesion: '',
        pagare: '',
        libradorId,
      });
    },
    [
      libradoCif,
      libradorId,
      pagareFormData?.libradoCif,
      pagareFormData?.libradoRazonSocial,
      razonSocial,
      tipoEfecto,
    ]
  );

  const continuarToResume = (clonedEfectos) => {
    onSetStep({ currentStep: 1, onBoard: true });
    navigate('/nueva-operacion/true', {
      state: {
        nuevaOp: true,
        efectos: clonedEfectos,
        step: 1,
      },
    });
  };

  const saveFactura = async (clonedEfectos, nextStep) => {
    setIsSubmitting(nextStep ? 'backAction' : 'submitAction');
    const res = await facturasService.postFacturaFile(factura);
    setIsSubmitting(false);
    if (res) {
      notifications.success({
        body: 'La factura se ha subido correctamente',
        title: '¡Éxito!',
      });
      const facturaEfectosIndex = clonedEfectos.findIndex(
        (x) => x.tipoDoc === tipoDocumentoString.FACTURA
      );
      if (facturaEfectosIndex === -1) {
        clonedEfectos.push({
          tipoDoc: +tipoDocumentoString.FACTURA,
          efectoId: res,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        clonedEfectos = [
          {
            efectoId: res,
            tipoDoc: +tipoDocumentoString.FACTURA,
          },
        ];
      }
    }
    return res;
  };

  const saveFacturaPagare = async (facturaId, pagareId) => {
    await facturaDePagareService.setFacturaDePagare(
      pagareId || efectoId,
      facturaId
    );
    if (actualizar) actualizar();
  };

  const sumbitFacturaPagare = async () => {
    let clonedEfectos = [];
    if (efectos && efectos.length > 0) {
      clonedEfectos = [...efectos];
    }
    if (factura?.files?.length === 0) {
      notifications.warning({
        title: '¡Aviso!',
        body: 'Debe subir una imagen antes de continuar',
      });
      return;
    }
    try {
      let res;
      if (factura?.files?.length) {
        res = await saveFactura(clonedEfectos);
        if (res) {
          dispatch(
            getDocumentosPendientesLibrador(
              libradorId || sessionStorage.getItem('libradorId')
            )
          );
          if (fromDocRequerida) {
            await saveFacturaPagare(res.id);
          } else {
            dispatch(
              Actions.appendFacturaToPagareForm({
                id: res.id,
                name: `${res.numero} - ${res.importeNominal}`,
              })
            );
          }
        }
      }
      if (originEditionUrl) {
        const f = await facturasService.getFacturaById(res);
        if (f) {
          navigate(originEditionUrl, {
            state: {
              facturas: f
                ? [
                    {
                      id: f.id,
                      name: f.numero,
                    },
                  ]
                : [],
            },
          });
        }
      } else {
        switchEffectView({ tipoEfecto: 1 });
      }
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  const isAnIncompleteForm = () => {
    if (factura?.files?.length === 0) {
      notifications.warning({
        title: '¡Aviso!',
        body: 'Debe subir una imagen antes de continuar',
      });
      return true;
    }
    return false;
  };

  const submitFactura = async (nextStep) => {
    let clonedEfectos = [];
    if (efectos && efectos.length > 0) {
      clonedEfectos = [...efectos];
    }
    if (isAnIncompleteForm()) return;
    // reset
    dispatch(Actions.resetFacturaFormData());
    setCurrentFiles([]);
    try {
      const res = await saveFactura(clonedEfectos, nextStep);
      setInitialValues();
      if (res) {
        // associate cesión
        if (factura?.esFacturaPagare && factura?.pagare?.id) {
          await saveFacturaPagare(res.id, factura?.pagare?.id);
        }
        dispatch(
          getDocumentosPendientesLibrador(
            libradorId || sessionStorage.getItem('libradorId')
          )
        );
        if (onSetCurrentEffect && nextStep && !fromDocRequerida) {
          onSetCurrentEffect({
            step: nextStep,
            efectoId: res,
            efectos: clonedEfectos,
            tipoEfecto: +tipoDocumentoString.FACTURA,
          });
        } else if (!nextStep && !fromDocRequerida) {
          continuarToResume(clonedEfectos);
        }
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  /**
   * Hago uso de la comparación que se encuentra en este método porque sino cualquier cosa arrastrada dentro de la página activa el modal.
   * @param {event} e
   */
  const handleDragEnter = (e) => {
    if (e.dataTransfer.types) {
      for (let i = 0; i < e.dataTransfer.types.length; i += 1) {
        if (e.dataTransfer.types[i] === 'Files') {
          setModalVisible(true);
          break;
        }
      }
    }
    e.preventDefault();
  };

  /**
   * La condición comprueba que el archivo ha sido arrastrado fuera del HTML para desactivar el modal.
   * @param {event} e
   */
  const handleDragLeave = (e) => {
    if (e.fromElement?.localName === 'html' || e.fromElement === null)
      setModalVisible(false);
    e.preventDefault();
  };

  const handleDrop = (e) => {
    setModalVisible(false);
    e.preventDefault();
  };

  const uploadAnotherEffectType = (data) => {
    switchEffectView(data);
  };

  useEffect(() => {
    document.body.addEventListener('dragenter', handleDragEnter, false);
    document.body.addEventListener('dragleave', handleDragLeave, false);
    document.body.addEventListener('drop', handleDrop, false);
    return () => {
      document.body.removeEventListener('dragenter', handleDragEnter, false);
      document.body.removeEventListener('dragleave', handleDragLeave, false);
      document.body.removeEventListener('drop', handleDrop, false);
    };
  }, []);

  useEffect(() => {
    if (!['/cesiones/add/true', '/subir-efectos'].includes(location.pathname)) {
      dispatch(Actions.resetFacturaFormData());
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (!isFacturaPagare && factura?.files?.length && setCurrentFiles) {
      setCurrentFiles(factura.files);
    }
  }, [factura.files, setCurrentFiles, isFacturaPagare]);

  useEffect(() => {
    if (currentFiles?.length)
      setFactura((p) => ({ ...p, files: currentFiles }));
  }, [currentFiles]);

  useEffect(() => {
    setInitialValues(facturaFormData);
  }, [setInitialValues, facturaFormData]);

  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-fit rounded-lg shadow-md bg-white p-4 w-3/5">
        <div className="flex mb-5">
          <h2 className="mb-4 title-h2">
            {tipoEfecto && titles.find((x) => x.tipo === tipoEfecto)?.title}
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 min-w-64">
            <FileUploader
              docType="FACTURA"
              data={factura}
              type={tipoDocumentoString.FACTURA}
              setData={setFactura}
            />
          </div>
          <div className="flex-[3]">
            <FacturaForm
              libradorCif={libradorCif}
              tipoEfecto={tipoEfecto}
              factura={factura}
              setFactura={setFactura}
              isFacturaPagare={isFacturaPagare}
              uploadAnotherEffectType={uploadAnotherEffectType}
              fetchPagares={fetchPagares}
              pagaresToDropdown={pagaresToDropdown}
              rhForm={rhForm}
            />
            <div className="mt-5">
              <div className="d-flex justify-content-end">
                {!isFacturaPagare ? (
                  <EfectosButtonBar
                    disableAll={isSubmitting}
                    isSubmitting={isSubmitting}
                    typeOfDocument={tipoEfecto}
                    submitButtonLabel="Siguiente"
                    thirdButtonLabel="Subir otra documentación"
                    backFunc={() => {
                      rhForm.handleSubmit(() => submitFactura(1))();
                    }}
                    thirdButtonFunc={() => {
                      submitFactura(2);
                    }}
                    submitFunc={() => {
                      rhForm.handleSubmit(() => submitFactura())();
                    }}
                  />
                ) : (
                  <FacturaPagareButtonBar
                    isSubmitting={isSubmitting}
                    onSubmit={() =>
                      rhForm.handleSubmit(() => sumbitFacturaPagare())()
                    }
                    continuar={() =>
                      rhForm.handleSubmit(() => sumbitFacturaPagare())()
                    }
                    continueButton={!fromDocRequerida}
                    continueButtonLabel="Siguiente"
                    fromDocRequerida={fromDocRequerida}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {modalVisible && factura.esFicticio === esFicticio.NO && <DragModal />}
      </div>
    </div>
  );
};

export default Factura;
