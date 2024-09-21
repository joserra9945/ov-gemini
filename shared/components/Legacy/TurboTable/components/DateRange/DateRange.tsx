import { useEffect, useRef, useState } from 'react';
import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { faTimes } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import { calendarES } from '../../helpers';

const HeaderTemplate = ({ calendarRef }: any) => {
  return (
    <Button
      className="input-calendar_close-icon"
      icon={faTimes}
      onClick={() => {
        calendarRef?.hideOverlay();
      }}
    />
  );
};

interface IDateRangeProps {
  onChange: (e: number[] | null) => void;
  defaultValue?: number[] | null;
  id?: string;
}

const DateRange = ({
  onChange,
  defaultValue,
  id,
}: IDateRangeProps): JSX.Element => {
  const calendarRef = useRef<Calendar>(null);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>();
  const [defaultDates, setDefaultDates] = useState<Nullable<(Date | null)[]>>();

  addLocale('es', calendarES);

  useEffect(() => {
    const dDates = defaultValue?.map((value) => new Date(value));
    setDefaultDates(dDates);
  }, [defaultValue]);

  return (
    <Calendar
      style={{ width: '100%' }}
      ref={calendarRef}
      value={dates || defaultDates}
      dateFormat="dd/mm/yy"
      onChange={(e: any) => {
        setDates(e?.value);
        if ((e.value?.length && e.value[0] && e.value[1]) || !e.value?.length) {
          onChange(e.value);
        }
      }}
      locale="es"
      selectionMode="range"
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTemplate={() => (
        <HeaderTemplate calendarRef={calendarRef?.current} />
      )}
      showIcon
      readOnlyInput
      showButtonBar
      inputClassName="p-column-filter"
      id={id}
    />
  );
};

export default DateRange;
