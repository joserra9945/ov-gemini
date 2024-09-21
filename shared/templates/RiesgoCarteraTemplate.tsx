import { useRef } from 'react';

import { Tooltip } from '@shared/components/Tooltip';
import { formatCurrency } from '@shared/utils/formatters';

import { IRiesgoCarteraTemplate } from './interfaces';

const RiesgoCarteraTemplate = ({
  className = '',
  importe,
  setRiesgoSelected,
  rowData,
  setTipoRiesgoSelected,
  tipoRiesgo,
  setOpenModal,
}: IRiesgoCarteraTemplate) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Tooltip content={formatCurrency(importe) || '-'}>
      <div
        ref={divRef}
        className={`ellipsis ${importe ? 'text-info hover:underline' : ''}`}
      >
        {importe !== 0 ? (
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              setRiesgoSelected(rowData);
              setTipoRiesgoSelected(tipoRiesgo);
              setOpenModal(true);
            }}
            className={className}
          >
            {formatCurrency(importe) || '-'}
          </span>
        ) : (
          <span>{formatCurrency(importe) || '-'}</span>
        )}
      </div>
    </Tooltip>
  );
};

export default RiesgoCarteraTemplate;
