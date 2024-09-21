import { nanoid } from 'nanoid';
import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import '../styles/app-theme/templates/EstadoDocumento.scss';

interface Props {
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  estadoRevisionDescripcion?: string;
}

const EstadoDocumentoTemplate = ({
  estadoRevisionId,
  estadoRevisionNombre,
  estadoRevisionDescripcion,
}: Props) => {
  const id = nanoid();

  return (
    <Tooltip content={estadoRevisionDescripcion ?? estadoRevisionNombre ?? ''}>
      <div
        className={`estado-documento-cesion-${id} estado-documento-${estadoRevisionId} ellipsis`}
      >
        <div className="flex flex-row items-center justify-center gap-1">
          {estadoRevisionNombre || 'Sin estado'}
          {estadoRevisionDescripcion && <FontAwesomeIcon icon={faCircleInfo} />}
        </div>
      </div>
    </Tooltip>
  );
};

export default EstadoDocumentoTemplate;
