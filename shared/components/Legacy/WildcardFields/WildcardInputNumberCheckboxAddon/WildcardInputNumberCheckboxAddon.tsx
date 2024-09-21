/* eslint-disable */
// @ts-nocheck

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { Error, InputPercentage } from '@shared/components/Legacy/CustomInputs';

import { formatNumber } from '../helpers';
import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputNumberCheckboxAddon extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  suffix?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  placeholder?: string;
  defaultValue?: number;
  labelPosition?: 'left' | 'top';
  checkboxValue?: boolean;
  checkboxSetter?: (checked: boolean) => void;
}

const WildcardInputNumberCheckboxAddon = ({
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
  defaultValue = 0,
  className,
  labelPosition = 'top',
  checkboxValue,
  checkboxSetter,
  index,
}: IWildcardInputNumberCheckboxAddon): JSX.Element => {
  const {
    control,
    formState: { errors },
    unregister,
    register,
  } = rhForm;

  useEffect(() => {
    if (!checkboxValue) {
      unregister([`${inputName}`]);
    } else {
      register(`${inputName}`);
    }
  }, [checkboxValue, unregister, register, inputName]);

  return (
    <div
      className={`g-field g-checkbox ${inputName}-field${
        className ? ` ${className}` : ''
      }${labelPosition === 'left' ? ' label-in-line' : ''}`}
    >
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-inputgroup">
          {checkboxValue != null && (
            <span className="p-inputgroup-addon">
              <Checkbox
                disabled={isDisabled}
                checked={checkboxValue}
                onChange={() =>
                  checkboxSetter && checkboxSetter(!checkboxValue)
                }
              />
            </span>
          )}
          <div className="p-field">
            {checkboxValue ? (
              <>
                <Controller
                  render={({ field }) => {
                    const { onChange, onBlur, name, value } = field;
                    return (
                      <div className="p-inputgroup">
                        <InputPercentage
                          isDisabled={isDisabled}
                          onBlur={onBlur}
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
                  defaultValue={data ? data[inputName] : defaultValue}
                />
                <Error property={inputName} errors={errors} index={index} />
              </>
            ) : (
              <div className="w-100">
                <span className="input-appareance">
                  {formatNumber(data ? data[inputName] : defaultValue)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WildcardInputNumberCheckboxAddon;
