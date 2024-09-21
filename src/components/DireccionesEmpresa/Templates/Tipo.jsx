import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { Dropdown } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const Tipo = ({
  rhForm,
  item,
  index = false,
  isFirstElement,
  tipoDireccion,
  fieldName = 'tipo',
}) => {
  const { errors, control } = rhForm;
  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="tipo">Tipo</label>
        <Controller
          onFocus={null}
          render={({ field }) => {
            const { onChange, value, name, ref } = field;
            return (
              <Dropdown
                onChange={(e) => {
                  onChange(e);
                }}
                value={value}
                inputRef={ref}
                name={name}
                disabled={isFirstElement() || index !== false}
                options={tipoDireccion}
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
              message: 'El campo Tipo es obligatorio',
            },
          }}
          defaultValue={item?.tipo || 1}
          name={
            index !== false ? `direcciones[${index}][${fieldName}]` : fieldName
          }
          control={control}
        />
        <Error
          property="tipo"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default Tipo;
