import { Controller } from 'react-hook-form';
import { isNumber } from 'lodash';

import { Error, InputCurrency } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputCurrency extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  step?: number;
  currency?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

const WildcardInputNumber = ({
  rhForm,
  isDisabled = false,
  data,
  inputName,
  inputLabel,
  required = false,
  minFractionDigits = 0,
  maxFractionDigits = 2,
  step = 1,
  currency = 'EUR',
  placeholder = undefined,
  index,
  min,
  max,
}: IWildcardInputCurrency): JSX.Element => {
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
                <InputCurrency
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  name={name}
                  isDisabled={isDisabled}
                  error={fieldHasError(errors, inputName)}
                  minFractionDigits={minFractionDigits}
                  maxFractionDigits={maxFractionDigits}
                  step={step}
                  currency={currency}
                  placeholder={placeholder}
                  min={min}
                  max={max}
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
                    min,
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={
              data && data[inputName] && isNumber(data[inputName])
                ? data[inputName]
                : 0
            }
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputNumber;
