import { formatCurrency } from '@shared/utils/formatters';

import { IPropuestaModificadaTemplate } from './interfaces';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

const PropuestaModificadaTemplate = ({
  importeInicial,
  importeNominal,
}: IPropuestaModificadaTemplate) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#F3F8FB] p-4">
        Importe solicitado de: {formatCurrency(importeInicial)} a{' '}
        <span className="font-bold">{formatCurrency(importeNominal)}</span>
      </div>
      <div>
        <span className="font-bold">Motivo de la modificación:</span> Las
        garantías solicitadas no son suficientes para el importe solicitado.
      </div>
      <div>
        Puede aceptar la propuesta facilitada o subir nuevas garantías para
        mejorar las condiciones de la operación.
      </div>
    </div>
  );
};

export default PropuestaModificadaTemplate;
