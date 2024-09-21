import React from 'react';
import { nanoid } from 'nanoid';

const OverlayBodyVerificaciones = ({ data }) => {
  const showMotivo = (efecto) => {
    return (
      <div key={efecto.id}>
        <p>
          <span className="label">{efecto?.nombre || 'Efecto:'}</span>
        </p>
        {efecto.motivosRechazo?.length > 0
          ? efecto.motivosRechazo.map((motivo) => {
              return <p key={nanoid()}>{`- ${motivo}`}</p>;
            })
          : 'No hay motivos de rechazo para este efecto.'}
      </div>
    );
  };
  return data?.legth === 0
    ? 'no hay motivos de rechazo'
    : data.map((el) => {
        return showMotivo(el);
      });
};

OverlayBodyVerificaciones.propTypes = {};

export default OverlayBodyVerificaciones;
