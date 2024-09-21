import { nanoid } from 'nanoid';

import { IEstado } from '@shared/interfaces/IEstado/IEstado';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

type IngresosEstadoTemplateProps = {
  estado?: IEstado;
};
export const IngresosEstadoTemplate = ({
  estado,
}: IngresosEstadoTemplateProps): JSX.Element => {
  const id = nanoid();
  return estado?.description ? (
    <Tooltip classNameTrigger="ellipsis" content={estado?.description}>
      <div
        className={`estado-ingreso-tooltip-${id} estado-ingreso-${estado?.id} ellipsis`}
      >
        {estado?.description}
      </div>
    </Tooltip>
  ) : (
    <div>Sin estado</div>
  );
};

export default IngresosEstadoTemplate;
