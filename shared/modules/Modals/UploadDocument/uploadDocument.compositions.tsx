import { useState } from 'react';

import UploadDocument from './UploadDocument';

import '@shared/styles/main.scss';

export const BasicUploadDocument = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Abrir
      </button>
      <UploadDocument
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        empresaId="1"
      />
    </>
  );
};
