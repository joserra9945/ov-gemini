/* eslint-disable */
// @ts-nocheck

import classNames from 'classnames/bind';

import {
  InputNumber,
  InputNumberChangeParams,
} from '@shared/components/Legacy/InputNumber';

import { IInputCurrencyProps } from './Interface';

const CustomInputCurrency = ({
  value,
  onBlur,
  onChange,
  name,
  isDisabled,
  error = false,
  maxFractionDigits = 2,
  step = 1,
  currency = 'EUR',
  placeholder = undefined,
  inputClassName,
  min,
  max,
}: IInputCurrencyProps): JSX.Element => {
  const inputClass = classNames(inputClassName, {
    'p-invalid p-mr-2': error,
  });
  return (
    <InputNumber
      value={value}
      onBlur={onBlur}
      className={inputClass}
      name={name}
      onChange={(e: InputNumberChangeParams) => onChange(e.value)}
      locale="es-ES"
      step={step}
      localeOptions={{
        maximumFractionDigits: maxFractionDigits,
        currency,
        style: 'currency',
        currencyDisplay: 'symbol',
        useGrouping: true,
      }}
      disabled={isDisabled}
      placeholder={placeholder}
      onFocus={(e) => {
        if (e) {
          const input = e.target as HTMLInputElement;
          input.select();
        }
      }}
      min={min}
      max={max}
    />
  );
};

export default CustomInputCurrency;
