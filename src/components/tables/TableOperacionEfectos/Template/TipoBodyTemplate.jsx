import React from 'react';

const TipoBodyTemplate = ({ tipo }) => {
  return (
    <>
      <span className="p-column-title">Tipo</span>
      <div>{tipo?.description || ''}</div>
    </>
  );
};

export default TipoBodyTemplate;
