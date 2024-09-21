import React from 'react';

import { formatDateCalendar } from '@shared/utils/formatters';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './fechaVencimiento.scss';

const FechaVencimiento = ({ fechaVencimiento }) => {
  const fecha = formatDateCalendar(fechaVencimiento);
  return (
    <div className="fecha-vencimiento-efecto__container">
      <Tooltip content={fecha}>
        <span className="fecha-vencimiento-efecto__value ellipsis">
          {fecha}
        </span>
      </Tooltip>
    </div>
  );
};

export default FechaVencimiento;
