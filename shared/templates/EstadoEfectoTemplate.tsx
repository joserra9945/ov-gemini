import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

const EstadoEfectoTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-efecto-financiacion-${id}`}>
        {description}
      </div>
    </Tooltip>
  );
};

export default EstadoEfectoTemplate;
