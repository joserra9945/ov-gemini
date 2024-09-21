import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputNumber as PrimeInputNumber } from 'primereact/inputnumber';

import { InputNumberThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  value: any;
  onChange: (e: any) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  mode?: 'decimal' | 'currency';
  currency?: string;
  locale?: string;
}

interface IBaseProps extends ILibraryParams {
  wrapperClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}

const GenericInputNumber: FC<IBaseProps> = ({
  wrapperClassName,
  onChange,
  placeholder = '',
  disabled = false,
  invalid = false,
  mode = 'decimal',
  currency,
  locale = '',
  onBlur,
  ...rest
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { inputnumber: InputNumberThrough },
      }}
    >
      <div
        className={`flex justify-content-center w-full ${wrapperClassName} `}
      >
        <PrimeInputNumber
          locale="es-ES"
          placeholder={placeholder}
          disabled={disabled}
          invalid={invalid}
          onValueChange={(e) => onChange(e.value)}
          onChange={(e) => onChange(e.value)}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInputNumber;
