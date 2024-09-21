import { Controller } from 'react-hook-form';

import { Error, InputPercentage } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputPercentage extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  suffix?: string;
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  placeholder?: string;
  decimals?: number;
}

const WildcardInputPercentage = ({
  rhForm,
  isDisabled = false,
  inputName,
  inputLabel,
  suffix,
  required = false,
  data,
  minValue = 0.01,
  maxValue = 100,
  step = 0.01,
  minFractionDigits = 2,
  maxFractionDigits = 3,
  placeholder = undefined,
  index,
  decimals = 2,
}: IWildcardInputPercentage): JSX.Element => {
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
              const { onChange, name, value, onBlur } = field;
              return (
                <InputPercentage
                  onBlur={onBlur}
                  isDisabled={isDisabled}
                  value={value}
                  name={name}
                  error={fieldHasError(errors, inputName)}
                  onChange={onChange}
                  suffix={suffix}
                  min={minValue}
                  max={maxValue}
                  step={step}
                  minFractionDigits={minFractionDigits}
                  maxFractionDigits={maxFractionDigits}
                  placeholder={placeholder}
                  decimals={decimals}
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
                    min: {
                      value: minValue,
                      message: `Valor mínimo requerido: ${minValue}`,
                    },
                  }
                : {}
            }
            control={control}
            name={`${inputName}` as const}
            defaultValue={data && data[inputName] ? data[inputName] : 0}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputPercentage;
