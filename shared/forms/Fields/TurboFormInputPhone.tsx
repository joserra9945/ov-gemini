import { FC } from 'react';
import { Controller } from 'react-hook-form';
import es from 'react-phone-number-input/locale/es.json';

import { GenericInputPhone } from '@shared/components/GenericInputPhone';

import { TurboFormControl } from '../Interfaces';

interface IProps {
  control: TurboFormControl;
  key: string;
  className: string;
  label: string;
  name: string;
  inputClassName: string;
  disabled: boolean;
  error: string;
}

const TurboFormInputPhone: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  disabled,
  error,
}) => {
  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericInputPhone
            error={!!error}
            international
            defaultCountry="ES"
            country="ES"
            onChange={field.onChange}
            value={field.value}
            name={name}
            labels={es}
            disabled={disabled}
            inputClassName={inputClassName}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormInputPhone;
