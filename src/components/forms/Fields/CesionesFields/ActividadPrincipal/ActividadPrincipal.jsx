import React from 'react';
import { useFormContext } from 'react-hook-form';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { Fieldset } from 'components/Hocs/Forms';

import { fields } from './constants';

const ActividadPrincipal = ({ data, disabled = false }) => {
  const rhForm = useFormContext();

  return (
    <Fieldset
      className="actividad-principal-fields"
      legend="Actividad principal"
    >
      <WildcardFields
        rhForm={rhForm}
        data={data || {}}
        fields={fields}
        disableds={disabled}
      />
    </Fieldset>
  );
};

export default ActividadPrincipal;
