import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '@shared/styles/app-theme/templates/detalleCuentaCliente.scss';

const EstadoCuentaClienteTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description?.toUpperCase()}>
      <div className="ellipsis">
        <span className={`tipo-cuenta-cliente-${id}`}>
          {description?.toUpperCase()}
        </span>
      </div>
    </Tooltip>
  );
};

export default EstadoCuentaClienteTemplate;
