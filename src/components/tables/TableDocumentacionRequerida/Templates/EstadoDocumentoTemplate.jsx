import { nanoid } from 'nanoid';

import { changePerdidaString } from '@shared/utils/formatters';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const getProperty = (data) => {
  // Si es DNI tenemos que devolver si es anverso o reverso
  if (data === undefined) return '';

  if (!data.pendiente)
    return `${changePerdidaString(
      data.documentoRequeridoestadoEfectoClienteNombre
    )} `;
  return 'Pendiente';
};

const getClass = (rowData) => {
  if (rowData === undefined) return;
  const { tipoDocumentoId } = rowData;
  if (tipoDocumentoId === 0) return 'error-documento';
  return 'pendiente-documento';
};

const EstadoDocumentoTemplate = (rowData) => {
  const id = nanoid();

  return (
    <Tooltip
      content={
        changePerdidaString(
          rowData.documentoRequeridoestadoEfectoClienteNombre
        ) || ''
      }
    >
      <div className={`${getClass(rowData)} estadoNombre-${id}`}>
        <div className="estado-format-inner-box">{getProperty(rowData)}</div>
      </div>
    </Tooltip>
  );
};
export default EstadoDocumentoTemplate;
