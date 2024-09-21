import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { InputTextarea } from 'primereact/inputtextarea';

import { InputTextAreaPassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  value?: string;
  onChange: (e: string) => void;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  invalid?: boolean;
}

interface IProps extends ILibraryParams {
  wrapperClassName?: string;
}

const GenericInputTextArea: FC<IProps> = ({
  wrapperClassName,
  onChange,
  rows = 5,
  cols = 30,
  ...rest
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { inputtextarea: InputTextAreaPassThrough },
      }}
    >
      <div className={wrapperClassName}>
        <InputTextarea onChange={(e) => onChange(e.target.value)} {...rest} />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericInputTextArea;
