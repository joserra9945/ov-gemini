import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/components/Button';
import { tipoDocumentoString } from '@shared/utils/constants';

import * as Actions from 'store/actions/actions-effect';

const FinanciarButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToFactura = () => {
    dispatch(
      Actions.setCurrentEffect({
        step: 1,
        tipoEfecto: parseInt(tipoDocumentoString.FACTURA, 10),
        efectos: [],
      })
    );

    navigate('/subir-efectos');
  };

  const goToPagare = () => {
    dispatch(
      Actions.setCurrentEffect({
        step: 1,
        tipoEfecto: parseInt(tipoDocumentoString.PAGARE, 10),
        efectos: [],
      })
    );
    navigate('/subir-efectos');
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        id="financiarFactura"
        onClick={goToFactura}
        text="Financiar factura"
        type="button"
      />
      <Button
        id="financiarPagare"
        onClick={goToPagare}
        text="Financiar pagaré"
        type="button"
      />
    </div>
  );
};

export default FinanciarButtons;
