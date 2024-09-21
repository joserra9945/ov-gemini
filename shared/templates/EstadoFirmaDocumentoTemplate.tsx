import { IDocumento } from '@shared/interfaces/IDocumento/IDocumento';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EstadoFirmaDocumentoTemplate = ({ estadoFirma }: IDocumento) => {
  return (
    <Tooltip content={estadoFirma?.description || ''}>
      <div
        className={`flex estado-firma-documento-${estadoFirma?.id} ellipsis justify-center`}
      >
        {estadoFirma?.description !== 'No aplica'
          ? estadoFirma?.description
          : '-'}
      </div>
    </Tooltip>
  );
};

export default EstadoFirmaDocumentoTemplate;
