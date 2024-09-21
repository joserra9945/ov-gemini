import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import { formatDateCalendar } from '@shared/utils/formatters';

const getProperty = (data) => {
  if (data === undefined || !(data.fechaRequerimiento || data.creationTime))
    return '';
  return `${formatDateCalendar(data.fechaRequerimiento || data.creationTime)} `;
};

const FechaModificacionTemplate = (rowData) => {
  const id = nanoid();

  return (
    <>
      <Tooltip
        target={`.fechaRequerimiento-${id}`}
        mouseTrack
        mouseTrackLeft={10}
      />
      <span
        className={`fechaRequerimiento-${id}`}
        data-pr-tooltip={getProperty(rowData)}
      >
        {getProperty(rowData)}
      </span>
    </>
  );
};

export default FechaModificacionTemplate;
