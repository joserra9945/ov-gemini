import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useEnum } from '@shared/hooks';
import { tipoFormaContactoEnum } from '@shared/utils/constants';

import { Fieldset } from '@shared/components/Legacy/FormWrapper';
import { WildcardFields } from '@shared/components/Legacy/WildcardFields';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import {
  FormaContactoFields,
  notificacionesFields,
  valueEnum,
} from '../constants/fields';
import { IFieldsWildCard } from '../interfaces';

import PersonaContext from './personaContext';

interface IComingFromGestion {
  comingFromGestion?: boolean;
}

const FormasDeContacto = ({ comingFromGestion }: IComingFromGestion) => {
  const rhForm = useFormContext();
  const { persona, seccionHasData, setSeccionHasData, esRepresentanteForm } =
    useContext(PersonaContext);
  const [ternario, setternario] = useState(0);
  const [etiquetas, setEtiquetas] = useState<IEnum[]>();
  const [campos, setCampos] = useState<IFieldsWildCard[]>([]);
  const { enumEtiquetasFormaContactoGet } = useEnum();
  const { watch } = rhForm;

  useEffect(() => {
    persona &&
      setCampos(FormaContactoFields(esRepresentanteForm !== valueEnum.ValueNo));
  }, [persona, esRepresentanteForm]);

  useEffect(() => {
    if (comingFromGestion) {
      (async () => {
        const res = await enumEtiquetasFormaContactoGet();
        res && setEtiquetas(res);
      })();
    }
  }, [comingFromGestion, enumEtiquetasFormaContactoGet]);

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const subscription = watch((watcher) => {
      const newSeccion = { ...seccionHasData };

      if (watcher.email && regexEmail.test(watcher.email)) {
        if (esRepresentanteForm === valueEnum.ValueYes && !watcher.telefono) {
          newSeccion['Formas de contacto'] = false;
        } else {
          newSeccion['Formas de contacto'] = true;
        }
      } else {
        newSeccion['Formas de contacto'] = false;
      }
      setSeccionHasData(newSeccion);
    });
    return () => subscription.unsubscribe();
  }, [esRepresentanteForm, seccionHasData, setSeccionHasData, watch]);

  useEffect(() => {
    if (!ternario && persona.formasDeContacto.length) {
      persona.formasDeContacto.forEach((formaContacto) => {
        rhForm.setValue(
          formaContacto.tipo === tipoFormaContactoEnum.EMAIL
            ? 'email'
            : 'telefono',
          formaContacto.valor
        );
      });
      rhForm.setValue('etiquetas', persona);
    }

    setternario(1);
  }, [persona, rhForm, ternario]);

  return (
    <div>
      <WildcardFields fields={campos} data={{}} rhForm={rhForm} />
      {comingFromGestion && (
        <Fieldset className="notificaciones-fields" legend="Notificaciones">
          <WildcardFields
            rhForm={rhForm}
            data={{}}
            fields={notificacionesFields(etiquetas || [])}
          />
        </Fieldset>
      )}
    </div>
  );
};

export default FormasDeContacto;
