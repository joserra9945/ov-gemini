import {
  deniedEffect,
  estadoFinanciacionCliente,
} from '@shared/utils/constants';
import { changePerdidaString } from '@shared/utils/formatters';

const EstadoBodyTemplate = ({
  estadoEfectoClienteId,
  estadoEfectoClienteNombre,
  estadoFinanciacionId,
  estadoFinanciacionNombre,
}) => {
  return (
    <>
      <span className="p-column-title">Estado</span>
      <div
        className={`estado-efecto-format-${
          deniedEffect.includes(estadoFinanciacionId)
            ? estadoFinanciacionCliente.PERDIDO
            : estadoEfectoClienteId
        }`}
        style={{ display: 'block' }}
      >
        {deniedEffect.includes(estadoFinanciacionId)
          ? changePerdidaString(estadoFinanciacionNombre)
          : estadoEfectoClienteId
          ? changePerdidaString(estadoEfectoClienteNombre)
          : 'Sin estado'}
      </div>
    </>
  );
};

export default EstadoBodyTemplate;
