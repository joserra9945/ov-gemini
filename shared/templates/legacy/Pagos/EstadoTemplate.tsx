// import { IPago } from 'interfaces/IPago/IPago';
import { nanoid } from 'nanoid';

import { IPago } from '@shared/interfaces/IPago/IPago';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EstadoTemplate = ({ estado, usuarioRiesgos }: IPago): JSX.Element => {
  const id = nanoid();
  return (
    <Tooltip content={usuarioRiesgos?.nombre || ''}>
      <div
        className={`estado-tooltip-${id} estado-pagos-${estado?.id}`}
        style={{ fontSize: '13px', padding: 'auto' }}
      >
        {estado?.description}
      </div>
    </Tooltip>
  );
};

export default EstadoTemplate;
