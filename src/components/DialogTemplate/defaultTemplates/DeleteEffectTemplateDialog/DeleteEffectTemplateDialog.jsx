import React from 'react';

import DialogTemplate from 'components/DialogTemplate';

import Footer from './Footer';

const DeleteEffectTemplateDialog = ({
  visible,
  setVisible,
  onConfirm,
  onDeny,
}) => {
  return (
    <DialogTemplate
      visible={visible}
      setVisible={setVisible}
      header="¿Deseas eliminar este documento?"
      className="delete-documento"
      footer={
        <Footer
          onDeny={() => {
            setVisible(false);
            if (onDeny) onDeny();
          }}
          onConfirm={() => {
            setVisible(false);
            if (onConfirm) onConfirm();
          }}
        />
      }
    >
      <span>
        Si lo haces no podrás recuperar los datos a no ser que lo subas de
        nuevo.
      </span>
    </DialogTemplate>
  );
};

export default DeleteEffectTemplateDialog;
