import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';

import { TurboFormControl } from '../Interfaces';

interface IProps {
  control: TurboFormControl;
  key: string;
  className: string;
  label: string;
  name: string;
  inputClassName: string;
  disabled: string;
  error: string;
}

const TurboFormCheckbox: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  error,
}) => {
  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={!!field.value}
            className={inputClassName}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormCheckbox;
