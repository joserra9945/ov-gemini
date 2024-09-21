import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { GenericRazonSocialAutocomplete } from '@shared/components/GenericRazonSocialAutocomplete';

import { TurboFormControl } from '../Interfaces';

interface IProps {
  control: TurboFormControl;
  key: string;
  className?: string;
  label?: string;
  name: string;
  inputClassName?: string;
  disabled?: boolean;
  error?: string;
  placehoder?: string;
  optionLabel?: string;
  optionValue?: string;
}

const TurboFormRazonSocialAutocomplete: FC<IProps> = ({
  error = '',
  className = '',
  label = '',
  key,
  control,
  name,
  inputClassName = '',
  optionLabel = '',
  optionValue = '',
}) => {
  return (
    <div key={key} className={className}>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericRazonSocialAutocomplete
            wrapperClassName={inputClassName}
            optionLabel={optionLabel}
            optionValue={optionValue}
            {...field}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormRazonSocialAutocomplete;
