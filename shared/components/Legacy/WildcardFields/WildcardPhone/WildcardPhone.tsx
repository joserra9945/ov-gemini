/* eslint-disable */
// @ts-nocheck

import { Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { CustomPhone, Error } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardPhone extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  onCountryCallingCodeEditable?: boolean;
}

const WildcardPhone = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  className = '',
  index,
  onCountryCallingCodeEditable = true,
}: IWildcardPhone): JSX.Element => {
  const { control } = rhForm;
  return (
    <div className={`g-field ${inputName}-field`}>
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field, fieldState: { error } }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <>
                  <CustomPhone
                    onBlur={onBlur}
                    className={className}
                    isDisabled={isDisabled}
                    value={value}
                    name={name}
                    error={error && fieldHasError(error, inputName)}
                    onChange={onChange}
                    onCountryCallingCodeEditable={onCountryCallingCodeEditable}
                  />
                  {error ? <Error errors={error} index={index} /> : null}
                </>
              );
            }}
            rules={
              !isDisabled
                ? {
                    required: {
                      value: required,
                      message: `El campo ${inputLabel} es obligatorio`,
                    },
                    validate: (e) => {
                      if (e?.length > 0 && !isValidPhoneNumber(e))
                        return 'Teléfono no válido';
                    },
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={data[inputName]}
          />
        </div>
      </div>
    </div>
  );
};

export default WildcardPhone;
