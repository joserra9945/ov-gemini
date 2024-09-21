import { CSSProperties, EventHandler } from 'react';

export interface InputTagProps {
  placeholder?: string;
  inputClass?: string;
  componentClass?: string;
  inputStyle?: CSSProperties;
  state?: 'error' | 'dirty' | 'valid' | null;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  value: string[];
  onChange: EventHandler<any>;
  onBlur?: EventHandler<any>;
  separator?: string | string[];
  keyValue?: string | string[];
  name?: string;
}
