import { Tooltip } from '@shared/components/Legacy/Tooltip';

import '@shared/styles/app-theme/templates/estadoEfectoFinanciacionTemplate.scss';

interface Props {
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
}

const EstadoFinanciacionTemplate = ({
  estadoFinanciacionId,
  estadoFinanciacionNombre,
}: Props) => {
  return (
    <Tooltip content={estadoFinanciacionNombre}>
      <div
        className={`ellipsis estado-efecto-financiacion-${estadoFinanciacionId}`}
      >
        {estadoFinanciacionNombre}
      </div>
    </Tooltip>
  );
};

export default EstadoFinanciacionTemplate;
