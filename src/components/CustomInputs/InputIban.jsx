import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames/bind';

import { formatIban } from '@shared/utils/utils';

const InputIban = ({
  value,
  onChange,
  name,
  error,
  disabled = false,
  inputRef = null,
  placeholder = '',
}) => {
  const [result, setResult] = useState(
    value ? { iban: value, value: formatIban(value) } : { iban: '', value: '' }
  );
  const inputClass = classNames('data-hj-allow display-block', {
    'p-invalid p-mr-2': error,
  });
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

        onChange(res);
        setResult(res);
      }}
      className={`${inputClass || ''} input-iban`}
      disabled={disabled}
      id={name}
      name={name}
      ref={inputRef}
      placeholder={placeholder}
    />
  );
};

export default InputIban;
