import { Controller } from 'react-hook-form';
import { isEmpty } from 'lodash';

import { Error, InputText } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildCardInputText extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  validationFunction?: (arg: any) => boolean | string | undefined;
  pattern?: { value: RegExp; message: 'string' };
  placeholder?: string;
  defaultValue?: string;
  keyObject?: string;
}

const WildcardInputText = ({
  rhForm,
  isDisabled = false,
  inputName,
  inputLabel,
  required = false,
  data,
  className,
  validationFunction,
  pattern,
  index,
  placeholder,
  defaultValue = '',
  keyObject,
}: IWildCardInputText): JSX.Element => {
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
        <div>
          <Controller
            render={({ field }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <InputText
                  className={className}
                  onBlur={onBlur}
                  isDisabled={isDisabled}
                  value={value}
                  name={name}
                  error={fieldHasError(errors, inputName)}
                  onChange={onChange}
                  placeholder={placeholder}
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
                    validate: (e) =>
                      validationFunction && validationFunction(e),
                    pattern,
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={
              !isEmpty(data)
                ? keyObject && data[keyObject][inputName]
                  ? data[keyObject][inputName]
                  : data[inputName]
                : defaultValue
            }
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputText;
