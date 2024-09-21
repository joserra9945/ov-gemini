import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';

import { ICustomInputText } from './interface';

const CustomInputText = ({
  value,
  onBlur,
  onKeyUp,
  onChange,
  className,
  inputMode,
  name,
  isDisabled,
  error = false,
  placeholder,
}: ICustomInputText): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
    [`${className}`]: className,
  });
  return (
    <InputText
      name={name}
      disabled={isDisabled}
      onBlur={onBlur}
      onKeyUp={(e) => onKeyUp?.(e.key)}
      className={`${inputClass}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default CustomInputText;
