import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isNumber } from 'lodash';
import isEmpty from 'lodash/isEmpty';

import 'dayjs/locale/es';

dayjs.extend(utc);

export const toLocalFormat = (date: Date, upper = false): string => {
  const localeDate = dayjs.utc(date).local();
  const timeString = !upper
    ? localeDate.set('hour', 0).set('minute', 0).set('second', 0)
    : localeDate.set('hour', 23).set('minute', 59).set('second', 59);
  return timeString.format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDateUTC = (date: Date | string): string => {
  if (!date) return '';
  const localeDate = dayjs.utc(date).local();
  return localeDate.format('DD/MM/YYYY');
};

export const formatNumber = (
  number: number,
  minimumFractionDigits = 2
): string => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits,
    useGrouping: true,
  });
  return formatter.format(number).replace('€', '');
};

export const calendarES = {
  firstDayOfWeek: 1,
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ],
  today: 'Hoy',
  clear: 'Limpiar',
};

export const checkIfIsEmptyOrFalsy = (any: any): boolean =>
  !isNumber(any) ? isEmpty(any) || !any : false;
