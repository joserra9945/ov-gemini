import { destinoPagos } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { ICuentaDestino } from '@shared/interfaces/Legacy/ICuenta/ICuentaDestino';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

type EntidadBancariaTemplateProps = {
  cuentaDestino: ICuentaDestino;
  destino: IEnum;
};
const EntidadBancariaTemplate = ({
  cuentaDestino,
  destino,
}: EntidadBancariaTemplateProps): JSX.Element => {
  const res =
    cuentaDestino?.entidadBancariaIban && destino?.id === destinoPagos.CLIENTE
      ? `${cuentaDestino?.entidadBancariaIban} - `
      : '';
  const descripcion =
    destino?.id === destinoPagos.CLIENTE
      ? cuentaDestino?.entidadBancariaNombre || ''
      : destino?.description || '';

  return (
    <Tooltip classNameTrigger="ellipsis" content={`${res} ${descripcion}`}>
      <span className="tipo__documento">{`${res} ${descripcion}`}</span>
    </Tooltip>
  );
};

export default EntidadBancariaTemplate;
