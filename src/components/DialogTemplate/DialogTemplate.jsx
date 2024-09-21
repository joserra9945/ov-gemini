import React from 'react';
import { Dialog } from 'primereact/dialog';

import './styles.scss';

const DialogTemplate = ({
  visible,
  setVisible,
  header,
  footer,
  children,
  className = '',
}) => {
  return (
    <div className="modal-viewer-delete">
      <Dialog
        header={header}
        visible={visible}
        className={`g-dialog ${className || ''}`}
        footer={footer}
        onHide={() => setVisible(false)}
      >
        {children}
      </Dialog>
    </div>
  );
};

export default DialogTemplate;
