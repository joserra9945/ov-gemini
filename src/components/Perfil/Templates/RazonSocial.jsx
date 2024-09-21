import React from 'react';
import { Tooltip } from 'primereact/tooltip';

const RazonSocial = ({ razonSocial }) => {
  return (
    <>
      <Tooltip target=".razonSocial" mouseTrack mouseTrackLeft={10} />
      <div
        className="razonSocial"
        style={{ textAlign: 'left' }}
        data-pr-tooltip={razonSocial || ''}
      >
        <div className="ellipsis">{razonSocial}</div>
      </div>
    </>
  );
};

export default RazonSocial;
