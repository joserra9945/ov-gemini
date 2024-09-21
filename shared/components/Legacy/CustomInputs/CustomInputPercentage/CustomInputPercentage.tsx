/* eslint-disable */
// @ts-nocheck

import classNames from 'classnames/bind';
import { InputNumber } from '@shared/components/Legacy/InputNumber';
import { IInputPercentageProps } from './Interface';

const CustomInputPercentage = ({
  value,
  onBlur,
  onChange,
  name,
  isDisabled,
  error = false,
  suffix = '%',
  inputClassName = 'w-100',
  min = 0.0,
  max = 100,
  step = 0.01,
  maxFractionDigits = 3,
  placeholder = undefined,
  decimals = 2,
}: IInputPercentageProps): JSX.Element => {
  const inputClass = classNames(inputClassName, {
    'p-invalid p-mr-2': error,
  });

  return (
    <InputNumber
      value={value}
      className={inputClass}
      name={name}
      onBlur={onBlur}
      onChange={(e) => {
        onChange(e.value);
      }}
      min={min}
      max={max}
      step={step}
      localeOptions={{
        maximumFractionDigits: maxFractionDigits,
        useGrouping: true,
      }}
      maxFractionDigits={maxFractionDigits}
      suffix={suffix}
      locale="es-ES"
      disabled={isDisabled}
      placeholder={placeholder}
      decimals={decimals}
      onFocus={(e) => {
        if (e) {
          const input = e.target as HTMLInputElement;
          input.select();
        }
      }}
    />
  );
};

export default CustomInputPercentage;
