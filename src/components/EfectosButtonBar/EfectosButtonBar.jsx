import { useLocation } from 'react-router-dom';

import { Button } from '@shared/components/Legacy/Button';

import './efectosButtonBar.scss';

const buttonText = (tipoDoc) => {
  switch (+tipoDoc) {
    case 1:
      return 'Subir nuevo pagaré';
    case 2:
      return 'Subir nueva factura';
    default:
      return 'Volver';
  }
};

const ButtonBar = ({
  submitButtonLabel,
  isSubmitting,
  thirdButtonLabel,
  backButtonLabel,
  thirdButtonFunc,
  backFunc,
  submitFunc,
  showThirdButton,
  typeOfDocument,
  disableAll = false,
  isEditing = false,
}) => {
  const location = useLocation();
  const isDisabledFromDocReq = location?.state?.fromDocReq;
  return (
    <>
      {!isEditing && (
        <Button
          name="button1"
          disabled={disableAll || isDisabledFromDocReq}
          className="mr-2 form__loader-button"
          color="light"
          label={backButtonLabel || buttonText(typeOfDocument)}
          loading={isSubmitting === 'backAction'}
          onClick={() => backFunc()}
        />
      )}
      {showThirdButton && (
        <Button
          name="button2"
          disabled={disableAll}
          className="mr-2 form__loader-button"
          loading={isSubmitting === 'thirdAction'}
          label={thirdButtonLabel}
          onClick={() => thirdButtonFunc()}
        />
      )}
      <Button
        id="continue-btn"
        name="button3"
        disabled={disableAll}
        className="form__loader-button"
        label={submitButtonLabel}
        loading={isSubmitting === 'submitAction'}
        onClick={() => submitFunc()}
      />
    </>
  );
};

ButtonBar.propTypes = {};

export default ButtonBar;
