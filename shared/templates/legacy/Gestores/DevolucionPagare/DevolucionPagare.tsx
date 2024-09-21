import { faFileCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './devolucionPagare.scss';

const DevolucionPagare = () => {
  return (
    <Tooltip
      content="Tiene devolución"
      classNameTrigger="ellipsis informacion-documento__tooltip"
    >
      <FontAwesomeIcon
        className="devolucion-pagare__icon"
        icon={faFileCircleInfo}
        style={{ width: '1em' }}
        size="lg"
      />
    </Tooltip>
  );
};

export default DevolucionPagare;
