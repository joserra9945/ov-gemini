import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEstudioRiesgos } from '@shared/interfaces/Legacy/IEstudioRiesgos';

export const EstadoFinanciacionBodyTemplate = (
  rowData: IEstudioRiesgos
): JSX.Element => {
  const { estadoFinanciacion } = rowData;
  const id = nanoid();
  return (
    <>
      <span className="p-column-title hide-desktop">Estado</span>
      <Tooltip content={estadoFinanciacion?.description || 'Pagado'}>
        <div
          className={`estado-estudio-financiacion-${estadoFinanciacion?.id} ep-${id} ellipsis`}
        >
          {estadoFinanciacion?.description || 'Pagado'}
        </div>
      </Tooltip>
    </>
  );
};
