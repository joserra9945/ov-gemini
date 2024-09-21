import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

const MotivoTemplate = (rowData) => {
  const motivoRechazo = rowData?.motivoRechazo;
  const id = nanoid();

  return (
    <>
      <Tooltip
        style={{ fontSize: '1rem' }}
        target={
          motivoRechazo
            ? `.error-documento-${id}`
            : `.pendiente-documento-${id}`
        }
        mouseTrack
        mouseTrackLeft={10}
      />
      {motivoRechazo ? (
        <div
          className={`error-documento error-documento-${id}`}
          data-pr-tooltip={`Rechazado por: ${motivoRechazo?.replace(
            /,/g,
            ', '
          )}`}
        >
          <div className="ellipsis">{`Rechazado por: ${motivoRechazo?.replace(
            /,/g,
            ', '
          )}`}</div>
        </div>
      ) : (
        <div
          className={`pendiente-documento pendiente-documento-${id}`}
          data-pr-tooltip={
            rowData.pendienteValidar
              ? 'Pendiente de validar'
              : 'Pendiente de subirlo'
          }
        >
          <div className="ellipsis">
            {rowData.pendienteValidar
              ? 'Pendiente de validar'
              : 'Pendiente de subirlo'}
          </div>
        </div>
      )}
    </>
  );
};

export default MotivoTemplate;
