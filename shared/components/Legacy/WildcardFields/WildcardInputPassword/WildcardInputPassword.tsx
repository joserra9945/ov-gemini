import { Controller } from 'react-hook-form';

import { Error, InputPassword } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputPassword extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  placeholder?: string;
  mediumRegex?: string;
  strongRegex?: string;
}

const WildcardInputPassword = ({
  rhForm,
  isDisabled,
  data,
  inputName,
  inputLabel,
  required = false,
  placeholder = undefined,
  mediumRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
  strongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
  index,
}: IWildcardInputPassword): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = rhForm;

  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <InputPassword
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  name={name}
                  isDisabled={isDisabled}
                  error={fieldHasError(errors, inputName)}
                  placeholder={placeholder}
                  mediumRegex={mediumRegex}
                  strongRegex={strongRegex}
                />
              );
            }}
            rules={
              !isDisabled
                ? {
                    required: {
                      value: required,
                      message: `El campo ${inputLabel} es obligatorio`,
                    },
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={data && data[inputName] ? data[inputName] : ''}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputPassword;
