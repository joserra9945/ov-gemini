import { Tooltip } from '@shared/components/Legacy/Tooltip';

import '../styles/app-theme/templates/EstadoDocumento.scss';

interface IDocumentoCirculo {
  tipoDocumentoNombre: string;
  estadoRevisionId: string;
  estadoRevisionNombre: string;
}

const EstadoDocumentoCirculoTemplate = ({
  tipoDocumentoNombre,
  estadoRevisionId,
  estadoRevisionNombre,
}: IDocumentoCirculo) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Tooltip content={estadoRevisionNombre}>
        <div
          className={`w-3 h-3 rounded-full estado-documento-circulo-${estadoRevisionId}`}
        />
      </Tooltip>
      <Tooltip content={tipoDocumentoNombre}>
        <p>{tipoDocumentoNombre}</p>
      </Tooltip>
    </div>
  );
};

export default EstadoDocumentoCirculoTemplate;
