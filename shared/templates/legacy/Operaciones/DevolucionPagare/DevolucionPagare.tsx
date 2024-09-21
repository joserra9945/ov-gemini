import { faFileCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOnRowFunctionalComponent } from '@shared/templates/interfaces';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './devolucionPagare.scss';

const DevolucionPagare = ({ rowData }: IOnRowFunctionalComponent) => {
  return (
    <Tooltip
      content={rowData?.tieneDevolucion ? 'Tiene devolución' : ''}
      classNameTrigger="ellipsis informacion-documento__tooltip"
    >
      <FontAwesomeIcon
        color={rowData?.tieneDevolucion ? '' : 'lightgrey'}
        icon={faFileCircleInfo}
        size="1x"
      />
    </Tooltip>
  );
};

export default DevolucionPagare;
