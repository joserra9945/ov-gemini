import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const Nombre = ({ nombre }) => {
  const id = nanoid();

  return (
    <>
      <Tooltip target={`.nombre-${id}`} mouseTrack mouseTrackLeft={10} />
      <span className={`nombre-${id}`} data-pr-tooltip={nombre || ''}>
        {nombre || ''}
      </span>
    </>
  );
};

export default Nombre;
