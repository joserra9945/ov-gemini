/* eslint-disable */
// @ts-nocheck

import { FC } from 'react';

import { InputTextProps } from './interfaces';

/**
 * Primary UI component for user interaction
 */
export const InputText: FC<InputTextProps> = ({
  placeholder,
  inputStyle,
  inputClass = '',
  componentClass = '',
  state = null,
  disabled = false,
  autoFocus = false,
  required = false,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <span
      className={`g-input-wrapper${componentClass && ` ${componentClass}`}`}
    >
      <input
        className={`g-input-text${
          state ? ` g-input-text--${state}` : ` g-input-text`
        }${inputClass && ` ${inputClass}`}`}
        style={inputStyle}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        required={required}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />
    </span>
  );
};
