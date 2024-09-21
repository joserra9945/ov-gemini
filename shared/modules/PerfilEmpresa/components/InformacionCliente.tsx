/* eslint-disable */
// @ts-nocheck

import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { INFO_CLIENTE_FIELDS } from '../constants/fields';
import { esAutonomo } from '../constants/utils';
import PerfilEmpresaContext from '../context/PerfilEmpresaContext';

type PropsInformacionCliente = {
  index: number;
};

export const InformacionCliente = ({ index }: PropsInformacionCliente) => {
  const { empresa, hasData, setHasData } = useContext(PerfilEmpresaContext);
  const rhForm = useFormContext();
  const { watch } = rhForm;
  useEffect(() => {
    const subscription = watch((watcher) => {
      if (watcher.fechaConstitucion) {
        const newData = [...hasData];
        newData[index] = true;
        setHasData(newData);
        rhForm.trigger();
      }
    });
    return () => subscription.unsubscribe();
  }, [hasData, index, rhForm, setHasData, watch]);

  return (
    <WildcardFields
      fields={INFO_CLIENTE_FIELDS(!!esAutonomo())}
      data={empresa}
      rhForm={rhForm}
      disableds={['razonSocial', 'cif']}
    />
  );
};
