import { faUniversity } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Remesado = ({ rowData }: any) => (
  <Tooltip content={rowData?.fechaUltimoCobro ? 'Efecto remesado' : ''}>
    <FontAwesomeIcon
      color={rowData?.fechaUltimoCobro ? '' : 'lightgrey'}
      icon={faUniversity}
      size="1x"
    />
  </Tooltip>
);

export default Remesado;
