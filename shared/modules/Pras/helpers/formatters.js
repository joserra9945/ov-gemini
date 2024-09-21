/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/es';

dayjs.extend(utc);
export const formatCurrency = (number, round = false) => {
  if (typeof number !== 'number') {
    return number;
  }
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: true,
  });
  if (number != null) {
    let numberToFormat = number;
    if (round) {
      numberToFormat = Math.round(numberToFormat);
    }
    return formatter.format(numberToFormat).replace(/,0+\s/, '');
  }
  return 'No hay importe';
};

/**
 * Cuando lo crea el back
 * @param {*} dateString
 * @returns
 */

export function formatDateUTC(dateString) {
  if (!dateString) return '';
  const date = dayjs.utc(dateString).local();
  return date.format('DD/MM/YYYY');
}
