import { FocusEvent } from 'react';

export interface IInputMaskProps {
  value: string;
  mask: string;
  onChange: (arg: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  name: string;
  error?: string | boolean;
  placeholder?: string;
  autoClear?: boolean;
  unmask?: boolean;
  isDisabled?: boolean;
  slotChar?: string;
  inputClass?: string;
  className?: string;
}
