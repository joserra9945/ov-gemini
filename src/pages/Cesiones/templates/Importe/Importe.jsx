import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import { formatCurrency } from '@shared/utils/formatters';

const Importe = ({ importe = '' }) => {
  const id = nanoid();
  return (
    <>
      <Tooltip target={`.importe-${id}`} mouseTrack mouseTrackLeft={10} />
      <div
        className={`importe-${id}`}
        data-pr-tooltip={formatCurrency(importe)}
      >
        <div className="ellipsis">{formatCurrency(importe)}</div>
      </div>
    </>
  );
};

export default Importe;
