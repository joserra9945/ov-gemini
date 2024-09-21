import React from 'react';

import { formatDateCalendar } from '@shared/utils/formatters';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './fechaEmision.scss';

const FechaEmision = ({ fechaEmision }) => {
  const fecha = formatDateCalendar(fechaEmision);
  return (
    <div className="fecha-emision-efecto__container">
      <Tooltip content={fecha}>
        <span className="fecha-emision-efecto__value ellipsis">{fecha}</span>
      </Tooltip>
    </div>
  );
};

export default FechaEmision;
