import React from 'react';

const EstadoBodyTemplate = ({ estado }, handleMouseEnter, handleMouseLeave) => {
  return (
    <div
      className="col-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="p-column-title">Estado</span>
      <div
        style={{ width: '100%' }}
        className={`estado-operacion-cliente-format-${estado.id}`}
      >
        <div className="estado-format-inner-box">{estado.description}</div>
      </div>
    </div>
  );
};

export default EstadoBodyTemplate;
