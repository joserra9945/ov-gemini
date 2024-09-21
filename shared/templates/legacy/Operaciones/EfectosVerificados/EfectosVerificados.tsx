import { faFileCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EfectosVerificados = ({
  efectosAceptadosPorLibrado,
}: {
  efectosAceptadosPorLibrado: boolean;
}) => (
  <Tooltip
    content={efectosAceptadosPorLibrado ? 'Efecto aceptado por el librado' : ''}
    classNameTrigger="ellipsis"
  >
    <FontAwesomeIcon
      color={efectosAceptadosPorLibrado ? '' : 'lightgrey'}
      icon={faFileCheck}
    />
  </Tooltip>
);

export default EfectosVerificados;
