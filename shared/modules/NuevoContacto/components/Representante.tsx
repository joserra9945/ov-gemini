/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useEmpresa } from '@shared/hooks';
import { ICargos, IPaises } from '@shared/interfaces/ICargo/ICargo';
import { validateSpanishID } from '@shared/utils/DNIValidator';
import Notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { representanteFields } from '../constants/fields';

import PersonaContext from './personaContext';

const Representante = () => {
  const [dataCargos, setDataCargos] = useState<ICargos[]>([]);
  const [paises, setPaises] = useState<IPaises[]>([]);
  const {
    persona,
    representanteByPersona,
    setRepresentanteByPersona,
    seccionHasData,
    setSeccionHasData,
  } = useContext(PersonaContext);
  const rhForm = useFormContext();
  const {
    fetchCargos,
    fetchPaises,
    getRepresentanteByPersonaId,
    loadingRepresentanteByPersona,
  } = useEmpresa();
  const { watch } = rhForm;
  const spainId = paises.find((pais) => pais.nombre === 'España');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const subscription = watch((watcher) => {
      const newSeccion = { ...seccionHasData };

      if (
        validateSpanishID(watcher.numeroDni) &&
        watcher.cargo !== undefined &&
        watcher.fechaNacimiento &&
        watcher.pais &&
        watcher.residencia
      ) {
        newSeccion['Datos del representante'] = true;
      } else {
        newSeccion['Datos del representante'] = false;
      }
      setSeccionHasData(newSeccion);
    });
    return () => subscription.unsubscribe();
  }, [seccionHasData, setSeccionHasData, watch]);

  useEffect(() => {
    getRepresentanteByPersonaId(persona.id).then((resRepresentante) => {
      try {
        resRepresentante && setRepresentanteByPersona(resRepresentante);
        setloading(false);
      } catch {
        setloading(true);
      }
    });
  }, [getRepresentanteByPersonaId, persona.id, setRepresentanteByPersona]);

  useEffect(() => {
    !dataCargos.length &&
      fetchCargos()
        .then((res) => {
          res && setDataCargos(res);
        })
        .catch((e) => notifications.unknownError(e));
    !paises.length &&
      fetchPaises()
        .then((resPaises) => {
          resPaises && setPaises(resPaises);
        })
        .catch((e) => notifications.unknownError(e));
  }, [dataCargos.length, fetchCargos, fetchPaises, paises.length]);

  if (loadingRepresentanteByPersona || loading) {
    return (
      <div className="spinner-div">
        <Spinner loading color="#435dbc" size={100} />
      </div>
    );
  }

  return (
    <div>
      {!!dataCargos.length && !!paises.length && (
        <WildcardFields
          fields={representanteFields(
            dataCargos,
            paises,
            spainId,
            representanteByPersona
          )}
          rhForm={rhForm}
          data={representanteByPersona}
        />
      )}
    </div>
  );
};

export default Representante;
