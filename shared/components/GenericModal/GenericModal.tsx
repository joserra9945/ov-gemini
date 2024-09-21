import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { nanoid } from 'nanoid';

import ModalPT from '@shared/styles/primereact/passThrough/ModalPT';

interface ILibraryParams {
  onClose: () => void;
  open: boolean;
  children: JSX.Element;
  header: JSX.Element | string;
  closable?: boolean;
  containerClassName?: string;
  className?: string;
}

const GenericModal: FC<ILibraryParams> = ({ onClose, open, ...rest }) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { dialog: ModalPT },
      }}
    >
      <Dialog visible={open} key={nanoid()} onHide={onClose} {...rest} />
    </PrimeReactProvider>
  );
};

export default GenericModal;
