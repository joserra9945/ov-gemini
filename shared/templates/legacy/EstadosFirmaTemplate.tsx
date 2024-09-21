import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { ICesion } from '@shared/interfaces/Legacy/ICesion';

const EstadosFirmaTemplate = ({ cesion }: { cesion: ICesion }): JSX.Element => {
  const id = nanoid();
  return cesion?.estadoFirma?.description ? (
    <Tooltip
      classNameTrigger="ellipsis"
      content={cesion?.estadoFirma?.description}
    >
      <div
        className={`estado-cesion-firma-tooltip-${id} estado-cesion-firma-${cesion?.estadoFirma?.id} ellipsis`}
      >
        {cesion?.estadoFirma?.description}
      </div>
    </Tooltip>
  ) : (
    <div>Sin estado</div>
  );
};

export default EstadosFirmaTemplate;
