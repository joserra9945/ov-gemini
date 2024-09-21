import { Tooltip } from 'primereact/tooltip';

import { OperacionVerificada } from '@shared/utils/constants';

const EfectoVerificadoTemplate = ({ aceptado }: { aceptado: boolean }) => {
  const cesionValue =
    aceptado === OperacionVerificada.ACEPTADA ? 'Aceptada' : 'Pendiente';
  return (
    <>
      <Tooltip
        target={`efecto-verificado-${aceptado}`}
        mouseTrack
        mouseTrackLeft={10}
      />
      <div
        className={`efecto-verificado-${aceptado}`}
        data-pr-tooltip={cesionValue}
      >
        <div className="ellipsis">{cesionValue}</div>
      </div>
    </>
  );
};

export default EfectoVerificadoTemplate;
