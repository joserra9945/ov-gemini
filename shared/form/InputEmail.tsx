import { Controller, useFormContext } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

import { IGenericInput } from '@shared/interfaces/common/Form';

const InputEmail = ({
  name,
  className,
  classNameWrapper,
  label,
  labelClassName,
  defaultValue,
  required = false,
  placeholder = '',
  ...rest
}: IGenericInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${classNameWrapper || 'flex-auto w-full'}  `}>
      <label htmlFor={name} className={labelClassName ?? ''}>
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
            value:
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            message: 'Formato de correo electrónico inválido',
          },
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <InputText
              id={field.name}
              value={field.value}
              className={className}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={placeholder}
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

export default InputEmail;
