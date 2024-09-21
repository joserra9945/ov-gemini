import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { GenericInputNumber } from '@shared/components/GenericInputNumber';

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
  mode?: 'decimal' | 'currency';
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  onBlur?: () => void;
}

const TurboFormNumber: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  placeholder,
  disabled,
  error,
  minFractionDigits = 0,
  maxFractionDigits = 0,
  onBlur = () => {},
}) => {
  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericInputNumber
            wrapperClassName={inputClassName}
            placeholder={placeholder}
            disabled={disabled}
            minFractionDigits={minFractionDigits}
            maxFractionDigits={maxFractionDigits}
            invalid={!!error}
            {...field}
            onBlur={onBlur}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormNumber;
