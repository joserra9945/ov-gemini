import { FocusEvent } from 'react';

export interface IInputPercentageProps {
  value?: number;
  onChange: (arg: number | string | undefined) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  name: string;
  isDisabled?: boolean;
  suffix?: string;
  inputClassName?: string;
  max?: number;
  min?: number;
  step?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  placeholder?: string;
  decimals?: number;
}
