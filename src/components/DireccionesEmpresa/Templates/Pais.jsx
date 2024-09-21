import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { DropdownFilter } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const Pais = ({
  rhForm,
  index = false,
  reorderedCountries,
  setPaisSel,
  fieldName = 'pais',
}) => {
  const { control, formState, setValue, trigger } = rhForm;
  const { errors } = formState;

  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="pais">País</label>
        <Controller
          render={({ field }) => {
            const { onChange, value, onBlur, name, ref } = field;
            return (
              <DropdownFilter
                onChange={(e) => {
                  onChange(e);
                }}
                setterOnChange={(e) => {
                  setPaisSel(e);
                  setValue(
                    index !== false
                      ? `direcciones[${index}][${fieldName}]`
                      : fieldName,
                    ''
                  );
                  setValue(
                    index !== false
                      ? `direcciones[${index}][${fieldName}]`
                      : fieldName,
                    ''
                  );
                  trigger(fieldName);
                }}
                value={value}
                inputRef={ref}
                name={name}
                onBlur={onBlur}
                options={reorderedCountries || []}
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
                showClear={false}
                filter
                emptyFilterMessage="Sin resultados"
                disabled
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'El campo país es requerido',
            },
          }}
          name={
            index !== false ? `direcciones[${index}][${fieldName}]` : fieldName
          }
          defaultValue={reorderedCountries[0]}
          control={control}
        />
        <Error
          property="pais"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default Pais;
