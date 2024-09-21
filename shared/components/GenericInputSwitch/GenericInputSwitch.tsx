import { FC, useRef } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputSwitch as PrimeInputSwitch } from 'primereact/inputswitch';

import { InputSwithchPassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  checked: boolean;
  disabled?: boolean;
  onChange: (e: any) => void;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericInpuSwitch: FC<IProps> = ({
  wrapperClassName,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    if (inputRef && inputRef.current) {
      inputRef?.current.click();
    }
  };

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { inputswitch: InputSwithchPassThrough },
      }}
    >
      <div className={wrapperClassName}>
        <PrimeInputSwitch
          onChange={(e) => onChange(e.value)}
          inputRef={inputRef}
          onClick={() => handleOnClick()}
          {...rest}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInpuSwitch;
