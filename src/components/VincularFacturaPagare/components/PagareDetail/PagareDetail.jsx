import React from 'react';

import { formatCurrency, formatDateCalendar } from '@shared/utils/formatters';

import './pagareDetail.scss';

const PagareDetail = ({ data }) => {
  return (
    <div className="pagare-detail__container">
      <div className="grid-container">
        <div className="grid-item header">FECHA DE VENCIMIENTO</div>
        <div className="grid-item header">ESTADO</div>
        <div className="grid-item header">IMPORTE</div>
        <div className="grid-item detail">
          {formatDateCalendar(data?.fechaVencimiento)}
        </div>
        <div className="grid-item detail estado">
          <span>{data?.estadoRevisionNombre}</span>
        </div>
        <div className="grid-item detail">
          {formatCurrency(data?.importeNominal)}
        </div>
      </div>
    </div>
  );
};

export default PagareDetail;
