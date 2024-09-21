/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormaContactoFields } from '@shared/modules/NuevoContacto/constants/fields';
import { IFieldsWildCard } from '@shared/modules/NuevoContacto/interfaces';
import { tipoFormaContactoEnum } from '@shared/utils/constants';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import PerfilEmpresaContext from '../context/PerfilEmpresaContext';

export const FormasContactoEmpresa = () => {
  const rhForm = useFormContext();
  const { empresa, hasData, setHasData, active } =
    useContext(PerfilEmpresaContext);
  const [ternario, setternario] = useState(0);
  const [campos, setCampos] = useState<IFieldsWildCard[]>();

  const { formasContacto } = empresa;
  const { watch, trigger } = rhForm;

  useEffect(() => {
    setCampos(FormaContactoFields(true));
  }, []);
  useEffect(() => {
    const subscription = watch(async (watcher) => {
      const newData = [...hasData];
      const resTriger = await trigger();
      if (resTriger && watcher.email.trim() && watcher.telefono) {
        newData[active - 1] = true;
      } else {
        newData[active - 1] = false;
      }
      setHasData(newData);
    });
    return () => subscription.unsubscribe();
  }, [hasData, setHasData, watch, trigger, active]);

  useEffect(() => {
    !ternario &&
      formasContacto &&
      formasContacto.length &&
      formasContacto.forEach((formaContacto) => {
        rhForm.setValue(
          formaContacto.tipo === tipoFormaContactoEnum.EMAIL
            ? 'email'
            : 'telefono',
          formaContacto.valor
        );
      });
    setternario(1);
  }, [formasContacto, rhForm, ternario]);

  return (
    <WildcardFields fields={campos} data={{ formasContacto }} rhForm={rhForm} />
  );
};
