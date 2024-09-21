/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames/bind';

import { formatIban } from '../helpers';

import { IInputIban } from './interface';

const InputIban = ({
  className,
  value,
  onChange,
  onBlur,
  name,
  error,
  disabled = false,
  inputRef = null,
  placeholder = '',
}: IInputIban): JSX.Element => {
  const [result, setResult] = useState({ iban: '', value: '' });

  useEffect(() => {
    setResult({
      iban: value,
      value: typeof value === 'string' ? formatIban(value) : '',
    });
  }, [value]);
  const inputClass = classNames(
    `data-hj-allow display-block${className ? ` ${className}` : ''}`,
    {
      'p-invalid p-mr-2': error,
    }
  );
  return (
    <InputText
      value={result.value}
      onChange={(e) => {
        const resIban = e.target.value
          .replace(/[^0-9a-zA-Z]/gi, '')
          .toUpperCase();

        if (resIban.length > 24) return;

        const res = {
          iban: resIban,
          value: formatIban(e.target.value),
        };

        onChange(res.iban);
        setResult(res);
      }}
      onBlur={onBlur}
      className={inputClass}
      disabled={disabled}
      id={name}
      name={name}
      ref={inputRef}
      placeholder={placeholder}
    />
  );
};

export default InputIban;
