/* eslint-disable */
// @ts-nocheck

import { FieldErrors } from 'react-hook-form';

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
