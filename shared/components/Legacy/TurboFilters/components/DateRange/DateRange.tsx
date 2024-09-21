/* eslint-disable */
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { addLocale } from 'primereact/api';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faCalendar } from '@fortawesome/pro-solid-svg-icons';

import { Button } from '@shared/components/Legacy/Button';

import { calendarES, formatDateUTC } from '../../helpers';
import FilterHOC from '../FilterHOC';

const HeaderTemplate = ({ calendarRef }: any) => {
  return (
    <Button
      className="input-calendar_close-icon"
      icon={faTimes}
      onClick={() => {
        calendarRef?.hide();
      }}
    />
  );
};

interface IDateRangeProps {
  onChange: (e: Date[] | null) => void;
  defaultValue?: number[] | null;
  id?: string;
  filterName: string;
  onClearFilter: () => void;
  iconName?: IconDefinition;
  fixedFilter?: boolean;
  disabled?: boolean;
}

const DateRange = ({
  onChange,
  onClearFilter,
  defaultValue,
  id,
  filterName,
  iconName = faCalendar,
  fixedFilter,
  disabled = false,
}: IDateRangeProps): JSX.Element => {
  const calendarRef = useRef<any>(null);
  const [dates, setDates] = useState<Date | Date[]>();
  const [defaultDates, setDefaultDates] = useState<Date | Date[]>();
  const [filterDates, setFilterDates] = useState<Date | Date[]>();

  addLocale('es', calendarES);

  useEffect(() => {
    let dDates: Date[] = [];
    if (Array.isArray(defaultValue)) {
      dDates = defaultValue?.map((value) => new Date(value));
    } else if (defaultValue) {
      dDates = [new Date(defaultValue)];
    }
    setDefaultDates(dDates);
    setFilterDates(dDates);
  }, [defaultValue]);

  const getParsedDates = () => {
    const value = filterDates;
    if (Array.isArray(value)) {
      return value.map((d) => formatDateUTC(d));
    }
    return value ? formatDateUTC(value) : null;
  };

  return (
    <FilterHOC
      clearFilter={(closeFilter?: boolean) => {
        setDates([]);
        if (closeFilter) {
          setFilterDates([]);
          onChange(null);
          onClearFilter();
        }
      }}
      disabled={disabled}
      filterName={filterName}
      fixedFilter={fixedFilter}
      iconName={iconName}
      onChange={() => {
        const value = dates || defaultDates;
        if (
          Array.isArray(value) &&
          ((value?.length && value[0] && value[1]) || !value?.length)
        ) {
          onChange(value);
          setFilterDates(value);
        }
      }}
      value={getParsedDates()}
    >
      <Calendar
        style={{ width: '100%' }}
        ref={calendarRef}
        value={dates || defaultDates}
        dateFormat="dd/mm/yy"
        onChange={(e: CalendarChangeEvent) => {
          setDates(e?.value);
          if (
            Array.isArray(e?.value) &&
            e?.value?.every((value: Date) => !!value)
          ) {
            calendarRef?.current?.hide();
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
        // showButtonBar
        inputClassName="p-column-filter"
        id={id}
      />
    </FilterHOC>
  );
};

export default DateRange;
