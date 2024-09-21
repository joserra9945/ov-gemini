import { FocusEvent } from 'react';

export interface IInputCurrencyProps {
  value?: number;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (arg: number | string | undefined) => void;
  error?: string | boolean;
  name: string;
  isDisabled?: boolean;
  suffix?: string;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  step?: number;
  placeholder?: string | undefined;
  currency?: string;
  inputClassName?: string;
  min?: number;
  max?: number;
}
