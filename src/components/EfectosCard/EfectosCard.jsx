import { faDownload, faEye } from '@fortawesome/pro-light-svg-icons';

import {
  changePerdidaString,
  formatCurrency,
  formatDateCalendar,
} from '@shared/utils/formatters';

import { Button } from '@shared/components/Legacy/Button';

import './style.scss';

const EfectosCard = ({ data, show, download }) => {
  return (
    <div className="card efectos-container">
      <div className="efectos-subheader">
        <h2>{data?.tipoDocumentoNombre}</h2>
        <div className="button-bar">
          <Button
            color="light"
            backgroundColor="white"
            icon={faEye}
            onClick={() => show(data.id, data?.tipoDocumentoId)}
          />
          <Button
            color="light"
            backgroundColor="white"
            icon={faDownload}
            onClick={() => download(data.id, data?.tipoDocumentoNombre)}
          />
        </div>
      </div>
      <div className="efectos-body">
        <div className="efectos-numero">{data?.numero}</div>
        <div className="efectos-rs">{data?.libradoRazonSocial}</div>
        <div className="efectos-table__container">
          <table className="efectos-table">
            <tr className="efectos-table--header">
              <th>FECHA DE EMISIÓN</th>
              <th>FECHA DE VENCIMIENTO</th>
              <th style={{ textAlign: 'center' }}>ESTADO</th>
              <th>IMPORTE</th>
            </tr>
            <tr className="efectos-table--body">
              <td>{formatDateCalendar(data?.fechaEmision)}</td>
              <td>{formatDateCalendar(data?.fechaVencimiento)}</td>
              <td>
                <div
                  style={{ justifyContent: 'center' }}
                  className={`estado-efecto-format-${data?.estadoEfectoClienteId}`}
                >
                  {changePerdidaString(data?.estadoEfectoClienteNombre)}
                </div>
              </td>
              <td>{formatCurrency(data?.importeNominal)}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EfectosCard;
