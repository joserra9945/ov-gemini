/* eslint-disable eqeqeq */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@shared/components/Modal';
import { esFicticio, tipoDocumentoString } from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';

import LayoutContext from 'context/LayoutContext';
import DragModal from 'components/DragModal';
import { FileUploader } from 'components/FileUploader';
import Form from 'components/forms/PagareForm';
import VincularFacturaPagare from 'components/VincularFacturaPagare';
import { CurrentFileContext } from 'pages/SubirEfectos/context';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import notifications from '../../../shared/utils/notifications';
import * as Actions from '../../store/actions/actions-effect';
import PagareService from '../../utils/services/pagare-service';

import './pagare.scss';

const pagareService = new PagareService();

const Pagare = ({
  effectsState,
  onSetStep,
  switchEffectView,
  onSetCurrentEffect,
}) => {
  const dispatch = useDispatch();
  const { currentFiles, setCurrentFiles } = useContext(CurrentFileContext);
  const { efectos, pagareFormData } = effectsState;
  const [pagare, setPagare] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [showVincularFactura, setShowVincularFactura] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const rhForm = useForm({ mode: 'onBlur' });
  const [facturasToDropdown, setFacturasToDropdown] = useState([]);
  const { libradorId } = useSelector((store) => store.userState);
  const [pagareId, setPagareId] = useState('');
  const navigate = useNavigate();
  const context = useContext(LayoutContext);

  const setInitialValues = useCallback(
    (formData) => {
      setPagare({
        esFicticio: esFicticio.NO,
        libradoCif: formData?.libradoCif || '',
        libradoRazonSocial: formData?.libradoRazonSocial || '',
        numero: formData?.numero || '',
        importeNominal: formData?.importeNominal || 0,
        lugarEmision: formData?.lugarEmision || '',
        tipo: 'PAGOR',
        fechaEmision: formData?.fechaEmision || '',
        fechaVencimiento: formData?.fechaVencimiento || '',
        files: [],
        facturas: formData?.facturas || [],
        libradorId,
      });
    },
    [libradorId]
  );

  const continueToResume = (clonedEfectos) => {
    onSetStep({ currentStep: 1, onBoard: true });
    navigate('/nueva-operacion/true', {
      state: {
        nuevaOp: true,
        efectos: clonedEfectos,
        step: 1,
      },
    });
  };

  const handleOnCloseModal = () => {
    setShowVincularFactura(false);
  };

  const onSubmit = async (nextStep, showModal = false) => {
    let clonedEfectos = [];
    if (efectos && efectos.length > 0) {
      clonedEfectos = [...efectos];
    }
    if (pagare.esFicticio === esFicticio.NO && pagare?.files?.length === 0) {
      notifications.warning({
        title: '¡Aviso!',
        body: 'Debe subir una imagen antes de continuar',
      });
      return;
    }
    try {
      setIsSubmitted(nextStep ? 'backAction' : 'submitAction');
      const res = await pagareService.postPagareFile(pagare);
      setIsSubmitted(false);
      dispatch(Actions.resetPagareFormData());
      setCurrentFiles([]);
      setInitialValues();
      if (res) {
        dispatch(
          getDocumentosPendientesLibrador(
            libradorId || sessionStorage.getItem('libradorId')
          )
        );
        notifications.success({
          body: 'El pagaré se ha subido correctamente',
          title: '¡Éxito!',
        });
        const pagareEfectosIndex = clonedEfectos.findIndex(
          (x) => x.tipoDoc === tipoDocumentoString.PAGARE
        );
        if (pagareEfectosIndex === -1) {
          clonedEfectos.push({
            tipoDoc: +tipoDocumentoString.PAGARE,
            efectoId: res,
          });
        } else {
          clonedEfectos = [
            {
              tipoDoc: +tipoDocumentoString.PAGARE,
              efectoId: res.id,
            },
          ];
        }
        if (onSetCurrentEffect && nextStep) {
          onSetCurrentEffect({
            step: 1,
            efectoId: res,
            efectos: clonedEfectos,
            tipoEfecto: +tipoDocumentoString.PAGARE,
          });
        } else if (showModal && !nextStep) {
          setPagare((prevPagare) => ({
            ...prevPagare,
            id: res,
          }));
          setPagareId(res);
          setShowVincularFactura(true);
        } else if (!nextStep) {
          continueToResume(clonedEfectos);
        }
      }
    } catch {
      setIsSubmitted(false);
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
  const uploadAnotherEffectType = (data) => {
    switchEffectView(data);
  };

  useEffect(() => {
    setInitialValues(pagareFormData);
  }, [setInitialValues, pagareFormData]);

  useEffect(() => {
    if (currentFiles?.length) setPagare((p) => ({ ...p, files: currentFiles }));
  }, [currentFiles]);

  useEffect(() => {
    if (pagare?.esFicticio === esFicticio.SI) {
      setPagare((value) => ({ ...value, files: [] }));
    }
  }, [pagare.esFicticio]);

  useEffect(() => {
    if (pagare?.files?.length && setCurrentFiles) {
      setCurrentFiles(pagare.files);
    }
  }, [pagare.files, setCurrentFiles]);

  useEffect(() => {
    context.setHiddenSidebar(true);
    context.setHiddenHeader(true);
  }, [context]);

  return (
    <div className="flex h-full w-full justify-center">
      <div className="h-fit rounded-lg shadow-md bg-white p-4 w-3/5">
        <div className="titulo-stepper">
          <h2 className="mb-4 title-h2">Añadir pagaré</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 min-w-64">
            {pagare.esFicticio === esFicticio.NO && (
              <FileUploader
                data={pagare}
                type={tipoDocumentoString.PAGARE}
                setData={setPagare}
                docType="PAGARÉ"
              />
            )}
          </div>
          <div className="flex-[3]">
            <Form
              pagare={pagare}
              facturasToDropdown={facturasToDropdown}
              setFacturasToDropdown={setFacturasToDropdown}
              setPagare={setPagare}
              onSubmit={onSubmit}
              uploadAnotherEffectType={uploadAnotherEffectType}
              rhForm={rhForm}
            />
            <Modal
              open={showVincularFactura}
              onClose={handleOnCloseModal}
              className="vincular__form"
              header="Vincular factura a pagaré"
              closable={false}
            >
              <VincularFacturaPagare
                pagareId={pagareId}
                setModal={() => {
                  setShowVincularFactura(true);
                }}
                fromPagareForm
                onNextFromParent={() => {
                  const clonedEfectos = [
                    {
                      tipoDoc: +tipoDocumentoString.PAGARE,
                      efectoId: pagareId,
                    },
                  ];
                  onSetCurrentEffect &&
                    onSetCurrentEffect({
                      step: 1,
                      efectoId: pagareId,
                      efectos: clonedEfectos,
                      tipoEfecto: +tipoDocumentoString.PAGARE,
                    });
                  continueToResume(clonedEfectos);
                }}
              />
            </Modal>
            <div className="mt-5 action-buttons--pagare row">
              <div>
                <div className="d-flex justify-content-end version-movil">
                  <Button
                    label="Vincular facturas"
                    color="light"
                    disabled={isSubmitted && isSubmitted != 'submitAction'}
                    loading={isSubmitted == 'submitAction'}
                    className="mr-2 form__loader-button"
                    onClick={() => {
                      if (!isSubmitted) {
                        rhForm.handleSubmit(() => onSubmit(false, true))();
                      }
                    }}
                  />
                  <Button
                    id="nuevoPagare"
                    label="Subir un nuevo pagaré"
                    color="light"
                    disabled={isSubmitted && isSubmitted != 'backAction'}
                    className="mr-2 form__loader-button"
                    loading={isSubmitted == 'backAction'}
                    onClick={() => {
                      if (!isSubmitted)
                        rhForm.handleSubmit(() => onSubmit(true))();
                    }}
                  />
                  <Button
                    id="guardarPagare"
                    label="Siguiente"
                    disabled={isSubmitted && isSubmitted != 'submitAction'}
                    className="form__loader-button"
                    loading={isSubmitted == 'submitAction'}
                    onClick={() => {
                      if (!isSubmitted) rhForm.handleSubmit(() => onSubmit())();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalVisible && pagare.esFicticio === esFicticio.NO && <DragModal />}
      </div>
    </div>
  );
};

export default Pagare;
