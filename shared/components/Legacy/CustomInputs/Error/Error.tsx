/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from 'react-hook-form';

import { fieldArrayHasError, fieldHasError } from '../helpers';

interface IError {
  property?: string;
  errors: FieldErrors | { [x: string]: any };
  index?: number;
}

const Error = ({ property, errors, index }: IError): JSX.Element => {
  const checkError = () => {
    if (!property) return errors?.message;
    if (index != null) return fieldArrayHasError(errors, property);

    return fieldHasError(errors, property);
  };
  return (
    <small id={property} style={{ display: 'block' }} className="p-invalid">
      {checkError()}
    </small>
  );
};

export default Error;
