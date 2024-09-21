import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { ICheckBoxInput } from '@shared/interfaces/common/Form';

const InputCheckBox = ({
  isDisabled,
  name,
  label,
  required = false,
  className,
  defaultValue,
  myValue,
  ...rest
}: ICheckBoxInput): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex items-center">
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
              }
            : {}
        }
        render={({ field }) => {
          return (
            <Checkbox
              onChange={(e) => {
                field.onChange(e.checked ? myValue : false);
              }}
              checked={!!field.value}
              className={className}
              name={name}
              disabled={isDisabled}
              value={field.value}
              {...rest}
            />
          );
        }}
      />

      <label className="text-base font-normal leading-[20px]" htmlFor={name}>
        {label}
      </label>

      {errors[name] && (
        <small className="p-error">{errors[name]?.message?.toString()} </small>
      )}
    </div>
  );
};

export default InputCheckBox;
