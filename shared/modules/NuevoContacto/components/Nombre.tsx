import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { NombreFields } from '../constants/fields';
import { IFieldsWildCard } from '../interfaces';

import PersonaContext from './personaContext';

const Nombre = () => {
  const [campos, setCampos] = useState<IFieldsWildCard[]>();
  const rhForm = useFormContext();
  const { persona, seccionHasData, setSeccionHasData } =
    useContext(PersonaContext);
  const { watch } = rhForm;
  const firmante = watch('esRepresentante');

  useEffect(() => {
    const subscription = watch((watcher) => {
      const newSeccion = { ...seccionHasData };
      if (watcher.nombre.trim() && watcher.apellidos) {
        newSeccion['Datos básicos'] = true;
      } else {
        newSeccion['Datos básicos'] = false;
      }
      setSeccionHasData(newSeccion);
    });
    return () => subscription.unsubscribe();
  }, [seccionHasData, setSeccionHasData, watch]);

  useEffect(() => {
    firmante !== 2
      ? setCampos(NombreFields.slice(0, 2))
      : setCampos(NombreFields);
  }, [firmante]);

  return (
    <WildcardFields fields={campos} data={persona || {}} rhForm={rhForm} />
  );
};

export default Nombre;
