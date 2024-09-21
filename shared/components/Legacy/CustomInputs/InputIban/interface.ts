import { FocusEvent } from 'react';

export interface IInputIban {
  className?: string;
  value: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (arg: string) => void;
  name: string;
  error?: string | boolean;
  disabled?: boolean;
  inputRef?: string | null;
  placeholder?: string;
}
