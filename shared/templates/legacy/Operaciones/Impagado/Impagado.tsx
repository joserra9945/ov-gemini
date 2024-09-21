import { faCalendarClock } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOnRowFunctionalComponent } from '@shared/templates/interfaces';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Impagado = ({ rowData }: IOnRowFunctionalComponent) => (
  <Tooltip content={rowData?.impago?.fecha ? 'Efecto impagado' : ''}>
    <FontAwesomeIcon
      color={rowData?.impago?.fecha ? '' : 'lightgrey'}
      icon={faCalendarClock}
      size="1x"
    />
  </Tooltip>
);

export default Impagado;
