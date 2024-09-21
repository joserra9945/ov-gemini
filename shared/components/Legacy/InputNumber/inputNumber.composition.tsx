import { useEffect, useState } from 'react';

import InputNumber from './InputNumber';

import '@shared/styles/main.scss';

export const BasicInputNumber = (): JSX.Element => {
  const [value, setValue] = useState<number | string | undefined>();

  useEffect(() => {
    setTimeout(() => {
      setValue(1005);
    }, 3000);
  }, []);

  return (
    <InputNumber
      value={value}
      defaultValue={1000}
      onChange={(e) => setValue(e.value)}
      locale="es-ES"
      localeOptions={{
        maximumFractionDigits: 2,
        currency: 'EUR',
        style: 'currency',
        currencyDisplay: 'symbol',
        useGrouping: true,
      }}
      onFocus={(e) => {
        if (e) {
          const input = e.target as HTMLInputElement;
          input.select();
        }
      }}
    />
  );
};
