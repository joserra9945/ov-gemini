import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Estado = ({ confirmada }: { confirmada: string }): JSX.Element => {
  const id = nanoid();
  return (
    <>
      <span className="p-column-title hide-desktop">Estado</span>
      <Tooltip content={confirmada ? 'Confirmada' : 'Pendiente'}>
        <div
          className={`estado-tooltip-${id} estado-remesa-${
            confirmada ? '1' : '0'
          }`}
        >
          <div className="ellipsis">
            {confirmada ? 'Confirmada' : 'Pendiente'}
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default Estado;
