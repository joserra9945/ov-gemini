import { Controller, useFormContext } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';

import { IGenericInput } from '@shared/interfaces/common/Form';

const InputNumberBasic = ({
  name,
  className,
  label,
  defaultValue,
  required = false,
  isDisabled = false,
  minDigits = 0,
  maxDigits = 2,
  max,
  min = 0,
  ...rest
}: IGenericInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: `El campo ${label || ''} es obligatorio`,
          },
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <InputNumber
              locale="es-ES"
              disabled={isDisabled}
              id={field.name}
              value={field.value}
              inputClassName={className}
              onBlur={field.onBlur}
              minFractionDigits={minDigits}
              maxFractionDigits={maxDigits}
              onValueChange={(e) => field.onChange(e.target.value)}
              onChange={(e) => field.onChange(e.value)}
              max={max}
              min={min}
              {...rest}
            />
            {errors[name] && (
              <small className="p-error">
                {errors[name]?.message?.toString()}
              </small>
            )}
          </>
        )}
      />
    </>
  );
};

export default InputNumberBasic;
