import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { InputText } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const Direccion = ({
  rhForm,
  item,
  index = false,
  fieldName = 'direccion',
  disabled = false,
}) => {
  const { formState, control } = rhForm;
  const { errors } = formState;
  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="direccion">Dirección</label>
        <Controller
          render={({ field }) => {
            const { onChange, onBlur, value, name, ref } = field;
            return (
              <InputText
                onChange={(e) => onChange(e)}
                value={value}
                inputRef={ref}
                onBlur={onBlur}
                name={name}
                disabled={disabled}
                error={
                  index !== false
                    ? fieldArrayHasError(
                        errors,
                        'direcciones',
                        index,
                        fieldName
                      )
                    : fieldHasError(errors, fieldName)
                }
                className="data-hj-allow"
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'El campo dirección es requerido',
            },
          }}
          defaultValue={item?.direccion || ''}
          name={
            index !== false ? `direcciones[${index}][${fieldName}]` : fieldName
          }
          control={control}
        />
        <Error
          property="direccion"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default Direccion;
