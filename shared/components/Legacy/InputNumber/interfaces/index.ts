import { FocusEvent } from 'react';

export interface InputNumberChangeParams {
  originalEvent: React.SyntheticEvent;
  value: number | string | undefined;
}

export interface IInputNumber {
  id?: string;
  className?: string;
  value?: string | number;
  inputStyle?: React.CSSProperties;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (arg: InputNumberChangeParams) => void;
  name?: string;
  error?: string | boolean;
  disabled?: boolean;
  inputRef?: string | null;
  placeholder?: string;
  locale?: string;
  step?: number;
  min?: number | string;
  max?: number;
  suffix?: string;
  decimals?: number;
  inputMode?:
    | 'none'
    | 'text'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'decimal'
    | 'numeric'
    | undefined;
  defaultValue?: string | number;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  localeOptions?: Intl.NumberFormatOptions;
}
