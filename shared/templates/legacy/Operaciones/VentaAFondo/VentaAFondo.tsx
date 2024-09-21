import { faFileInvoiceDollar } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { estadoVentaAFondoEnum } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './ventaAFondo.scss';

const VentaAFondo = ({ rowData }: any) => {
  const getEstadoFondo = (numero: number) => {
    switch (numero) {
      case estadoVentaAFondoEnum.PENDIENTE:
        return 'Pendiente';
      case estadoVentaAFondoEnum.FINALIZADA:
        return 'Finalizada';
      case estadoVentaAFondoEnum.EN_CURSO:
        return 'En curso';
      default:
        break;
    }
  };
  return (
    <Tooltip
      classNameTrigger="ellipsis"
      content={
        <div className="venta-a-fondo-tooltip-container">
          <div className="venta-a-fondo-title">Venta al fondo</div>
          <br />
          <div className="venta-a-fondo-estado">
            Estado: {getEstadoFondo(rowData?.ventaAFondo?.estado)}
          </div>
          <div className="venta-a-fondo-numero">
            Nº de venta: {rowData?.ventaAFondo?.numero}
          </div>
        </div>
      }
      className={`ventaAFondoTooltip ${
        rowData?.ventaAFondo ? '--active' : '--disabled'
      }`}
    >
      <div className="venta-a-fondo-tooltip ellipsis">
        <FontAwesomeIcon
          color={rowData?.ventaAFondo ? '' : 'lightgrey'}
          icon={faFileInvoiceDollar}
          size="1x"
        />
      </div>
    </Tooltip>
  );
};

export default VentaAFondo;
