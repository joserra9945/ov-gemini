import { Controller, useFormContext } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber';

import { IPercentageInput } from '@shared/interfaces/common/Form';

const InputPercentage = ({
  name,
  className,
  label,
  defaultValue,
  required = false,
  maxFractionDigits = 2,
  ...rest
}: IPercentageInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className="block">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: `El campo ${label} es obligatorio`,
          },
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="flex flex-column">
            <InputNumber
              id={field.name}
              value={field.value}
              className={className}
              onChange={(e) => field.onChange(e.value)}
              suffix="%"
              maxFractionDigits={maxFractionDigits}
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

export default InputPercentage;
