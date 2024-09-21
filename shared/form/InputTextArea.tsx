import { Controller, useFormContext } from 'react-hook-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

import { IInputTextArea } from '@shared/interfaces/common/Form';

const InputTextArea = ({
  name,
  className,
  label,
  defaultValue,
  labelClassName,
  required = false,
  row = 4,
  col = 4,
  ...rest
}: IInputTextArea) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-auto w-full">
      <label htmlFor={name} className={labelClassName ?? `block`}>
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
        render={({ field, fieldState }) => (
          <>
            <InputTextarea
              id={field.name}
              {...field}
              rows={row}
              cols={col}
              className={classNames(
                { 'p-invalid': fieldState.error },
                className
              )}
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
    </div>
  );
};

export default InputTextArea;
