import { FocusEvent } from 'react';

export interface ICustomCalendar {
  value: Date | Date[];
  onChange: (args?: Date | Date[] | null) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string | boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  onSelect?: (e?: Date | Date[]) => void;
  isDisabled?: boolean;
  appendTo?: null | HTMLElement | 'self' | ((e: HTMLElement) => void);
  monthNavigator?: boolean;
  yearNavigator?: boolean;
  showTime?: boolean;
  readOnlyInput?: boolean;
  showCloseIcon?: boolean;
  yearRange?: string;
}
