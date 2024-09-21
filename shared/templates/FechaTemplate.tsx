import { formatDateUTC, formatFullDate } from '@shared/utils/formatters';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

type FechaTemplateProps = {
  full?: boolean;
  fecha?: string;
};
const FechaTemplate = ({ fecha, full = false }: FechaTemplateProps) => {
  const res = full ? formatFullDate(fecha) : formatDateUTC(fecha);
  return (
    <Tooltip content={res} classNameTrigger="ellipsis fecha-template">
      {res || '-'}
    </Tooltip>
  );
};

export default FechaTemplate;
