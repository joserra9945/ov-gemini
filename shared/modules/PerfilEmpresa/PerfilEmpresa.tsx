/* eslint-disable */
// @ts-nocheck

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import { faCircleCheck, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEmpresa } from '@shared/hooks';
import { IPaises } from '@shared/interfaces/ICargo/ICargo';
import { IDireccionesEmpresa } from '@shared/interfaces/IDireccionesEmpresa';
import {
  tipoDireccionEnum,
  tipoFormaContactoEnum,
} from '@shared/utils/constants';
import { newFormatDateUTC } from '@shared/utils/formatters';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Spinner } from '@shared/components/Legacy/Spinner';

import { formasDeContactoValues } from '../NuevoContacto/constants';

import { esAutonomo, esSocio } from './constants/utils';
import PerfilEmpresaContext from './context/PerfilEmpresaContext';
import { accordionFields } from './accordionFields';
import { IEmpresa, IKycForm, ISocios } from './interfaces';

import './PerfilEmpresa.scss';
import notifications from '@shared/utils/notifications';

type PerfilEmpresaProps = {
  setIsOpenResumenKyc?: Dispatch<SetStateAction<boolean>>;
  setOpenCompleteKyc?: Dispatch<SetStateAction<boolean>>;
  fetchResumenKYC?: () => void;
  checkValues?: () => void;
  setValidKycFromPerfilEmpresa?: Dispatch<SetStateAction<boolean>>;
  fetchRepresentantesOnClose?: any;
  vieneDeGenerarContrato: boolean;
};
const PerfilEmpresa = ({
  fetchResumenKYC,
  setIsOpenResumenKyc,
  setOpenCompleteKyc,
  checkValues,
  fetchRepresentantesOnClose,
  vieneDeGenerarContrato = false,
}: PerfilEmpresaProps) => {
  const libradorId: string | null = sessionStorage.getItem('libradorId');

  const rhForm = useForm({
    mode: 'onBlur',
  });
  const { clearErrors, setError, trigger } = rhForm;
  const {
    editarKyc,
    fetchEmpresaInfoById,
    fetchKycEmpresaActiva,
    fetchResumenKyc,
    loadingEmpresa,
    loadingResumenKYC,
    postFormasContactoEmpresa,
    modificarFormasContactoEmpresa,
  } = useEmpresa();

  const [empresa, setEmpresa] = useState<IEmpresa>({} as IEmpresa);
  const [socios, setSocios] = useState<ISocios[]>([]);
  const [active, setActive] = useState<number>(1);
  const [hasData, setHasData] = useState<boolean[]>([]);
  const [direcciones, setDirecciones] = useState<IDireccionesEmpresa[]>([]);
  const [kyc, setKyc] = useState<IKycForm>({} as IKycForm);

  const accordionTabs = accordionFields(
    !!esSocio(),
    !!esAutonomo(),
    vieneDeGenerarContrato
  );

  useEffect(() => {
    if (isEmpty(empresa)) {
      libradorId &&
        fetchEmpresaInfoById(libradorId)
          .then((res) => {
            res && setEmpresa(res);
          })
          .catch((e) => notifications.unknownError(e));
    }
  }, [empresa, fetchEmpresaInfoById, libradorId]);

  useEffect(() => {
    if (!hasData.length) {
      libradorId &&
        fetchResumenKyc(libradorId)
          .then((resumenKYC) => {
            if (resumenKYC) {
              if (vieneDeGenerarContrato) {
                const generarContratoTabs = [
                  resumenKYC.tieneDireccionSocial,
                  resumenKYC.tieneFirmantes,
                  resumenKYC.tieneTelefonoYCorreo,
                ];
                if (esAutonomo()) {
                  generarContratoTabs.splice(2, 1);
                }
                setHasData(generarContratoTabs);
              } else {
                const tieneDataElTab = [
                  resumenKYC.informacionCompleta,
                  resumenKYC.tieneDireccionSocial,
                  resumenKYC.tieneFirmantes,
                  resumenKYC.tieneSociosRespondido,
                  resumenKYC.actividadCompleta,
                  resumenKYC.tieneTelefonoYCorreo,
                ];

                if (!esSocio()) {
                  tieneDataElTab.splice(3, 1);
                }
                if (esAutonomo()) {
                  tieneDataElTab.splice(5, 1);
                }
                setHasData(tieneDataElTab);
              }
            }
          })
          .catch((e) => notifications.unknownError(e));
    }
  }, [hasData, fetchResumenKyc, libradorId, vieneDeGenerarContrato]);

  const title = useCallback((paramTitle: string, paramHasData?: boolean) => {
    return (
      <>
        <FontAwesomeIcon
          icon={paramHasData ? faCircleCheck : faCircleXmark}
          className="icon_title"
          color={paramHasData ? '#30D59B' : '#E40139'}
        />
        <span className="perfilEmpresaTitulo">{paramTitle}</span>
      </>
    );
  }, []);

  const handleNextStepAndClose = () => {
    if (setIsOpenResumenKyc && accordionTabs.length === active) {
      fetchResumenKYC && fetchResumenKYC();
      checkValues && checkValues();
      fetchRepresentantesOnClose && fetchRepresentantesOnClose(libradorId);
      setIsOpenResumenKyc && setIsOpenResumenKyc(false);
      setOpenCompleteKyc && setOpenCompleteKyc(false);
    } else {
      setActive(active + 1);
    }
  };

  const handleNextStep = async () => {
    switch (accordionTabs[active - 1].title) {
      case 'Información de cliente': {
        const { fechaConstitucion } = rhForm.getValues();
        if (hasData[active - 1] === false) {
          trigger();
        } else if (
          empresa.fechaConstitucion === newFormatDateUTC(fechaConstitucion)
        ) {
          handleNextStepAndClose();
        } else {
          const res = await editarKyc({
            id: empresa.id,
            fechaConstitucion: newFormatDateUTC(fechaConstitucion),
            cnaeId: null,
            kyc: null,
          });
          if (res) {
            const newInfo = await fetchEmpresaInfoById(empresa.id);
            newInfo && setEmpresa(newInfo);

            handleNextStepAndClose();
          }
        }
        break;
      }
      case 'Direcciones': {
        if (hasData[active - 1] === false) {
          setError('direcciones', {
            type: 'manual',
            message: 'Añada una dirección social',
          });
          trigger();
        } else {
          clearErrors('direcciones');
          const social = direcciones.filter(
            (direccion) => direccion.tipo.id === tipoDireccionEnum.SOCIAL
          );
          if (!isEmpty(social)) {
            handleNextStepAndClose();
          } else {
            notifications.errorServidor({
              body: 'Debes agregar una dirección social para continuar',
            });
          }
        }
        break;
      }
      case 'Firmantes': {
        if (hasData[active - 1] === false) {
          trigger();
        } else {
          handleNextStepAndClose();
        }
        break;
      }
      case 'Participación de la empresa': {
        if (hasData[active - 1] === false) {
          setError('socios', {
            type: 'manual',
            message: 'Añada un socio',
          });
          trigger();
        } else {
          const res = await editarKyc({
            id: empresa.id,
            tieneSociosRespondido: true,
          });
          if (res) {
            const newHasData = [...hasData];
            newHasData[active - 1] = true;
            setHasData(newHasData);
          }

          handleNextStepAndClose();
        }
        break;
      }
      case 'Actividad': {
        const {
          actividadPrincipal,
          CNAE,
          actividadSecundaria,
          cnaeSecundario,
          finalidad,
          origen,
          paisesOperantes,
          finalidad_description,
          origen_description,
          porcentajeDeCobroEnEfectivo,
        } = rhForm.getValues();
        if (hasData[active - 1] === false) {
          trigger();
          if (!actividadPrincipal?.id) {
            rhForm.setValue('actividadPrincipal', null);
          }
          if (!actividadSecundaria?.id) {
            rhForm.setValue('actividadSecundaria', null);
          }
          if (!CNAE?.id) {
            rhForm.setValue('CNAE', null);
          }
        } else {
          const paisesId = paisesOperantes.map(
            (pais: IPaises) => pais && pais.id
          );
          const res = await editarKyc({
            id: empresa.id,
            cnaeId: CNAE.id,
            cnaeSecundarioId: cnaeSecundario.id,
            kyc: {
              descripcionFinalidad:
                finalidad_description || finalidad.description,
              descripcionOrigen: origen_description || origen.description,
              finalidad: finalidad.id,
              origen: origen.id,
              paisesIds: paisesId,
              porcentajeEfectivoVentas: porcentajeDeCobroEnEfectivo.id,
            },
          });
          if (res) {
            const newInfo = await fetchEmpresaInfoById(empresa.id);
            newInfo && setEmpresa(newInfo);

            handleNextStepAndClose();
            const res = await fetchKycEmpresaActiva();
            if (res) {
              const newKyc = {
                id: res.empresaId,
                actividadPrincipal: {
                  id: res?.industria.id,
                  descripcion: res?.industria.descripcion,
                },
                actividadSecundaria: {
                  id: res?.industriaSecundaria.id,
                  descripcion: res?.industriaSecundaria.descripcion,
                },
                CNAE: {
                  id: res?.cnae.id,
                  descripcion: `${res?.cnae.codigo} - ${res?.cnae.descripcion}`,
                },
                cnaeSecundario: {
                  id: res?.cnaeSecundario.id,
                  descripcion: `${res?.cnaeSecundario.codigo} - ${res?.cnaeSecundario.descripcion}`,
                },
                paisesOperantes,
                finalidad: res.finalidad,
                origen: res.origen,
                porcentajeDeCobroEnEfectivo: {
                  id: res?.porcentajeDeCobroEnEfectivo.id,
                  description: res?.porcentajeDeCobroEnEfectivo.description,
                },
              };
              setKyc(newKyc);
            }
          }

          handleNextStepAndClose();
        }

        break;
      }
      case 'Datos de la empresa': {
        const { email, telefono } = rhForm.getValues();
        if (hasData[active - 1] === false) {
          trigger();
        } else {
          const dataFormaContacto = [
            {
              id:
                empresa.formasContacto &&
                empresa.formasContacto[formasDeContactoValues.email]
                  ? empresa.formasContacto[formasDeContactoValues.email].id
                  : '',
              descripcion: '',
              etiquetas: [],
              tipo: tipoFormaContactoEnum.EMAIL,
              valor: email,
            },
            {
              id:
                empresa.formasContacto &&
                empresa.formasContacto[formasDeContactoValues.telefono]
                  ? empresa.formasContacto[formasDeContactoValues.telefono].id
                  : '',
              descripcion: '',
              etiquetas: [],
              tipo: tipoFormaContactoEnum.MOVIL,
              valor: telefono,
            },
          ];
          if (
            empresa.id &&
            empresa.formasContacto[formasDeContactoValues.email]?.valor ===
              dataFormaContacto[formasDeContactoValues.email].valor &&
            empresa.formasContacto[formasDeContactoValues.telefono]?.valor ===
              dataFormaContacto[formasDeContactoValues.telefono].valor
          ) {
            handleNextStepAndClose();
          } else {
            try {
              for (const formaContacto of dataFormaContacto) {
                let res;
                if (formaContacto.id) {
                  res = await modificarFormasContactoEmpresa(empresa.id, [
                    formaContacto,
                  ]);
                } else {
                  res = await postFormasContactoEmpresa(empresa.id, [
                    formaContacto,
                  ]);
                }
                if (res) {
                  const newInfo = await fetchEmpresaInfoById(empresa.id);
                  newInfo && setEmpresa(newInfo);
                }
              }
            } catch (e) {
              notifications.unknownError(e);
            }
          }
        }
        handleNextStepAndClose();
        break;
      }
    }
  };

  const handleStepBack = () => {
    setActive(active - 1);
  };

  const contextValues = useMemo(
    () => ({
      empresa,
      setEmpresa,
      hasData,
      setHasData,
      socios,
      setSocios,
      kyc,
      setKyc,
      direcciones,
      setDirecciones,
      active,
      setActive,
    }),
    [empresa, hasData, socios, kyc, direcciones, active]
  );

  if (loadingEmpresa || loadingResumenKYC) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={75} />
      </div>
    );
  }
  if (!isEmpty(empresa)) {
    return (
      <div className="perfil-empresa-container flex flex-col p-4 box-border">
        <p className="text-info font-semibold">
          Haga clic en el botón 'Continuar' para navegar entre las secciones.
        </p>
        <PerfilEmpresaContext.Provider value={contextValues}>
          <FormProvider {...rhForm}>
            <Accordion activeItem={active} controlled>
              {accordionTabs.map((field, index) => {
                return (
                  <AccordionTab
                    id={field.id}
                    title={title(field.title, hasData[index])}
                    key={field.id}
                    expandedOnClick={false}
                  >
                    {field.id === active ? <> {field.body}</> : <></>}
                  </AccordionTab>
                );
              })}
            </Accordion>
            <div
              className="action-button-next-steps"
              style={
                active === accordionTabs[0].id
                  ? { justifyContent: 'flex-end' }
                  : { justifyContent: 'space-between' }
              }
            >
              {active !== accordionTabs[0].id && (
                <Button label="Atrás" onClick={handleStepBack} />
              )}
              <Button
                label={
                  active === accordionTabs[accordionTabs.length - 1].id
                    ? 'Enviar'
                    : 'Continuar'
                }
                onClick={() => handleNextStep()}
              />
            </div>
          </FormProvider>
        </PerfilEmpresaContext.Provider>
      </div>
    );
  }
  return null;
};

export default PerfilEmpresa;
