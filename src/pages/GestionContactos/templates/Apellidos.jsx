import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const Apellidos = ({ apellidos }) => {
  const id = nanoid();

  return (
    <>
      <Tooltip target={`.apellidos-${id}`} mouseTrack mouseTrackLeft={10} />
      <span
        className={`apellidos-${id} ellipsis`}
        data-pr-tooltip={apellidos || ''}
      >
        {apellidos || ''}
      </span>
    </>
  );
};

export default Apellidos;
