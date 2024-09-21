import { Tooltip } from '@shared/components/Tooltip';
import { formatDateUTC } from '@shared/utils/formatters';

import { IFechaHoraTemplate } from './interfaces';

const FechaHoraTemplate = ({ fechaHora }: IFechaHoraTemplate) => {
  return (
    <Tooltip content={formatDateUTC(fechaHora) || '-'}>
      <div className="ellipsis">{formatDateUTC(fechaHora) || '-'}</div>
    </Tooltip>
  );
};

export default FechaHoraTemplate;
