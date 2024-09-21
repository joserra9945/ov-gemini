import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';

import { CheckboxPassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  checked: boolean;
  className?: string;
  onChange?: (event: CheckboxChangeEvent) => void;
}

type IProps = ILibraryParams;

const GenericCheckbox: FC<IProps> = ({ checked, className, onChange }) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          checkbox: CheckboxPassThrough,
        },
      }}
    >
      <Checkbox className={className} checked={checked} onChange={onChange} />
    </PrimeReactProvider>
  );
};

export default GenericCheckbox;
