import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IFormasContacto } from '@shared/interfaces/Legacy/IFormasContacto';

const TipoNotificaciones = ({ etiquetas }: IFormasContacto): JSX.Element => {
  const tipoNotificaciones = etiquetas
    ?.map((etiqueta) => etiqueta.description)
    .join(', ');
  return (
    <Tooltip content={tipoNotificaciones || ''}>
      <div className="ellipsis">{tipoNotificaciones || ''}</div>
    </Tooltip>
  );
};

export default TipoNotificaciones;
