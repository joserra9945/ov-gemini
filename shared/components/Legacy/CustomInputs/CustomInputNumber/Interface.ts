import { FocusEvent } from 'react';

export interface IInputNumberProps {
  value?: number;
  onChange: (arg: number | string | undefined) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  name: string;
  isDisabled?: boolean;
  suffix?: string;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  step?: number;
  min?: number | string;
  max?: number;
  placeholder?: string | undefined;
  className?: string;
}
