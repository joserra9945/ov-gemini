import { FC } from 'react';
import { addLocale, PrimeReactProvider } from 'primereact/api';
import { Calendar as PrimeCalendar, CalendarProps } from 'primereact/calendar';

import { CalendarPassThrough } from '@shared/styles/primereact/passThrough';
import { calendarES } from '@shared/utils/constants';

type IBaseProps = {
  wrapperClassName?: string;
};

const GenericCalendar: FC<IBaseProps & CalendarProps> = ({
  wrapperClassName,
  dateFormat = 'dd/mm/yy',
  onSelect,
  locale = 'es',
  ...rest
}) => {
  addLocale('es', calendarES);

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { calendar: CalendarPassThrough },
      }}
    >
      <div
        className={`flex justify-content-center w-full ${wrapperClassName} `}
      >
        <PrimeCalendar
          showIcon
          locale={locale}
          dateFormat={dateFormat}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericCalendar;
