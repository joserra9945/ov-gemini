import { FocusEvent } from 'react';

export interface IInputPasswordProps {
  value: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (arg: string) => void;
  name: string;
  error?: string | boolean;
  isDisabled?: boolean;
  placeholder?: string;
  mediumRegex?: string;
  strongRegex?: string;
}
