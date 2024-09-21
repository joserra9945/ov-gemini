import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const LibradorBodyTemplate = ({ libradoRazonSocial }) => {
  const id = nanoid();

  return (
    <>
      <span className="p-column-title">Librador</span>
      <Tooltip target={`.deudorId-${id}`} mouseTrack mouseTrackLeft={10} />
      <span
        className={`deudorId-${id} ellipsis`}
        data-pr-tooltip={libradoRazonSocial || ''}
      >
        {libradoRazonSocial || ''}
      </span>
    </>
  );
};

export default LibradorBodyTemplate;
