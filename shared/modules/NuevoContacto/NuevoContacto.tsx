/* eslint-disable */
// @ts-nocheck

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CancelTokenSource } from 'axios';
import { isEmpty } from 'lodash';
import { faCircleCheck, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEmpresa } from '@shared/hooks';
import { IFields } from '@shared/interfaces/IFormasDeContacto/IFormasDeContacto';
import { useFetch } from '@shared/utils';
import { tipoFormaContactoEnum } from '@shared/utils/constants';
import { newFormatDateUTC } from '@shared/utils/formatters';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Button';
import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import PersonaContext from './components/personaContext';
import { valueEnum } from './constants/fields';
import { esRepresentante, fields, formasDeContactoValues } from './constants';
import { IRepresentante } from './interfaces';

import '@shared/styles/app-theme/components/nuevoContacto/nuevoContacto.scss';
import { IPersona } from '@shared/interfaces/IPersona';
import PerfilEmpresaContext from '../PerfilEmpresa/context/PerfilEmpresaContext';
import notifications from '@shared/utils/notifications';
import { GenericButton } from '@shared/components/GenericButton';

type NuevoContactoProps = {
  personaAEditar: IPersona;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  indice?: number;
  libradorId?: string;
  comingFromMisDatosFirmantes?: boolean;
  refreshModal?: () => void;
  closeModal?: () => void;
  comingFromGestion?: boolean;
  fetchData?: (qState: IQueryReducer, source?: CancelTokenSource) => void;
  fetchRepresentantesOnClose?: () => Promise<
    | {
        id: number;
      }[]
    | undefined
  >;
  queryState?: IQueryReducer;
  isEditing?: boolean;
  esRepresentanteByProps?: boolean;
  comeFromDirectLending?: boolean;
};

