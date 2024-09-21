import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import Estado from 'templates/Documentacion/Estado';
import Fichero from 'templates/Documentacion/Fichero';

const MotivoRechazoTemplate = (rowData) => {
  const id = nanoid();
  return (
    <>
      <Tooltip
        target={`.motivo-rechazo-${id}`}
        mouseTrack
        mouseTrackLeft={10}
      />
      <div
        className={`motivo-rechazo-${id}`}
        data-pr-tooltip={
          rowData?.estadoRevisionDescripcion
            ? rowData?.estadoRevisionDescripcion
            : '-'
        }
      >
        <div className="ellipsis estado-format-inner-box">
          {rowData?.estadoRevisionDescripcion
            ? rowData?.estadoRevisionDescripcion
            : '-'}
        </div>
      </div>
    </>
  );
};

export const tableColumns = [
  {
    id: 'document-viewer__tipo',
    header: 'Tipo',
    body: Fichero,
    style: { flexBasis: '21%', width: '21%' },
  },
  {
    id: 'document-viewer__estado',
    header: 'Estado',
    body: Estado,
    style: { flexBasis: '21%', width: '21%' },
  },
  {
    id: 'document-viewer__motivo-rechazo',
    header: 'Motivo rechazo',
    body: MotivoRechazoTemplate,
    style: { flexBasis: '21%', width: '21%' },
  },
];
