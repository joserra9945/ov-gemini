import { useState } from 'react';

import CustomCalendar from './CustomCalendar';

import '@shared/styles/main.scss';

export const CalendarBasic = (): JSX.Element => {
  const [value, setValue] = useState<Date>(new Date());
  return (
    <CustomCalendar
      value={value}
      onChange={(date) => setValue(date as Date)}
      name="custom-calendar"
      minDate={new Date()}
      showTime
      placeholder="Prueba"
    />
  );
};
