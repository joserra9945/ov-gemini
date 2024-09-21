/* eslint-disable */
// @ts-nocheck

import { FocusEvent } from 'react';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames/bind';

interface CustomDropdownProps {
  value: any;
  onChange(e: any): any;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?(e: any): any;
  className?: string;
  name?: string;
  options: any[];
  optionLabel?: string;
  optionValue?: string;
  disabled?: boolean;
  placeholder?: string;
  valueTemplate?: any;
  itemTemplate?: any;
  tooltip?: string;
  error?: string | boolean;
  panelClassName?: string;
}

const CustomDropdown = ({
  value,
  name,
  options,
  optionLabel,
  disabled,
  onChange,
  onFocus,
  onBlur,
  className,
  placeholder,
  valueTemplate,
  optionValue,
  itemTemplate,
  tooltip,
  error = false,
  panelClassName,
}: CustomDropdownProps): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });
  return (
    <Dropdown
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`${className ? `${className} ` : ''}${inputClass}`}
      valueTemplate={valueTemplate}
      itemTemplate={itemTemplate}
      disabled={disabled}
      value={value}
      options={options}
      optionValue={optionValue}
      optionLabel={optionLabel}
      tooltip={tooltip}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      emptyMessage="No se han encontrado resultados"
      panelClassName={panelClassName}
    />
  );
};

export default CustomDropdown;
