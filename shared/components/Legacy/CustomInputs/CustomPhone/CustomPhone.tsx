import { FocusEvent } from 'react';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es.json';
import classNames from 'classnames';

interface ICustomPhone {
  value: string;
  name?: string;
  className?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (args: string) => void;
  error?: string | boolean;
  isDisabled?: boolean;
  onCountryCallingCodeEditable?: boolean;
}

const CustomPhone = ({
  value,
  name,
  onChange,
  onBlur,
  error,
  className,
  isDisabled,
  onCountryCallingCodeEditable = false,
}: ICustomPhone): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });
  return (
    <PhoneInput
      disabled={isDisabled}
      onBlur={onBlur}
      countryCallingCodeEditable={onCountryCallingCodeEditable}
      international
      defaultCountry="ES"
      country="ES"
      value={value}
      className={`p-inputtext g-phone-input${className ? ` ${className}` : ''}${
        inputClass ? ` ${inputClass}` : ''
      }`}
      name={name}
      onChange={onChange}
      labels={es}
    />
  );
};

export default CustomPhone;
