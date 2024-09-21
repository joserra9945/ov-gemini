/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormContext } from 'react-hook-form';

const HiddenValues = ({ data }) => {
  const rhForm = useFormContext();

  if (!data?.id) {
    return null;
  }

  return <input type="hidden" value={data?.id} {...rhForm.register(`id`)} />;
};

export default HiddenValues;
