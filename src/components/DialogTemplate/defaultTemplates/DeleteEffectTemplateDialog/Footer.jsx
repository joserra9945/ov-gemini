import React from 'react';
import { Button } from 'primereact/button';

import '../../styles.scss';

const Footer = ({ onDeny = () => {}, onConfirm = () => {} }) => {
  const handleDeny = () => {
    onDeny();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="botonera-modal-container">
      <Button
        type="button"
        label="Cancelar"
        onClick={handleDeny}
        className="p-button-text p-button-text-no"
      />
      <Button
        type="button"
        label="Eliminar"
        onClick={handleConfirm}
        className="p-button-text p-button-text-yes"
      />
    </div>
  );
};

export default Footer;
