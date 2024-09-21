import { Controller, useFormContext } from 'react-hook-form';

import { IFilePondInput } from '@shared/interfaces/common/Form';

import { Filepond } from '@shared/components/Legacy/CustomInputs';

const InputFilePond = ({
  label,
  name,
  defaultValue,
  required = false,
  disabled = false,
  maxFiles = 3,
  acceptedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'],
  labelClassName,
  changeIcon,
  ...rest
}: IFilePondInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        htmlFor={label}
        className={`${labelClassName || 'block font-bold'}`}
      >
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
        render={({ field }) => (
          <div>
            <Filepond
              data={defaultValue}
              isDisabled={disabled}
              maxFiles={maxFiles}
              acceptedFileTypes={acceptedFileTypes}
              changeIcon={changeIcon}
              {...rest}
              {...field}
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
export default InputFilePond;
