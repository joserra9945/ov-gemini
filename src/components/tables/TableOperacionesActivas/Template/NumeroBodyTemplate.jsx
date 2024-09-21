import React from 'react';

const NumeroBodyTemplate = ({ numero }) => {
  return (
    <>
      <span className="p-column-title">Nº de Operación</span>
      <div>{numero || ''}</div>
    </>
  );
};

export default NumeroBodyTemplate;
