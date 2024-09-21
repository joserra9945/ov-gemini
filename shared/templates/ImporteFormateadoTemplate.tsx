import { Tooltip } from '@shared/components/Tooltip';
import {
  formatCurrency,
  formatNumberPercentage,
} from '@shared/utils/formatters';

import { IImporteFormateadoTemplate } from './interfaces';

const ImporteFormateadoTemplate = ({
  importe,
  porcentage = false,
  className,
  comesFromCuentaCliente,
}: IImporteFormateadoTemplate) => {
  const newImporte = importe || 0;
  let importeFormateado;

  if (porcentage && newImporte === 0) {
    importeFormateado = 0;
  } else {
    importeFormateado = importe
      ? !porcentage
        ? formatCurrency(newImporte)
        : newImporte
      : importe === 0
      ? formatCurrency(newImporte)
      : '-';
  }
  const colorValue = importe
    ? importe < 0
      ? 'text-danger'
      : 'text-secondary'
    : '';

  const combinedClassName = className
    ? `${className} ${colorValue}`
    : colorValue;

  return (
    <Tooltip
      content={importeFormateado || importeFormateado.toString()}
      classNameTrigger={className}
    >
      <div className="ellipsis">
        <span className={comesFromCuentaCliente ? combinedClassName : ''}>
          {porcentage
            ? formatNumberPercentage(importeFormateado)
            : importeFormateado}
        </span>
      </div>
    </Tooltip>
  );
};

export default ImporteFormateadoTemplate;
