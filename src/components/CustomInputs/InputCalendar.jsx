import React, { useMemo, useRef } from 'react';
import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames/bind';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

import { calendarES } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';

const HeaderTemplate = ({ calendarRef }) => {
  return (
    <Button
      className="input-calendar_close-icon"
      icon={faTimes}
      onClick={() => {
        calendarRef.hideOverlay();
      }}
    />
  );
};

const monthNavigatorTemplate = (e) => {
  return (
    <Dropdown
      value={e.value}
      options={e.options}
      onChange={(event) => e.onChange(event.originalEvent, event.value)}
      style={{ lineHeight: 1 }}
    />
  );
};

const yearNavigatorTemplate = (e) => {
  return (
    <Dropdown
      value={e.value}
      options={e.options}
      onChange={(event) => e.onChange(event.originalEvent, event.value)}
      className="p-ml-2"
      style={{ lineHeight: 1 }}
    />
  );
};

const CustomInputCalendar = (props) => {
  const {
    value,
    onChange,
    name,
    error,
    minDate = false,
    maxDate = false,
    placeholder,
    onSelect,
    disabled,
    showTime = false,
    showCloseIcon,
    onBlur,
  } = props;

  const calendarRef = useRef();
  const inputClass = classNames({
    'input-calendar': true,
    'p-invalid p-mr-2': error,
    'input-calendar--with-close-icon': showCloseIcon,
  });
  addLocale('es', calendarES);

  const headerCalendarComponent = useMemo(
    () => <HeaderTemplate calendarRef={calendarRef?.current} />,
    []
  );

  return (
    <Calendar
      appendTo={document.body}
      className={inputClass}
      dateFormat="dd/mm/yy"
      disabled={disabled}
      id={name}
      inputId={`${name}-input`}
      inputClassName="data-hj-allow"
      locale="es"
      maxDate={maxDate}
      minDate={minDate}
      monthNavigator
      onBlur={onBlur}
      onSelect={(e) => {
        // Esto funciona. No lo toquéis. Magia by @afaura
        onChange(e.value);
        if (onSelect) {
          onSelect(e.value);
        }
      }}
      onChange={(e) => {
        if (e?.value) {
          onChange(e.value);
          calendarRef.current.updateViewDate(e, e.value);
        }
      }}
      placeholder={placeholder}
      ref={calendarRef}
      showIcon
      showTime={showTime}
      yearNavigator
      yearRange="1900:2030"
      value={value}
      headerTemplate={() => (showCloseIcon ? headerCalendarComponent : null)}
      monthNavigatorTemplate={monthNavigatorTemplate}
      yearNavigatorTemplate={yearNavigatorTemplate}
    />
  );
};

export default CustomInputCalendar;
