import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

interface EstadoOperacionProps {
  estado: IEnum;
  isClientView?: boolean;
}

const EstadoOperacionTemplate: React.FC<EstadoOperacionProps> = ({
  estado,
  isClientView = false,
}) => {
  return (
    <Tooltip content={estado.description}>
      <div
        className={`ellipsis ${
          isClientView
            ? `estado-operacion-cliente-format-${estado.id}`
            : `estado-operacion-format-${estado.id}`
        }`}
      >
        {estado.description}
      </div>
    </Tooltip>
  );
};

export default EstadoOperacionTemplate;
