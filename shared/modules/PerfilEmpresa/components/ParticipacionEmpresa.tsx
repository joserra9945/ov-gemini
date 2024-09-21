/* eslint-disable */
// @ts-nocheck
import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import { useEmpresa } from '@shared/hooks';
import Notifications from '@shared/utils/notifications';

import { Accordion, AccordionTab } from '@shared/components/Legacy/Accordion';
import { Button } from '@shared/components/Legacy/Button';
import { Error } from '@shared/components/Legacy/CustomInputs';
import Modal from '@shared/components/Legacy/Modal';
import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { NO_REGISTROS } from '../constants/constants';
import { PARTICIPACION_EMPRESA_FIELDS, valueEnum } from '../constants/fields';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';
import { ISocios } from '../interfaces';

import { ParticipacionesTitulo } from './ParticipacionesTitulo';
import { PersonaParticipacion } from './PersonaParticipacion';

type valueToFormProps = {
  datosRepresentacion: number;
};
export const ParticipacionEmpresa = () => {
  const { empresa, socios, setSocios } = useContext(PerfilEmpresaContext);
  const rhForm = useFormContext();
  const libradorId = empresa.id;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [valueToForm, setValueToForm] = useState({} as valueToFormProps);
  const { fetchSocios, loadingSocios } = useEmpresa();
  const radioButtonWatcher = rhForm.watch('datosRepresentacion');
  const [ternario, setTernario] = useState<number>(0);
  const { watch } = rhForm;
  const {
    formState: { errors },
  } = rhForm;

  const { hasData, setHasData, active } = useContext(PerfilEmpresaContext);

  useEffect(() => {
    if (radioButtonWatcher) {
      setValueToForm({
        datosRepresentacion: radioButtonWatcher,
      });
    } else {
      setValueToForm({
        datosRepresentacion: valueEnum.ValueYes,
      });
    }
  }, [radioButtonWatcher]);

  useEffect(() => {
    const subscription = watch((watcher) => {
      if (watcher.datosRepresentacion) {
        const newData = [...hasData];
        newData[active - 1] = true;
        if (
          watcher.datosRepresentacion === valueEnum.ValueYes &&
          !socios.length
        ) {
          newData[active - 1] = false;
        }
        setHasData(newData);
      }
    });
    return () => subscription.unsubscribe();
  }, [active, hasData, setHasData, socios.length, watch]);

  const generateFormValue = useCallback(() => {
    if (hasData[active - 1]) {
      rhForm.setValue('datosRepresentacion', valueEnum.ValueNo);
    } else {
      rhForm.setValue('datosRepresentacion', null);
    }
  }, [active, hasData, rhForm]);

  useEffect(() => {
    !ternario &&
      fetchSocios(libradorId)
        .then((res) => {
          if (res && res.length) {
            rhForm.setValue('datosRepresentacion', valueEnum.ValueYes);
            setSocios(res);
            const sociosConResidencia = res.every(
              (socio) => socio.paisResidencia
            );

            const newData = [...hasData];
            newData[active - 1] = sociosConResidencia;
            setHasData(newData);
          } else {
            generateFormValue();
          }
        })
        .catch((e) => Notifications.unknownError(e));
    setTernario(1);
  }, [
    active,
    fetchSocios,
    generateFormValue,
    hasData,
    libradorId,
    rhForm,
    setHasData,
    setSocios,
    ternario,
  ]);

  if (loadingSocios) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <>
      <WildcardFields
        fields={PARTICIPACION_EMPRESA_FIELDS}
        data={valueToForm}
        rhForm={rhForm}
      />

      {valueToForm.datosRepresentacion === valueEnum.ValueYes && (
        <>
          {!socios.length ? (
            <>
              <div>
                <p>{NO_REGISTROS}</p>
              </div>
              <Error property="socios" errors={errors} />
            </>
          ) : (
            <Accordion>
              {socios.map((persona: ISocios, index: number) => (
                <AccordionTab
                  className="participaciones-accordion-tab"
                  key={`${persona.nif}-persona.${nanoid()}`}
                  id={persona.id}
                  title={
                    <>
                      <ParticipacionesTitulo persona={persona} indice={index} />
                      {!persona.paisResidencia && (
                        <span className="text-danger">
                          Debe completar los datos de la persona
                        </span>
                      )}
                    </>
                  }
                />
              ))}
            </Accordion>
          )}
          <div className="flex justify-end">
            <Button
              icon={faPlus}
              label="Añadir otra persona"
              onClick={() => setIsOpen(true)}
              className="bg-primary rounded-md text-white py-2 px-4 hover:bg-primary-over h-10 w-30 mt-2"
            />
          </div>
        </>
      )}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Nueva persona"
      >
        <PersonaParticipacion setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};
