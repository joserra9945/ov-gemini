import { Controller, useFormContext } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { IGenericInput } from '@shared/interfaces/common/Form';

import { CustomPhone } from '@shared/components/Legacy/CustomInputs';

const InputTelefono = ({
  name,
  className,
  defaultValue,
  label,
  required = false,
  onCountryCallingCodeEditable,
  isDisabled = false,
  data,
  ...rest
}: IGenericInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-auto w-full">
      {label && (
        <div className="label">
          <label htmlFor={name}>{label}</label>
        </div>
      )}

      <div className="p-fluid">
        <div className="p-field">
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={
              !isDisabled
                ? {
                    required: {
                      value: required,
                      message: `El campo ${label} es obligatorio`,
                    },
                    validate: (e) => {
                      if (e?.length > 0 && !isValidPhoneNumber(e))
                        return 'Teléfono no válido';
                    },
                  }
                : {}
            }
            render={({ field }) => (
              <div className="flex flex-column">
                <CustomPhone
                  className={className}
                  isDisabled={isDisabled}
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                  onCountryCallingCodeEditable={onCountryCallingCodeEditable}
                  {...rest}
                />
                {errors[name] && (
                  <small className="p-error">
                    {errors[name]?.message?.toString()}
                  </small>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default InputTelefono;
