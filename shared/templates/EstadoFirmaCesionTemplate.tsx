import { IDocumentoCesion } from '@shared/interfaces/IDocumento/IDocumento';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EstadoFirmaCesionTemplate = ({ estadoFirma }: IDocumentoCesion) => {
  return (
    <Tooltip content={estadoFirma?.description ?? ''}>
      <div className={`estado-cesion-${estadoFirma?.id} ellipsis`}>
        {estadoFirma?.description ?? '-'}
      </div>
    </Tooltip>
  );
};

export default EstadoFirmaCesionTemplate;
