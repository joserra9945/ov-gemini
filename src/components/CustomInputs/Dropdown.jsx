import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames/bind';

const CustomDropdown = ({
  value,
  onChange,
  name,
  error,
  options,
  optionLabel = 'nombre',
  optionValue,
  disabled = false,
}) => {
  const inputClass = classNames(`${name} data-hj-allow`, {
    'p-invalid p-mr-2': error,
  });
  return (
    <Dropdown
      className={inputClass}
      disabled={disabled}
      value={value}
      inputId={name}
      options={options}
      optionLabel={optionLabel}
      optionValue={optionValue}
      onChange={(e) => onChange(e.target.value)}
      name={name}
    />
  );
};

export default CustomDropdown;
