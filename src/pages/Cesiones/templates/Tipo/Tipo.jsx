import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const Tipo = ({ tipo = '' }) => {
  const id = nanoid();
  return (
    <>
      <Tooltip target={`.tipo-${id}`} mouseTrack mouseTrackLeft={10} />
      <div
        data-pr-tooltip={tipo?.description || ''}
        className={`ellipsis tipo-${id}`}
      >
        {tipo?.description || ''}
      </div>
    </>
  );
};

export default Tipo;
