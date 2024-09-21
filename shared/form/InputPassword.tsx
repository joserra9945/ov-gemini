import { Controller, useFormContext } from 'react-hook-form';
import { Password } from 'primereact/password';

import { IPasswordInput } from '@shared/interfaces/common/Form';

const InputPassword = ({
  name,
  className,
  label,
  required = false,
  placeholder,
  validate = false,
  ...rest
}: IPasswordInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: 'La contraseña es obligatoria',
          },
          validate: (value) => {
            if (validate) {
              const pattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",<.>/?]).{8,}$/;
              if (!pattern.test(value)) {
                return 'La contraseña debe tener al menos 8 carácteres, entre ellos, números, minúsculas, máyusculas y carácteres especiales.';
              }
            }
          },
        }}
        render={({ field }) => (
          <>
            <Password
              id={field.name}
              value={field.value}
              className={className}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={placeholder}
              toggleMask
              feedback={false}
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

export default InputPassword;
