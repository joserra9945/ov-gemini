import React from 'react';
import { InputMask } from 'primereact/inputmask';
import classNames from 'classnames/bind';

const CustomInputMask = ({
  value,
  onChange,
  name,
  error,
  mask,
  placeholder,
  autoClear,
  unmask,
  slotChar,
  onBlur,
  disabled,
}) => {
  const inputClass = classNames('data-hj-allow', {
    'p-invalid p-mr-2': error,
  });
  return (
    <InputMask
      mask={mask}
      onBlur={onBlur}
      className={inputClass}
      id={name}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.value)}
      autoClear={autoClear}
      unmask={unmask}
      slotChar={slotChar}
      disabled={disabled}
    />
  );
};

export default CustomInputMask;
