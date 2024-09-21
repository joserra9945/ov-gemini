import React from 'react';

import { formatCurrency } from '@shared/utils/formatters';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './importe.scss';

const Importe = ({ importeNominal }) => {
  const importe = formatCurrency(importeNominal);
  return (
    <div className="importe-efecto__container">
      <Tooltip content={importe}>
        <span className="importe-efecto__value ellipsis">{importe}</span>
      </Tooltip>
    </div>
  );
};

export default Importe;
