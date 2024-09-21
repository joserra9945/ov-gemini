import { Controller, useFormContext } from 'react-hook-form';
import { InputSwitch as InputSwitchPR } from 'primereact/inputswitch';

import { ISwitchInput } from '@shared/interfaces/common/Form';

const InputSwitch = ({
  name,
  className,
  label,
  defaultValue,
  disabled = false,
  required = false,
  onChange,
  ...rest
}: ISwitchInput) => {
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
            <InputSwitchPR
              disabled={disabled}
              inputId={field.name}
              checked={field.value}
              inputRef={field.ref}
              onChange={(e) => {
                field.onChange(e.value);
                onChange?.(e);
              }}
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

export default InputSwitch;
