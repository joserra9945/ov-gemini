import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button'; // ../Button
import { Error, InputPercentage } from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputNumberAddon extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  suffix?: string;
  onClickButton?: (arg1: string, arg2: number) => void;
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

const WildcardInputNumberAddon = ({
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
  onClickButton,
  labelPosition = 'top',
  checkboxValue,
  checkboxSetter,
  index,
}: IWildcardInputNumberAddon): JSX.Element => {
  const {
    control,
    formState: { errors },
    getValues,
  } = rhForm;
  return (
    <div
      className={`${inputName}-field ${className || ''}${
        labelPosition === 'left' ? ' label-in-line' : ''
      }`}
    >
      <div className="label">
        <label htmlFor={inputName}>{inputLabel}</label>
      </div>
      <div className="p-fluid">
        <div className="p-inputgroup">
          {checkboxValue != null && (
            <span className="p-inputgroup-addon">
              <Checkbox
                checked={checkboxValue}
                onChange={() =>
                  checkboxSetter && checkboxSetter(!checkboxValue)
                }
              />
            </span>
          )}
          <div className="p-field">
            <Controller
              render={({ field }) => {
                const { onChange, onBlur, name, value } = field;
                return (
                  <div className="p-inputgroup">
                    <InputPercentage
                      isDisabled={
                        isDisabled || checkboxValue != null
                          ? !checkboxValue
                          : false
                      }
                      value={value}
                      onBlur={onBlur}
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
                    <Button
                      icon={faSpinner}
                      onClick={() =>
                        onClickButton &&
                        onClickButton(inputName, getValues(inputName))
                      }
                      disabled={isDisabled}
                      className="input-number__button"
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
              defaultValue={
                data ? data[inputName] || defaultValue : defaultValue
              }
            />
            <Error property={inputName} errors={errors} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WildcardInputNumberAddon;
