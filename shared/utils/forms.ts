interface IIndexableArray {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Check arrays errors for react-hook-forms and returns message
 * @param errors
 * @param property
 * @returns string | boolean
 */
export const fieldHasError = <T extends IIndexableArray, U extends keyof T>(
  errors: T,
  property: U
): string | boolean => {
  if (!errors) return false;
  if (!errors[property]) return false;
  return errors[property].message;
};
