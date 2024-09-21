import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

const EstadoFirmaTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-cesion-firmas-gestores-${id}`}>
        {description}
      </div>
    </Tooltip>
  );
};

export default EstadoFirmaTemplate;
