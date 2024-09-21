import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';

import { ICurrentInput } from '@shared/interfaces/common/Form';

const InputCurrency = ({
  name,
  label,
  defaultValue,
  className,
  required = false,
  labelClassName,
  ...rest
}: ICurrentInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className={labelClassName ?? `block`}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        rules={{
          required: {
            value: required,
            message: `El campo ${label} es obligatorio`,
          },
        }}
        render={({ field }) => (
          <div className="flex flex-column">
            <InputNumber
              id={field.name}
              value={field.value}
              onChange={(e: InputNumberChangeEvent) => {
                field.onChange(e.value);
                setValue(e.value ?? 0);
              }}
              mode="currency"
              currency="EUR"
              locale="es-ES"
              placeholder="0,00€"
              className={className}
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

export default InputCurrency;
