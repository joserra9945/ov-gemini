import { nanoid } from 'nanoid';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Estado = (rowData) => {
  const id = nanoid();

  return (
    <Tooltip
      content={
        rowData?.estadoRevisionDescripcion ||
        rowData?.estadoRevision?.description
      }
    >
      <div
        className={`estado-documento-cesion-${id} estado-documento-revision-${
          rowData?.estadoRevisionId || rowData?.estadoRevision?.id
        } ellipsis`}
      >
        {rowData?.estadoRevisionNombre ||
          rowData?.estadoRevision?.description ||
          'Sin estado'}
      </div>
    </Tooltip>
  );
};

export default Estado;
