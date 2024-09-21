import { FC } from 'react';
import { Controller } from 'react-hook-form';

import GenericInputText from '../../components/GenericInputText/GenericInputText';
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
  placeholder: string;
}

const TurboFormInputText: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  placeholder,
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
          <GenericInputText
            wrapperClassName={inputClassName}
            placeholder={placeholder}
            disabled={disabled}
            invalid={!!error}
            {...field}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormInputText;
