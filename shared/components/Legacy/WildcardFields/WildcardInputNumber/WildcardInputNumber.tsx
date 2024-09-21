import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Error, InputNumber } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputNumber extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  step?: number;
  min?: number | string;
  minValue?: number;
  max?: number;
  placeholder?: string;
  defaultValue?: number;
}

const WildcardInputNumber = ({
  rhForm,
  isDisabled,
  data,
  inputName,
  inputLabel,
  required = false,
  minFractionDigits = 0,
  maxFractionDigits = 2,
  step = 1,
  min = 0,
  max = 99999999,
  minValue = 1,
  placeholder = undefined,
  index,
  defaultValue,
}: IWildcardInputNumber): JSX.Element =>
  useMemo(() => {
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
                const { onChange, name, onBlur, value } = field;
                return (
                  <InputNumber
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    isDisabled={isDisabled}
                    error={fieldHasError(errors, inputName)}
                    minFractionDigits={minFractionDigits}
                    maxFractionDigits={maxFractionDigits}
                    step={step}
                    min={min}
                    max={max}
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
                      min: {
                        value: minValue,
                        message: `Valor mínimo permitido: ${minValue}`,
                      },
                    }
                  : {}
              }
              control={control}
              name={`${inputName}` as const}
              defaultValue={
                data && data[inputName] ? data[inputName] : defaultValue ?? ''
              }
            />
            <Error property={inputName} errors={errors} index={index} />
          </div>
        </div>
      </div>
    );
  }, [
    rhForm,
    inputName,
    inputLabel,
    isDisabled,
    required,
    minValue,
    data,
    defaultValue,
    index,
    minFractionDigits,
    maxFractionDigits,
    step,
    min,
    max,
    placeholder,
  ]);

export default WildcardInputNumber;
