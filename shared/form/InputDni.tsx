import { Controller, useFormContext } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { IGenericInput } from '@shared/interfaces/common/Form';

const InputDni = ({
  name,
  className,
  defaultValue,
  label,
  required = false,
  ...rest
}: IGenericInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-auto w-full">
      <label className="font-bold block" htmlFor={name}>
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
          pattern: {
            value: /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i,
            message: `El campo ${label} debe tener un formato válido`,
          },
        }}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className="flex flex-column">
            <InputText
              id={field.name}
              maxLength={9}
              value={field.value}
              className={classNames({ 'p-error': fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
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

export default InputDni;
