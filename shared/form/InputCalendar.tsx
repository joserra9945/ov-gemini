import { Controller, useFormContext } from 'react-hook-form';
import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { faCalendarLines } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICalendar } from '@shared/interfaces/common/Form';
import { calendarES } from '@shared/utils/constants';

import './styles/calendar.scss';

const InputCalendar = ({
  name,
  className,
  classNameWrapper,
  label,
  defaultValue,
  labelClassName,
  required = false,
  maxDate,
  minDate,
  disabled,
  ...rest
}: ICalendar) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  addLocale('es', calendarES);

  return (
    <div className={`${classNameWrapper || 'flex-auto w-full'}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: `El campo ${label} es obligatorio`,
          },
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <Calendar
              inputId={name}
              value={field.value}
              onChange={field.onChange}
              dateFormat="dd/mm/yy"
              className={`calendario w-full ${className} ${
                !disabled
                  ? ' enabled:!text-info !bg-transparent !text-info'
                  : 'bg-[#F2F2F2]'
              }`}
              placeholder="dd/mm/aaaa"
              showIcon
              icon={<FontAwesomeIcon icon={faCalendarLines} />}
              maxDate={maxDate}
              minDate={minDate}
              disabled={disabled}
              {...rest}
              locale="es"
            />
            {errors[name] && (
              <small className="p-error">
                {errors[name]?.message?.toString()}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputCalendar;
