import { renderToString } from 'react-dom/server';
import { nanoid } from 'nanoid';

import { tipoDocumento, tipoDocumentoString } from '@shared/utils/constants';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const getProperty = (data: any) => {
  if (data === undefined) {
    return '';
  }

  switch (data.tipoDocumento?.id) {
    case parseInt(tipoDocumentoString.CONTRATO_CESION, 10):
      return `${data?.tipoDocumentoNombre || data.tipoDocumento?.description} ${
        data.libradoRazonSocial ? `- ${data.libradoRazonSocial}` : ''
      }`;

    case parseInt(tipoDocumentoString.DNI, 10):
      return `DNI ${data?.nombre || ''} ${data?.apellidos || ''} ${
        data?.detalle || ''
      }`;

    case parseInt(
      tipoDocumentoString.ESCRITURA_NOMBRAMIENTO_ADMINISTRADOR_APODERADO,
      10
    ):
      return `Escritura de nombramiento del administrador/apoderado ${
        data?.detalle || ''
      }`;

    case parseInt(tipoDocumentoString.PAGARE, 10):
      if (data.tipo?.id) {
        return `${
          data?.tipoDocumentoNombre ||
          data.tipoDocumento?.description ||
          data.tipo?.description ||
          ''
        } `;
      }
      return `Pagaré ${data?.efecto?.numero || ''}`;

    case parseInt(tipoDocumentoString.TOMA_DE_RAZON, 10):
      return `Toma de razón - ${data?.efecto?.numero || ''}`;

    default:
      return `${
        data?.tipoDocumentoNombre ||
        data.tipoDocumento?.description ||
        data.tipo?.description ||
        ''
      }${data.efecto?.numero ? ` - ${data.efecto?.numero}` : ''}`;
  }
};

const TipoDocumentoTemplate = (rowData: any) => {
  const id = nanoid();
  const text = getProperty(rowData);

  return rowData.tipoDocumento?.id === tipoDocumento.DNI ? (
    <div className={`tipo-${id} `}>
      <div className="flex ellipsis">{text}</div>
    </div>
  ) : (
    <Tooltip
      content={
        typeof text === 'object'
          ? renderToString(text)?.replace(/(<([^>]+)>)/gi, '')
          : text
      }
    >
      <div className={`tipo-${id} `}>
        <div className="flex ellipsis">{text}</div>
      </div>
    </Tooltip>
  );
};

export default TipoDocumentoTemplate;
