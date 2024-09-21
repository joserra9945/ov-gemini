import { estadosRevisionDocumentos } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const MotivoRechazoTemplate = (rowData) => {
  return (
    <Tooltip
      content={
        rowData?.estadoRevisionId === estadosRevisionDocumentos?.Rechazado ||
        rowData?.estadoRevision?.id === estadosRevisionDocumentos?.Rechazado
      }
    >
      {rowData?.estadoRevisionId === estadosRevisionDocumentos?.Rechazado ||
      rowData?.estadoRevision.id === estadosRevisionDocumentos?.Rechazado ? (
        <div className="motivo-rechazo ellipsis">
          {rowData?.estadoRevision.description || rowData?.estadoRevisionNombre}
        </div>
      ) : (
        ''
      )}
    </Tooltip>
  );
};

export default MotivoRechazoTemplate;
