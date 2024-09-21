import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import classNames from 'classnames/bind';

import { calendarES } from '@shared/utils/constants';

const InputCalendar = (props) => {
  const {
    value,
    onChange,
    name,
    error,
    minDate,
    maxDate,
    placeholder,
    onSelect,
    disabled,
  } = props;
  const inputClass = classNames({
    'input-text-login': true,
    'p-invalid p-mr-2': error,
  });
  addLocale('es', calendarES);
  return (
    <Calendar
      id={name}
      onSelect={onSelect}
      dateFormat="dd/mm/yy"
      value={value}
      className={inputClass}
      minDate={minDate}
      disabled={disabled}
      maxDate={maxDate}
      onChange={(e) => onChange(e.value)}
      locale="es"
      placeholder={placeholder}
      showIcon
      appendTo={document.body}
    />
  );
};

export default InputCalendar;
