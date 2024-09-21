
import { useForm } from 'react-hook-form';

import WildcardCalendar from './WildcardCalendar';

import '@shared/styles/main.scss';

export const BasicCalendar = (): JSX.Element => {
  const rhForm = useForm();
  return (
    <WildcardCalendar
      rhForm={rhForm}
      data={{ calendar: '2022-03-09T23:00:00' }}
      inputName="calendar"
      inputLabel="Calendar"
      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 50))}
      required
      yearRange="2000:2100"
    />
  );
};
