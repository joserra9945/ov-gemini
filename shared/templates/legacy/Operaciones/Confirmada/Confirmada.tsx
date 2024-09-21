import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faHandHoldingDollar } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Confirmada = ({
  confirmado,
  iconSize,
}: {
  confirmado: boolean;
  iconSize: SizeProp;
}) => (
  <Tooltip
    content={confirmado ? 'Efecto confirmado' : ''}
    classNameTrigger="ellipsis"
  >
    <FontAwesomeIcon
      color={confirmado ? '' : 'lightgrey'}
      icon={faHandHoldingDollar}
      size={iconSize}
    />
  </Tooltip>
);

export default Confirmada;
