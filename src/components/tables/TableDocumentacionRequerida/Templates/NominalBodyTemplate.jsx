import React from 'react';

const NominalBodyTemplate = ({ importeNominal }) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  return (
    <>
      <span className="p-column-title">Nominal</span>
      <div style={{ textAlign: 'right' }}>
        {formatter.format(importeNominal || '')}
      </div>
    </>
  );
};

export default NominalBodyTemplate;