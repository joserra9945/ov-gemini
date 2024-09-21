import { FocusEvent } from 'react';

export interface ICustomInputText {
  value: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: (string: string) => void;
  onChange: (arg: string) => void;
  className?: string;
  isDisabled?: boolean;
  name?: string;
  error?: string | boolean;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  placeholder?: string;
}
