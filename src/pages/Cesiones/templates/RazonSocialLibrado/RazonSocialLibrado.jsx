import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const RazonSocialLibrado = ({ librado = '' }) => {
  const id = nanoid();
  return (
    <>
      <Tooltip
        target={`.razon-social--librado-${id}`}
        mouseTrack
        mouseTrackLeft={10}
      />
      <div
        data-pr-tooltip={librado?.razonSocial}
        className={`ellipsis razon-social--librado-${id}`}
      >
        {librado?.razonSocial}
      </div>
    </>
  );
};

export default RazonSocialLibrado;
