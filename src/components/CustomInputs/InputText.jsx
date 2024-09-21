import React from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames/bind';

const CustomInputText = ({
  value,
  onChange,
  name,
  error,
  disabled = false,
  inputRef = null,
  placeholder = '',
  onBlur,
}) => {
  const inputClass = classNames('data-hj-allow display-block', {
    'p-invalid p-mr-2': error,
  });
  return (
    <InputText
      className={inputClass}
      disabled={disabled}
      id={name}
      value={value}
      name={name}
      ref={inputRef}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default CustomInputText;
