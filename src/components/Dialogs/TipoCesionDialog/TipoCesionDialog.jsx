import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputRadioList } from '@shared/form';

import { Button } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';

import { cesionesTypes } from './helpers';

import './tipoCesionDialog.scss';

const TipoCesionDialog = ({ onClose, cesion, completarCesion = false }) => {
  const [selectedOption, setSelected] = useState(cesionesTypes[0]);
  const navigate = useNavigate();

  const handleClick = () => {
    completarCesion
      ? navigate(`/cesiones/complete/${cesion?.id}`, {
          state: {
            cesion,
            completarCesion,
            cesionType: selectedOption?.id,
          },
        })
      : navigate(`/cesiones/create`, {
          state: {
            cesionType: selectedOption?.id,
          },
        });
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Dialog
      isOpen
      close={onClose}
      position="top-center"
      className="tipo-cesion__dialog"
      header={`${completarCesion ? 'Tipo' : 'Nueva'} cesión`}
      disableAnimation
      clickOutsideToClose={false}
    >
      <div className="tipo-cesion__container">
        <span className="tipo-cesion__ask">
          ¿Qué tipo de cesión desea crear?
        </span>
        <div className="tipo-cesion__radio">
          <InputRadioList
            isHorizontal
            name="cesiones-radio"
            items={cesionesTypes}
            selectedOption={selectedOption?.value}
            onChange={(e) =>
              setSelected(cesionesTypes.find((type) => type.value === e))
            }
          />
        </div>
        <div className="footer-buttons">
          <Button label="Cancelar" link onClick={onClose} />
          <Button label="Siguiente" onClick={handleClick} />
        </div>
      </div>
    </Dialog>
  );
};

export default TipoCesionDialog;
