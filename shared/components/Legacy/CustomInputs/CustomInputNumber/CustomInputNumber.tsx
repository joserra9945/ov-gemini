/* eslint-disable */
// @ts-nocheck

import classNames from 'classnames/bind';

import { InputNumber } from '@shared/components/Legacy/InputNumber';

import { IInputNumberProps } from './Interface';

const CustomInputNumber = ({
  value,
  onBlur,
  onChange,
  name,
  isDisabled,
  error = false,
  maxFractionDigits = 2,
  step = 1,
  min = 1,
  max = 99999999,
  placeholder = undefined,
  className = '',
}: IInputNumberProps): JSX.Element => {
  const inputClass = classNames(className, {
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
      locale="es-ES"
      disabled={isDisabled}
      placeholder={placeholder}
      onFocus={(e) => {
        if (e) {
          const input = e.target as HTMLInputElement;
          input.select();
        }
      }}
    />
  );
};

export default CustomInputNumber;
