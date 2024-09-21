import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { Error, InputPercentage } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputPercentageCheckbox extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  suffix?: string;
  setChecked?: (e: boolean) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  placeholder?: string;
}

const WildcardInputPercentageCheckbox = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  suffix,
  minValue = 0.01,
  maxValue = 100,
  step = 0.01,
  minFractionDigits = 2,
  maxFractionDigits = 3,
  placeholder = '',
  className,
  setChecked,
  index,
}: IWildcardInputPercentageCheckbox): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div
      className={`g-field g-checkbox ${inputName}-field${
        className ? ` ${className}` : ''
      }`}
    >
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-field">
          <Controller
            render={({ field }) => {
              const { onChange, onBlur, name, value } = field;
              return (
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => {
                        setIsChecked(!!e.checked);
                        setChecked && setChecked(!!e.checked);
                      }}
                      disabled={isDisabled}
                    />
                  </span>
                  <InputPercentage
                    isDisabled={isDisabled}
                    value={value}
                    name={name}
                    onBlur={onBlur}
                    error={fieldHasError(errors, inputName)}
                    onChange={onChange}
                    suffix={suffix}
                    min={minValue}
                    max={maxValue}
                    step={step}
                    minFractionDigits={minFractionDigits}
                    maxFractionDigits={maxFractionDigits}
                    placeholder={placeholder}
                  />
                </div>
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
            defaultValue={data ? data[inputName] : 0}
          />
          <Error property={inputName} errors={errors} index={index} />
        </div>
      </div>
    </div>
  );
};

export default WildcardInputPercentageCheckbox;
