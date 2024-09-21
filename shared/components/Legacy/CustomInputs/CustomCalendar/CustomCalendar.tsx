/* eslint-disable */
// @ts-nocheck
import { useMemo, useRef } from 'react';
import { addLocale } from 'primereact/api';
import {
  Calendar,
  CalendarChangeEvent,
  CalendarSelectEvent,
} from 'primereact/calendar';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import { calendarES } from '../helpers';

import { ICustomCalendar } from './ICustomCalendar';

const HeaderTemplate = ({ calendarRef }: any) => {
  return (
    <Button
      className="input-calendar_close-icon"
      icon={faTimes}
      link
      onClick={() => {
        calendarRef?.hideOverlay();
      }}
    />
  );
};

const monthNavigatorTemplate = (e: any) => {
  return (
    <div className="p-custom-dropdown">
      <select
        value={e.value}
        onChange={(event: any) => {
          e.onChange(event, event.target.value);
        }}
        className="p-custom-dropdown--label"
      >
        {e?.options?.reverse().map((opt: any) => (
          <option className="p-custom-dropdown--item" value={opt.value}>
            {opt?.label}
          </option>
        ))}
      </select>
    </div>
  );
};
// e: CalendarYearNavigatorTemplateParams Comentado porque las interfaces están
const yearNavigatorTemplate = (e: any) => {
  return (
    <div className="p-custom-dropdown">
      <select
        value={e.value}
        onChange={(event: any) => {
          e.onChange(event, event.target.value);
        }}
        className="p-custom-dropdown--label"
      >
        {e?.options?.reverse().map((opt: any) => (
          <option className="p-custom-dropdown--item" value={opt.value}>
            {opt?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const CustomCalendar = ({
  value,
  onChange,
  name,
  error,
  minDate,
  maxDate,
  placeholder,
  onSelect,
  isDisabled,
  appendTo = document.body,
  monthNavigator = true,
  yearNavigator = true,
  showTime,
  showCloseIcon,
  yearRange = '1890:2050',
}: ICustomCalendar): JSX.Element => {
  const calendarRef = useRef<any>();
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });

  addLocale('es', calendarES);

  const headerCalendarComponent = useMemo(
    () => <HeaderTemplate calendarRef={calendarRef?.current} />,
    [calendarRef]
  );

  return (
    <Calendar
      name={name}
      className={`buttonCalendar ${inputClass}`}
      dateFormat="dd/mm/yy"
      ref={calendarRef}
      disabled={isDisabled}
      inputClassName="data-hj-allow"
      locale="es"
      onSelect={(e: CalendarSelectEvent) => {
        // Esto funciona. No lo toquéis. Magia by @afaura
        onChange(e.value);
        if (onSelect) {
          onSelect(e.value);
        }
      }}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(e: CalendarChangeEvent) => {
        if (e?.value) {
          onChange(e.value);
          calendarRef.current.updateViewDate(e, e.value);
        }
      }}
      placeholder={placeholder}
      appendTo={appendTo}
      monthNavigator={monthNavigator}
      yearNavigator={yearNavigator}
      yearRange={yearRange}
      showTime={showTime}
      showIcon
      headerTemplate={() => (showCloseIcon ? headerCalendarComponent : null)}
      monthNavigatorTemplate={monthNavigatorTemplate}
      yearNavigatorTemplate={yearNavigatorTemplate}
    />
  );
};

export default CustomCalendar;
