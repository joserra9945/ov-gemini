import { EventHandler } from 'react';

export interface InputTextProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  inputClass?: string;
  componentClass?: string;
  inputStyle?: Object;
  state?: 'error' | 'dirty' | 'valid' | null;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  value?: string;
  onChange?: EventHandler<any>;
  onBlur?: EventHandler<any>;
}
