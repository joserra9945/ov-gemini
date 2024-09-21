import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { InputMask } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const CodigoPostal = ({
  rhForm,
  item,
  index = false,
  fieldName = 'codigoPostal',
  onSetCodigoPostal,
  disabled = false,
}) => {
  const { formState, control } = rhForm;
  const { errors } = formState;

  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="codigo-postal">Código postal</label>
        <Controller
          render={({ field }) => {
            const { onChange, onBlur, value, name, ref } = field;
            return (
              <InputMask
                onChange={(e) => {
                  onChange(e);
                  onSetCodigoPostal(e);
                }}
                value={value}
                mask="99999"
                onBlur={onBlur}
                min="0"
                inputRef={ref}
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
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'El campo código postal es requerido',
            },
          }}
          defaultValue={item?.codigoPostal || ''}
          name={
            index !== false ? `direcciones[${index}][${fieldName}]` : fieldName
          }
          control={control}
        />
        <Error
          property="codigoPostal"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default CodigoPostal;
