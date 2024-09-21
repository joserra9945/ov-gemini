/* eslint-disable */
// @ts-nocheck

import { FieldErrors } from 'react-hook-form';

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

export const formatIban = (iban: string | undefined): string => {
  if (!iban) {
    return '';
  }

  const cleanIban = iban
    .replace(/\s\s+/g, ' ')
    .replace(/[^0-9a-zA-Z]/gi, '')
    .toUpperCase();

  const parts = [];

  if (cleanIban.length > 0) {
    parts.push(cleanIban.substring(0, 4));
  }

  if (cleanIban.length > 4) {
    parts.push(cleanIban.substring(4, 8));
  }

  if (cleanIban.length > 8) {
    parts.push(cleanIban.substring(8, 12));
  }

  if (cleanIban.length > 12) {
    parts.push(cleanIban.substring(12, 16));
  }

  if (cleanIban.length > 16) {
    parts.push(cleanIban.substring(16, 20));
  }

  if (cleanIban.length > 20) {
    parts.push(cleanIban.substring(20, 24));
  }

  return parts.join(' ');
};

/**
 * Check arrays errors for react-hook-forms and returns message
 * @param errors
 * @param property
 * @returns string | boolean
 */
export const fieldHasError = (
  errors: FieldErrors,
  property: string
): string | boolean => {
  if (!errors) return false;
  if (!errors[property]) return false;
  return errors[property].message;
};

export const fieldArrayHasError = (
  errors: FieldErrors,
  property?: string
): string | boolean => {
  const splitted = property?.split('.');
  if (splitted?.length) {
    const [fieldArrayName, index, name] = splitted;
    if (!fieldArrayName || !index || !name || !errors) return false;
    if (!errors[fieldArrayName] || !errors[fieldArrayName][index]) return false;
    if (!errors[fieldArrayName][index][name]) return false;
    return errors[fieldArrayName][index][name].message;
  }
  return false;
};
