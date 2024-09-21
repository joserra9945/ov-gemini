import React from 'react';

import { Dialog } from '@shared/components/Legacy/Dialog';

import './basicTemplate.scss';

const BasicTemplate = ({
  isOpen,
  onCancel,
  header = null,
  className = null,
  children,
  closeButtonLinkAppareance = true,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      close={onCancel}
      header={header || ''}
      closeButtonLinkAppareance={closeButtonLinkAppareance}
      closeButtonColor="secondary"
      className={`basic__dialog${className ? ` ${className}` : ''}`}
      clickOutsideToClose={false}
    >
      {children}
    </Dialog>
  );
};
export default BasicTemplate;
