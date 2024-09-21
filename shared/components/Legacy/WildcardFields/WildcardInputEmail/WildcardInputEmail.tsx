import { Controller } from 'react-hook-form';

import { Error, InputEmail } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputEmail extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string[];
}
const WildcardInputEmail = ({
  inputName,
  inputLabel,
  isDisabled = false,
  rhForm,
  data,
  required = false,
  index,
  defaultValue = [],
  ...rest
}: IWildcardInputEmail): JSX.Element => {
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
              return (
                <InputEmail
                  error={fieldHasError(errors, inputName)}
                  {...field}
                  {...rest}
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
            defaultValue={
              data && data[inputName] ? data[inputName] : defaultValue
            }
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputEmail;
