import React from 'react';

import { formatFullDateUTC } from '@shared/utils/formatters';

const FechaBodyTemplate = ({ fechaValor }) => {
  return (
    <>
      <span className="p-column-title">Fecha</span>
      {fechaValor ? (
        <div className="date-moment">{formatFullDateUTC(fechaValor)}</div>
      ) : (
        <>-</>
      )}
    </>
  );
};

export default FechaBodyTemplate;
