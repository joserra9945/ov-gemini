import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { NuevaCesionModal } from '@shared/modules/CesionesForm/components/NuevaCesionModal';
import EstadoFirmaCesionTemplate from '@shared/templates/EstadoFirmaCesionTemplate';
import { formatCurrency } from '@shared/utils/formatters';

import './header.scss';

const Header = ({ cesion }) => {
  const navigate = useNavigate();
  const goBack = () => navigate('/cesiones');
  const [isShowingDialog, setIsShowingDialog] = useState(false);

  return (
    <>
      <div className="header__container">
        <div className="header__container--left">
          <Button
            icon={faArrowLeft}
            onClick={goBack}
            size="xl"
            type="icon-button"
          />
          <span className="title">Ficha de la cesión</span>
        </div>
        {cesion && (
          <div className="header__container--right">
            <div className="assignament-summary__container">
              {cesion?.tipo && (
                <span className="assignament-type__value">
                  {cesion?.tipo?.description}
                </span>
              )}
              |
              {cesion?.importe && (
                <span className="assignament-amount__value">
                  {formatCurrency(cesion?.importe)}
                </span>
              )}
            </div>
            <div className="assignament-state-singing__value">
              <EstadoFirmaCesionTemplate estadoFirma={cesion?.estadoFirma} />
            </div>
          </div>
        )}
      </div>
      <NuevaCesionModal
        isOpen={isShowingDialog}
        onClose={() => setIsShowingDialog(false)}
      />
    </>
  );
};

export default Header;
