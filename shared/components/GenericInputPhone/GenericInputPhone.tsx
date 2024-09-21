import { FC } from 'react';
import PhoneInput, { Labels } from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es.json';

import './GenericInputPhoneStyles.css';

interface ILibraryParams {
  placeholder?: string;
  mask?: string;
  onChange: (e: string | undefined | null) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
  error?: boolean;
  international?: boolean;
  defaultCountry?: string;
  country?: string;
  name?: string;
  labels?: Labels;
  inputClassName?: string;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericInputPhone: FC<IProps> = ({
  wrapperClassName,
  inputClassName,
  value,
  error,
  onChange,
}) => {
  return (
    <div className={wrapperClassName}>
      <PhoneInput
        value={value}
        invalid={!!error}
        international
        defaultCountry="ES"
        country="ES"
        onChange={onChange}
        className={`${inputClassName || ''} ${
          error ? 'PhoneInput-invalid' : ''
        }`}
        labels={es}
      />
    </div>
  );
};

export default GenericInputPhone;
