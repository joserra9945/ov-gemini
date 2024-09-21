import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputMask as PrimeInputMask } from 'primereact/inputmask';
import { nanoid } from 'nanoid';

import { InputPhonePassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  placeholder?: string;
  mask?: string;
  onChange: (e: string | undefined | null) => void;
  disagled?: boolean;
  value?: string;
  className?: string;
  invalid?: boolean;
  readOnly?: boolean;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericInputMask: FC<IProps> = ({
  wrapperClassName,
  mask = '(+99) 999-999-999',
  onChange,
  ...rest
}) => {
  const id = nanoid();

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { inputmask: InputPhonePassThrough },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeInputMask
          id={`phone-${id}`}
          mask={mask}
          onChange={(e) => onChange(e.value)}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInputMask;
