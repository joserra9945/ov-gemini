import { Controller } from 'react-hook-form';

import { Error, InputIban } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputIban extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
}

const WildcardInputIban = ({
  rhForm,
  isDisabled = false,
  inputName,
  inputLabel,
  required = false,
  data,
  className = '',
  index,
}: IWildcardInputIban): JSX.Element => {
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
                <InputIban
                  className={className}
                  disabled={isDisabled}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  error={fieldHasError(errors, inputName)}
                  onChange={onChange}
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
            defaultValue={data ? data[inputName] : ''}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputIban;
