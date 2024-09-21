/* eslint-disable */
// @ts-nocheck

import * as React from 'react';
import { Password } from 'primereact/password';
import classNames from 'classnames/bind';

import { IInputPasswordProps } from './Interface';

const CustomInputPassword = ({
  value,
  onBlur,
  onChange,
  name,
  error = false,
  isDisabled = false,
  placeholder = undefined,
  mediumRegex = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
  strongRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
}: IInputPasswordProps): JSX.Element => {
  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });
  return (
    <Password
      value={value}
      className={inputClass}
      name={name}
      onBlur={onBlur}
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        onChange(target.value);
      }}
      toggleMask
      disabled={isDisabled}
      placeholder={placeholder}
      promptLabel="Introduce una contraseña"
      weakLabel="Baja"
      mediumLabel="Media"
      strongLabel="Alta"
      autoComplete="false"
      mediumRegex={mediumRegex}
      strongRegex={strongRegex}
    />
  );
};

export default CustomInputPassword;