const NuevoContacto = ({
  personaAEditar = {} as IPersona,
  libradorId,
  refreshModal,
  comingFromMisDatosFirmantes = false,
  setIsOpen,
  closeModal,
  fetchRepresentantesOnClose,
  comingFromGestion = false,
  fetchData,
  queryState,
  isEditing = false,
  esRepresentanteByProps = false,
  comeFromDirectLending = false,
}: NuevoContactoProps) => {
  const { empresa } = useContext(PerfilEmpresaContext);
  const { getRepresentanteByPersonaId } = useEmpresa();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [representanteByPersona, setRepresentanteByPersona] =
    useState<IRepresentante>({} as IRepresentante);
  const [campos, setCampos] = useState<IFields[]>(fields);
  const [selectedEmpresaId, setEmpresaId] = useState<string>(empresa?.id);
  const [persona, setPersona] = useState<IPersona>(personaAEditar);

  const [esRepresentanteForm, setEsRepresentanteForm] = useState(
    esRepresentanteByProps || comeFromDirectLending || persona.esRepresentante
      ? valueEnum.ValueYes
      : valueEnum.ValueNo
  );

  const nextButton = () => {
    if (activeTab !== campos.length) {
      setActiveTab(activeTab + 1);
    } else {
      setIsOpen && setIsOpen(false);
      fetchRepresentantesOnClose && fetchRepresentantesOnClose();
      fetchData && queryState && fetchData(queryState);
      refreshModal && refreshModal();
      closeModal();
    }
  };

  const prevButton = () => {
    if(activeTab === campos[0].id){
      closeModal();
    }else{
      setActiveTab(activeTab - 1);

    }
  };

  const rhForm = useForm({ mode: 'onBlur' });
  const { watch, trigger, handleSubmit } = rhForm;

  useEffect(() => {
    if (libradorId) {
      setEmpresaId(libradorId);
    }
  }, [libradorId]);

  useEffect(() => {
    if (
      comingFromMisDatosFirmantes ||
      persona.esRepresentante ||
      comingFromGestion
    ) {
      setCampos(
        fields(
          comingFromMisDatosFirmantes,
          persona.esRepresentante,
          comingFromGestion
        )
      );
    }
  }, []);

  useEffect(() => {
    if (
      esRepresentanteForm === esRepresentante.valueNo &&
      campos.length === 5
    ) {
      setCampos(campos.slice(0, 3));
    } else if (esRepresentanteForm === esRepresentante.valueYes) {
      setCampos(
        fields(
          comingFromMisDatosFirmantes,
          persona.esRepresentante,
          comingFromGestion
        )
      );
    }
  }, [esRepresentanteForm]);

  const getInicialDataEnSeccion = (persona: IPersona) => {
    const dataSeccion: { [key: string]: boolean } = {};
    campos.forEach((campo) => (dataSeccion[campo.title] = false));
    if (!isEmpty(persona)) {
      if (persona.nombre && persona.apellidos) {
        dataSeccion['Datos básicos'] = true;
      }
      if (!persona.esRepresentante && persona.formasDeContacto[0]?.valor) {
        dataSeccion['Formas de contacto'] = true;
      }
      if (
        persona.formasDeContacto[0]?.valor &&
        persona.formasDeContacto[1]?.valor
      ) {
        dataSeccion['Formas de contacto'] = true;
      }
      if (
        persona.representante?.numeroDni &&
        persona.representante?.fechaNacimiento &&
        persona.representante?.paisNacionalidadId &&
        persona.representante?.paisResidenciaId
      ) {
        dataSeccion['Datos del representante'] = true;
      }
    }
    dataSeccion['Documentos asociados (Opcional)'] = true;
    dataSeccion['Tipo de contacto'] = true;

    return dataSeccion;
  };
  const [seccionHasData, setSeccionHasData] = useState(
    getInicialDataEnSeccion(persona)
  );
  const {
    post: postPersona,
    put: putPersona,
    get: getPersonaById,
    get: getPersonas,
  } = useFetch('api/gefintech/Persona');
  const { post: postRepresentante, put: putRepresentante } = useFetch(
    '/api/gefintech/Representante'
  );

  const title = (paramTitle: string, completed: boolean) => {
    return (
      <>
        <FontAwesomeIcon
          icon={completed ? faCircleCheck : faCircleXmark}
          className="mr-5 check__icon icon_title"
          color={completed ? '#30D59B' : '#E40139'}
        />
        <span>{paramTitle}</span>
      </>
    );
  };

  const contextValues = useMemo(
    () => ({
      persona,
      setPersona,
      representanteByPersona,
      setRepresentanteByPersona,
      seccionHasData,
      setSeccionHasData,
      esRepresentanteForm,
      setEsRepresentanteForm,
      comeFromDirectLending,
    }),
    [persona, representanteByPersona, seccionHasData, esRepresentanteForm]
  );

  const onSubmit = async () => {
    switch (campos[activeTab - 1].title) {
      case 'Tipo de contacto':
        nextButton();
        break;
      case 'Datos básicos':
        trigger();
        const { nombre, apellidos, departamento, puesto } = rhForm.getValues();
        const dataNombre = {
          nombre: nombre && nombre.toUpperCase(),
          apellidos: apellidos && apellidos.toUpperCase(),
          empresaId: selectedEmpresaId,
          departamento: !departamento ? null : departamento.toUpperCase(),
          puesto: !puesto ? null : puesto.toUpperCase(),
        };
        if (persona.id) {
          if (
            persona.apellidos === dataNombre.apellidos &&
            persona.nombre === dataNombre.nombre &&
            persona.departamento === dataNombre.departamento &&
            persona.puesto === dataNombre.puesto
          ) {
            nextButton();
          } else {
            const res = await putPersona('', { ...dataNombre, id: persona.id });
            const person = await getPersonas<IPersona>(`/${persona.id}`);
            person && setPersona(person);
            res && person && nextButton();
          }
        } else {
          try {
            const idPersona = await postPersona<string>('', dataNombre);
            if (idPersona) {
              const personaInfo = await getPersonaById<IPersona>(
                `/${idPersona}`
              );
              personaInfo && setPersona(personaInfo);
            }
            nextButton();
          } catch (e) {
            notifications.unknownError(e);
          }
        }
        break;
      case 'Formas de contacto':
        trigger();
        const { email, telefono } = rhForm.getValues();
        let notificaciones = [];
        const { etiquetas } = rhForm.getValues();
        if (comingFromGestion) {
          if (etiquetas?.length) {
            const etiquetasId = etiquetas.map((etiqueta) => etiqueta.id);
            notificaciones = etiquetasId;
          }
        }
        const emailToData =
          persona.formasDeContacto[formasDeContactoValues.email];
        const telefonoToData =
          persona.formasDeContacto[formasDeContactoValues.telefono];
        let etiquetasIds: number[] = [];
        if (
          persona.formasDeContacto.length &&
          emailToData.etiquetas &&
          emailToData.etiquetas.length
        ) {
          etiquetasIds = emailToData.etiquetas?.map((etiqueta) => etiqueta.id);
        }
        const data = {
          id: persona.id,
          formasDeContacto: [
            {
              id: persona.formasDeContacto && emailToData ? emailToData.id : '',
              descripcion: '',
              etiquetas: notificaciones,
              tipo: tipoFormaContactoEnum.EMAIL,
              valor: email,
            },
            {
              id:
                persona.formasDeContacto && telefonoToData
                  ? telefonoToData.id
                  : '',
              descripcion: '',
              etiquetas: [],
              tipo: tipoFormaContactoEnum.MOVIL,
              valor: telefono || '',
            },
          ],
        };
        if (!telefono) data.formasDeContacto.pop();
        if (
          !!persona.id &&
          emailToData?.valor ===
            data.formasDeContacto[formasDeContactoValues.email].valor &&
          telefonoToData?.valor ===
            data.formasDeContacto[formasDeContactoValues.telefono].valor &&
          etiquetasIds &&
          notificaciones.length === etiquetasIds.length &&
          notificaciones.every(
            (value: number, index: number) => value === etiquetasIds[index]
          )
        ) {
          nextButton();
        } else {
          try {
            for await (const formaContacto of data.formasDeContacto) {
              let res;
              if (formaContacto.id) {
                res = await putPersona('/formas-de-contacto', {
                  id: data.id,
                  formasDeContacto: [formaContacto],
                });
              } else {
                res = await postPersona('/formas-de-contacto', {
                  id: data.id,
                  formasDeContacto: [formaContacto],
                });
              }
              if (res) {
                const person = await getPersonas<IPersona>(`/${persona.id}`);
                person && setPersona(person);
              }
            }
            nextButton();
          } catch (err) {
            notifications.unknownError(err);
          }
        }
        break;
      case 'Datos del representante':
        trigger();
        const {
          cargo,
          fechaNacimiento,
          esPuestoPublico,
          numeroDni,
          pais,
          residencia,
        } = rhForm.getValues();
        if (!persona.esRepresentante) {
          const representateToPost = {
            cargo,
            esPuestoPublico,
            fechaNacimiento: newFormatDateUTC(fechaNacimiento),
            numeroDni,
            paisNacionalidadId: pais,
            paisResidenciaId: residencia,
            personaId: persona.id,
          };
          try {
            const resRepresentanteId = await postRepresentante<string>(
              '',
              representateToPost
            );
            if (resRepresentanteId) {
              const resRepresentante = await getRepresentanteByPersonaId(
                persona.id
              );
              resRepresentante && setRepresentanteByPersona(resRepresentante);
            }
            nextButton();
          } catch (e: any) {
            notifications.unknownError(e);
          }
        } else {
          const dataToPut = {
            id: persona?.representante?.id || representanteByPersona.id,
            cargo,
            esPuestoPublico,
            fechaNacimiento: newFormatDateUTC(fechaNacimiento),
            numeroDni,
            paisNacionalidadId: pais,
            paisResidenciaId: residencia,
          };
          if (
            cargo === representanteByPersona.cargo.id &&
            esPuestoPublico === representanteByPersona.esPuestoPublico &&
            newFormatDateUTC(fechaNacimiento) ===
              representanteByPersona.fechaNacimiento &&
            numeroDni === representanteByPersona.numeroDni &&
            pais === representanteByPersona.paisNacionalidadId &&
            residencia === representanteByPersona.paisResidenciaId
          ) {
            nextButton();
          } else {
            const res = await putRepresentante('', dataToPut);
            if (res) {
              const resRepresentante = await getRepresentanteByPersonaId(
                persona.id
              );
              resRepresentante && setRepresentanteByPersona(resRepresentante);
            }
            nextButton();
          }
        }
        break;
      case 'Documentos asociados (Opcional)':
        nextButton();
        break;
      default:
        nextButton();
    }
  };

  return (
    <FormProvider {...rhForm}>
      <p className="text-info mobile:shrink">
        Haga clic en el botón 'Continuar' para navegar entre las secciones.
      </p>
      <div className="mobile:grow mobile:flex mobile:flex-col mobile:h-[100px]">
        <Accordion
          controlled
          activeItem={activeTab}
          className="mobile:overflow-auto"
        >
          <PersonaContext.Provider value={contextValues}>
            <div
              className="overflow-auto shrink"
            >
              {campos.map((field: IFields) => {
                return (
                  <AccordionTab
                    id={field.id}
                    title={title(field.title, seccionHasData[field.title])}
                    className={field.className}
                    expandedOnClick={isEditing}
                    key={field.title}
                    onClick={() => {
                      setActiveTab(field.id);
                    }}
                  >
                    {field.id === activeTab ? <> {field.body}</> : <></>}
                  </AccordionTab>
                );
              })}
            </div>
          </PersonaContext.Provider>
        </Accordion>
        <div className="flex justify-end gap-2 mt-4 mobile:flex-col-reverse mobile:w-full ">
          <GenericButton label='Atrás' onClick={prevButton} buttonType='secondary-borderless'  className='mobile:w-full mobile:flex mobile:justify-center  '  />
          <GenericButton label='Continuar' onClick={handleSubmit(onSubmit)} buttonType='primary' className='mobile:w-full mobile:flex mobile:justify-center' />
        </div>
      </div>
    </FormProvider>
  );
};
export default NuevoContacto;
