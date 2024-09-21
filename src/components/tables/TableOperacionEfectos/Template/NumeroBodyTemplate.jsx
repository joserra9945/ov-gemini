import { faEye } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { tipoDocumentoString } from '@shared/utils/constants';

import InfoIconToOverlay from 'components/InfoIconToOverlay';

const NumeroBodyTemplate = (rowData) => {
  const { efecto } = rowData;
  const esFactura =
    efecto.tipoDocumentoId === parseInt(tipoDocumentoString.FACTURA, 10);

  return (
    <>
      <span className="p-column-title">Nº Documento</span>
      <div>
        {efecto.numero ? (
          efecto.numero !== 'undefined' ? (
            efecto.numero
          ) : (
            '(Sin número)'
          )
        ) : (
          <InfoIconToOverlay type="panel">
            <div>
              Haga clic en el botón <FontAwesomeIcon icon={faEye} /> y complete
              los datos {esFactura ? 'de la factura' : 'del pagaré'} para poder
              generar la operación
            </div>
          </InfoIconToOverlay>
        )}
      </div>
    </>
  );
};

export default NumeroBodyTemplate;
