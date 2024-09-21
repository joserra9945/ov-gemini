import React from 'react';
import { Controller } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

import { DropdownFilter, InputText } from 'components/CustomInputs';
import { Error } from 'components/forms/Fields';

const Provincia = ({
  rhForm,
  index = false,
  paisSel,
  fetchPoblaciones = null,
  provincias,
  fieldName = 'provincia',
  item,
  disabled = false,
}) => {
  const { formState, control } = rhForm;
  const { errors } = formState;

  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="provincia">Provincia</label>
        <Controller
          render={({ field }) => {
            const { onChange, onBlur, name, value } = field;
            return paisSel &&
              (paisSel.nombre === 'España' || paisSel === 66) ? (
              <DropdownFilter
                onChange={(e) => onChange(e)}
                onBlur={onBlur}
                setterOnChange={(e) => fetchPoblaciones && fetchPoblaciones(e)}
                value={value}
                name={name}
                options={provincias}
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
                // inputRef={ref}
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
              message: 'El campo provincia es requerido',
            },
          }}
          name={
            index !== false ? `direcciones[${index}].${fieldName}` : fieldName
          }
          defaultValue={item[fieldName]}
          control={control}
        />
        <Error
          property="provincia"
          errors={errors}
          fieldArrayProperty={index !== false ? 'direcciones' : false}
          index={index}
        />
      </div>
    </div>
  );
};

export default Provincia;
