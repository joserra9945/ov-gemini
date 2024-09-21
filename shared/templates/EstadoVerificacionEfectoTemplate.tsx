import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '../styles/app-theme/templates/estadoRevisionDevolucionTemplate.scss';

const EstadoVerificacionEfectoTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-verificacion-${id}`}>{description}</div>
    </Tooltip>
  );
};

export default EstadoVerificacionEfectoTemplate;
