import { Controller } from 'react-hook-form';

import { Error, InputMask } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputMask extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  mask?: string;
  unmask?: boolean;
  autoClear?: boolean;
  placeholder?: string;
  slotChar?: string;
  validationFunc?: (dni: string) => boolean | string | undefined;
}

const WildcardInputMask = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  className,
  mask = '',
  unmask = false,
  autoClear = false,
  placeholder = '',
  slotChar = '-',
  validationFunc,
  index,
}: IWildcardInputMask): JSX.Element => {
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
                <InputMask
                  className={className}
                  isDisabled={isDisabled}
                  value={value}
                  name={name}
                  onBlur={onBlur}
                  error={fieldHasError(errors, inputName)}
                  onChange={onChange}
                  mask={mask}
                  unmask={unmask}
                  autoClear={autoClear}
                  placeholder={placeholder}
                  slotChar={slotChar}
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
                    validate: validationFunc,
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={data ? data[inputName] : 0}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputMask;
