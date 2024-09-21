import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { tipoDocumentoString } from '@shared/utils/constants';

import FacturaLogo from '../../assets/icon_factura.svg';

import './styles.scss';

const OnBoarding = ({ onSetInfoEffect, effectsState }) => {
  return (
    <div className="card col-9 on-board">
      <div className="title">
        <h2 className="card-title">Sube tus Facturas</h2>
      </div>
      <div className="panel">
        <div className="border-dotted-box">
          <div className="factura-svg">
            <img src={FacturaLogo} alt="Efecto logo" />
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="row">
          <div className="col-md-6">
            <button
              className="p-button"
              tabIndex="0"
              onClick={() => {
                onSetInfoEffect({
                  step: 1,
                  tipoEfecto: parseInt(tipoDocumentoString.FACTURA, 10),
                  efectos: effectsState.efectos ? effectsState.efectos : [],
                });
              }}
              type="button"
            >
              <span className="p-button-label p-clickable">
                <FontAwesomeIcon icon={faPlus} />
                Añadir Factura
              </span>
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="p-button p-button-secondary"
              onClick={() => {
                onSetInfoEffect({
                  step: 1,
                  tipoEfecto: parseInt(tipoDocumentoString.PAGARE, 10),
                  efectos: effectsState.efectos ? effectsState.efectos : [],
                });
              }}
              type="button"
            >
              <span className="p-button-label text-center p-clickable">
                Subir Pagaré
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
