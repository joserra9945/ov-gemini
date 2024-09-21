import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { WildcardFields } from '@shared/components/Legacy/WildcardFields';

import { Fieldset } from 'components/Hocs/Forms';

import { billFields } from './constants';

const BillFields = ({ data = {} }) => {
  const rhForm = useFormContext();

  const fechaEmision = useWatch({
    name: 'fechaEmision',
    control: rhForm.control,
  });
  const fechaVencimiento = useWatch({
    name: 'fechaVencimiento',
    control: rhForm.control,
  });
  useEffect(() => {
    if (
      fechaEmision > fechaVencimiento &&
      !rhForm.formState.errors.fechaEmision
    ) {
      rhForm.setError('fechaEmision', {
        type: 'manual',
        message:
          'La fecha de emisión no puede ser superior a la fecha de vencimiento.',
      });
    } else if (
      fechaEmision < fechaVencimiento &&
      rhForm.formState.errors.fechaEmision
    ) {
      rhForm.clearErrors('fechaEmision');
    }
  }, [fechaEmision, fechaVencimiento, rhForm]);

  return (
    <Fieldset className="bill-fields" legend="">
      <WildcardFields
        rhForm={rhForm}
        fields={billFields}
        data={data}
        disableds={undefined}
      />
    </Fieldset>
  );
};

export default BillFields;
