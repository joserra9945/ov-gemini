import React from 'react';

import { estadosRevisionDocumentos } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

import './templates.scss';

const EstadoDNI = (persona) => {
  const { representante, id } = persona;

  const estado = representante?.estadoDni?.description
    ? representante?.estadoDni?.description
    : '';

  const motivoRechazo =
    representante?.descripcionEstadoDni &&
    representante?.descripcionEstadoDni.includes('Documento rechazado');

  const description = !representante?.descripcionEstadoDni
    ? ''
    : motivoRechazo
    ? `${representante?.descripcionEstadoDni}`
    : `: ${representante?.descripcionEstadoDni}`;

  return (
    <Tooltip
      content={`${!motivoRechazo ? estado : ''} ${description}`}
      classNameTrigger="ellipsis estado-dni"
    >
      <div
        className={`estado-tooltip-${id} estado-contacto-${
          !motivoRechazo
            ? representante?.estadoDni?.id
            : estadosRevisionDocumentos.Rechazado
        } ellipsis`}
      >
        {`${!motivoRechazo ? estado : ''} ${description}`}
      </div>
    </Tooltip>
  );
};

export default EstadoDNI;
