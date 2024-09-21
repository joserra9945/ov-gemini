import React from 'react';
import { Tooltip } from 'primereact/tooltip';

const Cif = ({ cif }) => {
  return (
    <>
      <Tooltip target=".cif" mouseTrack mouseTrackLeft={10} />
      <div
        className="cif"
        style={{ textAlign: 'left' }}
        data-pr-tooltip={cif || ''}
      >
        <div className="ellipsis">{cif}</div>
      </div>
    </>
  );
};

export default Cif;
