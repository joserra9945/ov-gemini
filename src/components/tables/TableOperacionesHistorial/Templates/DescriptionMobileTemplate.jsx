import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import { estadosOperaciones } from '@shared/utils/constants';
import { formatCurrency } from '@shared/utils/formatters';

import './template-styles.scss';

const DescriptionMobileTemplate = ({
  numero,
  estado,
  estadoNombre,
  importeNominal,
}) => {
  const id = nanoid();

  return (
    <div className="description-mobile">
      <div className="numero-operacion--container bolder">
        <Tooltip
          target={`.numero-operacion-${id}`}
          mouseTrack
          mouseTrackLeft={10}
        />
        <span
          className={`numero-operacion-${id}`}
          data-pr-tooltip={numero || ''}
        >
          {numero ? <span>Nº de operación: {numero}</span> : ''}
        </span>
      </div>
      <div className="summary-operation">
        <span className={`estado-operacion-cliente-format-${estado}--mobile `}>
          {estado === estadosOperaciones.PERDIDA
            ? 'No financiada'
            : estadoNombre || 'Sin estado'}
        </span>
        <span className="currency">{formatCurrency(importeNominal || '')}</span>
      </div>
    </div>
  );
};

export default DescriptionMobileTemplate;
