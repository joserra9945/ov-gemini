import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '../styles/app-theme/templates/estadoRevisionDevolucionTemplate.scss';

const EstadoRevisionPagareTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-revision-devolucionDePagare-${id}`}>
        {description}
      </div>
    </Tooltip>
  );
};

export default EstadoRevisionPagareTemplate;
