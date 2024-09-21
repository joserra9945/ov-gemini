/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { Error, InputNumber } from '@shared/components/Legacy/CustomInputs';

import { formatNumber } from '../helpers';
import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';

interface IWildcardInputNumberCheckbox extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  className?: string;
  setChecked?: (e: boolean) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  placeholder?: string;
  showQuantityInput?: boolean;
  initialPrice?: any;
}

const WildcardInputNumberCheckbox = ({
  rhForm,
  isDisabled,
  inputName,
  inputLabel,
  required = false,
  data,
  minValue = 0.0,
  maxValue,
  step = 0.01,
  minFractionDigits = 2,
  maxFractionDigits = 3,
  placeholder = '',
  className,
  showQuantityInput = false,
  setChecked,
  initialPrice,
  index,
}: IWildcardInputNumberCheckbox): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const firstTime = useRef(true);

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    unregister,
    register,
    trigger,
  } = rhForm;

  const setInitialValue = useCallback(() => {
    setValue(
      inputName,
      initialPrice && initialPrice[inputName] ? initialPrice[inputName] : 0
    );
  }, [initialPrice, inputName, setValue]);

  useEffect(() => {
    if (!isChecked) {
      unregister([`${inputName}`]);
    } else {
      register(`${inputName}`);
    }
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      setInitialValue();
    }
  }, [isChecked, inputName, register, unregister, setInitialValue]);

  useEffect(() => {
    const thereIsData = data && data[inputName] != null;
    setIsChecked(thereIsData);
    if (thereIsData) {
      setValue(inputName, data[inputName]);
    }
  }, [data, inputName, setValue]);

  return (
    <div
      className={`g-field g-checkbox ${inputName}-field${
        className ? ` ${className}` : ''
      }`}
    >
      <div className="flex">
        <Checkbox
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.checked);
            setChecked && setChecked(e.checked);
            if (!e.checked) {
              setQuantity(1);
              setValue(`${inputName}-quantity`, 1);
              trigger(`${inputName}-quantity`);
            }
          }}
          disabled={isDisabled}
        />
        <div className="label g-ml">
          <label htmlFor={inputName}>{inputLabel}</label>
        </div>
      </div>
      <div className="p-fluid flex">
        <div className="p-field">
          {showQuantityInput && (
            <Controller
              render={({ field }) => {
                const { onChange, onBlur, name, value } = field;
                return (
                  <InputNumber
                    isDisabled={isDisabled}
                    value={value}
                    onBlur={onBlur}
                    name={name}
                    onChange={(e?: number | string) => {
                      const currentQuantityValue = getValues(
                        `${inputName}-quantity`
                      );
                      const currentValue = getValues(inputName);
                      const qaux = e ? +e : 1;
                      setValue(
                        inputName,
                        (qaux / currentQuantityValue) * currentValue
                      );
                      setQuantity(qaux);
                      onChange(qaux);
                    }}
                    min={1}
                    step={1}
                    maxFractionDigits={0}
                    className="quantity-input"
                  />
                );
              }}
              control={control}
              name={`${inputName}-quantity` as any}
              defaultValue={quantity}
            />
          )}
        </div>
        <div className="p-field">
          {isChecked ? (
            <>
              <Controller
                render={({ field }) => {
                  const { onChange, name, value } = field;
                  return (
                    <InputNumber
                      isDisabled={isDisabled || !isChecked}
                      value={value}
                      name={name}
                      error={fieldHasError(errors, inputName)}
                      onChange={onChange}
                      min={minValue}
                      max={maxValue}
                      step={step}
                      minFractionDigits={minFractionDigits}
                      maxFractionDigits={maxFractionDigits}
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
                      }
                    : {}
                }
                control={control}
                name={`${inputName}` as const}
                defaultValue={data && data[inputName] ? data[inputName] : 0}
              />
              <Error property={inputName} errors={errors} index={index} />
            </>
          ) : (
            <div className="w-100">
              <span className="input-appareance">
                {formatNumber(
                  initialPrice && initialPrice[inputName]
                    ? initialPrice[inputName]
                    : 0
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WildcardInputNumberCheckbox;
