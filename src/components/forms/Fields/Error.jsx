import React from 'react';

import { fieldArrayHasError, fieldHasError } from '@shared/utils/utils';

const Error = ({
  property,
  errors,
  fieldArrayProperty = false,
  index = false,
}) => {
  const checkError = () => {
    if (fieldArrayProperty)
      return fieldArrayHasError(errors, fieldArrayProperty, index, property);
    return fieldHasError(errors, property);
  };
  return (
    <small id={property} className="p-invalid">
      {checkError()}
    </small>
  );
};

export default Error;
