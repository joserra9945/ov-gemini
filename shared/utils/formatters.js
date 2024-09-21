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
    return formatter.format(numberToFormat);
  }
  return 'No hay importe';
};

/**
 * Cuando lo crea el back
 * @param {*} dateString
 * @returns
 */

/**
 * Cuando lo creamos nosotros
 * @param {*} date
 * @returns
 */

export function newFormatDateUTC(dateString) {
  if (!dateString) return '';
  const date = dayjs.utc(dateString).local();
  return date.format('YYYY-MM-DD');
}

export const toLocalFormat = (date) => {
  if (!date) return '';
  return dayjs(date).utc(true).format();
};

export const formatStringDateToStringDateTime = (date) => {
  if (!date) return '';
  const dateNew = dayjs(date, 'DD/MM/YYYY');
  const formatedDate = dateNew.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  return formatedDate;
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const toLocaleStringWithSymbol = (
  number,
  back = '-',
  locale = 'es-ES',
  digits = 2
) => {
  if (!number) return back;
  return number.toLocaleString(locale, {
    maximumFractionDigits: digits,
  });
};

export const formatDateUTC = (dateString) => {
  if (!dateString) return '';
  const date = dayjs.utc(dateString).local();
  return date.format('DD/MM/YYYY');
};

export const trimString = (str) => {
  if (typeof str === 'string') {
    return str.trim();
  }
  return str;
};

export const formatNumber = (number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    useGrouping: true,
  });
  return formatter.format(number).replace('€', '');
};

export const formatNumberPercentage = (number) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  return formatter.format(number).concat(' %');
};

export function formatHourTimeLine(dateString) {
  const date = dayjs(dateString);

  return date.format('HH:mm');
}

export function formatDateCalendar(dateString) {
  if (!dateString) return '-';
  const date = dayjs(dateString);

  return date.format('DD/MM/YYYY');
}

export function formatFullDate(dateString) {
  if (!dateString) return '-';
  const date = dayjs(dateString);
  return date.format('DD/MM/YYYY HH:mm');
}

export function formatFullDateWithSecondsUTC(dateString) {
  if (!dateString) return '';
  const date = dayjs.utc(dateString).local();
  return date.format('YYYY-MM-DD HH:mm:ss');
}

export function formatFullDateUTC(dateString) {
  if (!dateString) return '';
  const date = dayjs.utc(dateString).local();
  return date.format('DD/MM/YYYY HH:mm');
}

export function formatDateTimeline(dateString) {
  const date = moment.utc(dateString);

  return date.format('DD MMM');
}

export function changePerdidaString(perdidaString) {
  if (perdidaString.toLowerCase() === 'perdida') {
    return 'No financiada';
  }
  if (perdidaString.toLowerCase() === 'perdido') {
    return 'No financiado';
  }
  return perdidaString;
}

export function changeSpanishFormatIntoDefaultFormat(fechaString) {
  return fechaString.split('/').reverse().join('-');
}

export const dateUTCtoCalendar = (date) => {
  return dayjs.utc(date).toDate();
};
