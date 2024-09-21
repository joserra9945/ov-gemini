import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { GenericInputEmails } from '@shared/components/GenericInputEmail';

interface IProps {
  control: Control<any>;
  componentKey: string;
  className: string;
  label: string;
  name: string;
  inputClassName: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
}

const TurboFormInputMultiEmail: FC<IProps> = ({
  control,
  componentKey,
  className = 'flex',
  label,
  name,
  inputClassName = 'flex',
  placeholder,
  disabled,
  error,
}) => {
  return (
    <div className="flex">
      <Controller
        name={name}
        control={control}
        render={({ field: { value = '', onChange } }) => (
          <div key={componentKey} className={className}>
            <label className="mb-2">{label}</label>
            <GenericInputEmails
              value={Array.isArray(value) ? value : []}
              onChange={onChange}
              className={inputClassName}
              placeholder={placeholder}
              disabled={disabled}
            />
            {error && <div className="text-danger text-xs">{error}</div>}
          </div>
        )}
      />
    </div>
  );
};

export default TurboFormInputMultiEmail;
