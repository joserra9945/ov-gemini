import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEstudioRiesgos } from '@shared/interfaces/Legacy/IEstudioRiesgos';

export const EstadoBodyTemplate = (rowData: IEstudioRiesgos): JSX.Element => {
  const { estado } = rowData;
  const id = nanoid();
  return (
    <>
      <span className="p-column-title hide-desktop">Estado</span>
      <Tooltip content={estado?.description || 'Pagado'}>
        <div className={`estado-estudio-${estado?.id} ep-${id} ellipsis`}>
          {estado?.description || 'Pagado'}
        </div>
      </Tooltip>
    </>
  );
};
