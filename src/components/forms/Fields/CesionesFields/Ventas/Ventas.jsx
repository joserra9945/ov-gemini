import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { Fieldset } from 'components/Hocs/Forms';

import { fields } from './constants';

const Ventas = ({ data, disabled = false }) => {
  const rhForm = useFormContext();
  const { isAdUser } = useSelector((state) => state.userState);

  return (
    <Fieldset className="ventas-fields" legend="Ventas">
      <WildcardFields
        rhForm={rhForm}
        data={data || {}}
        fields={fields}
        disableds={disabled || (data?.id && !isAdUser)}
      />
    </Fieldset>
  );
};

export default Ventas;
