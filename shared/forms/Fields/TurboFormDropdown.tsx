import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { GenericDropdown } from '@shared/components/GenericDropdown';

import { TurboFormControl } from '../Interfaces';

interface IProps {
  control: TurboFormControl;
  key: string;
  className: string;
  label: string;
  name: string;
  inputClassName: string;
  options: any[];
  optionLabel: string;
  optionValue: string;
  disabled: boolean;
  error: string;
  placehoder?: string;
}

const TurboFormDropdown: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  options,
  optionLabel,
  optionValue,
  disabled,
  error,
  placehoder,
}) => {
  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericDropdown
            className={`${inputClassName} ${error ? 'p-invalid p-mr-2' : ''}`}
            options={options || []}
            optionLabel={optionLabel}
            placeholder={placehoder}
            optionValue={optionValue}
            disabled={disabled}
            invalid={!!error}
            {...field}
          />
        )}
      />
      {error && <div className="text-xs text-danger">{error}</div>}
    </div>
  );
};

export default TurboFormDropdown;
