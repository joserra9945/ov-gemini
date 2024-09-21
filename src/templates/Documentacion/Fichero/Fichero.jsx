import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const Fichero = (rowData) => {
  const id = nanoid();
  return (
    <>
      <Tooltip
        target={`.tipo-documento-${id}`}
        mouseTrack
        mouseTrackLeft={10}
      />
      <div
        data-pr-tooltip={
          rowData.tipoDocumentoNombre || rowData.tipoDocumento.description
        }
        className={`ellipsis tipo-documento-${id}`}
      >
        {rowData.tipoDocumentoNombre || rowData.tipoDocumento.description}
      </div>
    </>
  );
};

export default Fichero;
