import { origenEnum } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IFormasContacto } from '@shared/interfaces/Legacy/IFormasContacto';

const Tipo = ({ origen }: IFormasContacto): JSX.Element => {
  const origenEmpresa = origen === origenEnum.INTERNO ? 'Interno' : 'Externo';
  return (
    <Tooltip content={origenEmpresa || ''}>
      <div className={`estado-origen-${origen} ellipsis`}>
        {origenEmpresa || ''}
      </div>
    </Tooltip>
  );
};

export default Tipo;
