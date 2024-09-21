import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { DropdownFilter, InputText } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const Poblacion = ({
  rhForm,
  index = false,
  fieldName = 'poblacion',
  paisSel,
  poblaciones,
  item,
  disabled = false,
}) => {
  const { formState, control } = rhForm;
  const { errors } = formState;

  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="poblacion">Población</label>
        <Controller
          render={({ field }) => {
            const { onChange, onBlur, name, value } = field;
            return paisSel &&
              (paisSel.nombre === 'España' || paisSel === 66) ? (
              <DropdownFilter
                onChange={(e) => {
                  onChange(e);
                }}
                onBlur={onBlur}
                value={value}
                name={name}
                options={poblaciones}
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
                isClearable={false}
                noOptionsMessageText="Sin resultados"
              />
            ) : (
              <InputText
                onChange={(e) => onChange(e)}
                value={value}
                name={name}
                onBlur={onBlur}
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
              message: 'El campo población es requerido',
            },
          }}
          name={
            index !== false ? `direcciones[${index}].${fieldName}` : fieldName
          }
          defaultValue={item[fieldName]}
          control={control}
        />
        <Error
          property="poblacion"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default Poblacion;
