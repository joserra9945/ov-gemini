import Moment from 'react-moment';

import { changePerdidaString } from '@shared/utils/formatters';

export const numeroBodyTemplate = (rowData) => {
  return (
    <>
      <span className="p-column-title">Nº de Operación</span>
      <div>{rowData.numero ? rowData.numero : '(Sin número)'}</div>
    </>
  );
};

export const productoBodyTemplate = (rowData) => {
  return (
    <>
      <span className="p-column-title">Producto</span>
      <div>
        {rowData.producto?.description ? rowData?.producto?.description : ''}
      </div>
    </>
  );
};

export const fechaBodyTemplate = ({ fechaValor }) => {
  return (
    <>
      <span className="p-column-title">Fecha</span>
      {fechaValor ? (
        <Moment format="DD/MM/YYYY HH:mm" utc>
          {fechaValor}
        </Moment>
      ) : (
        <>-</>
      )}
    </>
  );
};

export const nominalBodyTemplate = (rowData) => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  return (
    <>
      <span className="p-column-title">Nominal</span>
      <div className="operacion-importe">
        {formatter.format(
          rowData?.importeNominal ? rowData.importeNominal : ''
        )}
      </div>
    </>
  );
};

export const estadoBodyTemplate = (rowData) => {
  return (
    <>
      <span className="p-column-title">Estado</span>
      <div
        className={`estado-operacion-cliente-format-${rowData.estado.id}`}
        style={{ display: 'block' }}
      >
        {rowData.estado ? changePerdidaString(rowData.estado.description) : ''}
      </div>
    </>
  );
};
