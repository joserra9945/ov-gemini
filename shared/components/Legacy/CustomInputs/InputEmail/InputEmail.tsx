/* eslint-disable */
// @ts-nocheck

import { useState } from 'react';
import classNames from 'classnames/bind';

import InputTag from '@shared/components/Legacy/InputTag';

import { validateEmail } from './helpers';
import { IInputEmail } from './interface';

const InputEmail = ({
  className,
  value,
  onChange,
  name,
  error,
  disabled = false,
  placeholder = '',
  onBlur,
  defaultValues = [],
}: IInputEmail): JSX.Element => {
  const [emails, setEmails] = useState(value || defaultValues);

  const inputClass = classNames(
    `data-hj-allow display-block${className ? ` ${className}` : ''}`,
    {
      'p-invalid p-mr-2': error,
    }
  );

  return (
    <InputTag
      value={emails}
      onChange={(e) => {
        const tmpEmails: string[] = [];
        e.forEach((email: string) => {
          if (validateEmail(email)) tmpEmails.push(email);
        });
        setEmails(tmpEmails);
        onChange && onChange(e);
      }}
      separator={[';', ' ', 'Enter']}
      inputClass={inputClass}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default InputEmail;
