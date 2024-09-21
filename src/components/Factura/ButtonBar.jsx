import React from 'react';

// import { Button } from "primereact/button";
import { Button as ButtonLoader } from '@shared/components/Legacy/Button';

const ButtonBar = ({
  isSubmitting,
  // validForm,
  onSubmit,
  // continueButton,
  // continueButtonLabel,
  // continuar,
  fromDocRequerida,
}) => {
  return (
    <>
      <ButtonLoader
        id="continue-btn"
        label={fromDocRequerida ? 'Guardar' : 'Continuar'}
        className="mr-2 continuePagare form__loader-button"
        loading={isSubmitting}
        onClick={() => {
          onSubmit();
        }}
      />
      {/* <ButtonLoader
        label="Guardar Factura"
        className="mr-2"
        disabled={!validForm || isSubmitting}
        onClick={() => {
          if (validForm && !isSubmitting) onSubmit();
        }}
      />
      {continueButton && (
        <Button
          label={continueButtonLabel || 'Continuar'}
          className="p-button p-component button-loader p-button-submit"
          onClick={continuar}
          disabled={isSubmitting}
        />
      )} */}
    </>
  );
};

ButtonBar.propTypes = {};

export default ButtonBar;
