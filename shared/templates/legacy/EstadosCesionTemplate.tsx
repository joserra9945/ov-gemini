import { nanoid } from 'nanoid';
import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { ICesion } from '@shared/interfaces/Legacy/ICesion';

const EstadosCesionTemplate = ({
  cesion,
}: {
  cesion: ICesion;
}): JSX.Element => {
  const id = nanoid();
  return cesion?.estado?.description ? (
    <div
      className={`estado-cesion-tooltip-${id} estado-cesion-${cesion?.estado?.id} ellipsis !flex !flex-row !justify-center !items-center gap-1`}
    >
      {cesion?.estado?.description}
      {cesion.descripcionEstado ? (
        <Tooltip content={cesion.descripcionEstado}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </Tooltip>
      ) : null}
    </div>
  ) : (
    <div>Sin estado</div>
  );
};

export default EstadosCesionTemplate;
