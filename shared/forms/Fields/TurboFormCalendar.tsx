import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { GenericCalendar } from '@shared/components/GenericCalendar';

import { TurboFormControl } from '../Interfaces';

interface IProps {
  control: TurboFormControl;
  key: string;
  className?: string;
  label: string;
  name: string;
  inputClassName?: string;
  maxDate?: Date;
  minDate?: Date;
  dateFormat?: string;
  showIco?: boolean;
  locale?: string;
  placeholder?: string;
  disabled?: boolean;
  error: string;
  showTime?: boolean;
  hourFormat?: '12' | '24';
}

const TurboFormCalendar: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  error,
  showIco = false,
  locale = 'es',
  ...rest
}) => {
  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericCalendar
            invalid={!!error}
            inputId={name}
            className={`${inputClassName} ${error ? 'p-invalid p-mr-2' : ''}`}
            {...field}
            {...rest}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormCalendar;
