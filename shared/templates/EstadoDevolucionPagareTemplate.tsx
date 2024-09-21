import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '../styles/app-theme/templates/estadoDevolucionPagareTemplate.scss';

const EstadoDevolucionPagareTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-devolucionDePagare-${id}`}>
        {description}
      </div>
    </Tooltip>
  );
};

export default EstadoDevolucionPagareTemplate;
