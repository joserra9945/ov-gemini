import { Controller, useFormContext } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

import { IGenericInput } from '@shared/interfaces/common/Form';

const InputTextBasic = ({
  name,
  className,
  label,
  defaultValue,
  disabled = false,
  required = false,
  ...rest
}: IGenericInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className="text-text">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: `El campo ${label || ''}  es obligatorio`,
          },
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="flex flex-column">
            <InputText
              id={field.name}
              value={field.value}
              className={className}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
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
  );
};

export default InputTextBasic;
