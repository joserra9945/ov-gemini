import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import FacturasService from 'utils/services/facturas-service';
import PagaresService from 'utils/services/pagare-service';

import { tipoDocumentoString } from '@shared/utils/constants';

import { Button } from '@shared/components/Legacy/Button';

import FacturaForm from 'components/forms/FacturaForm';
import PagareForm from 'components/forms/PagareForm';

const facturasService = new FacturasService();
const pagaresService = new PagaresService();

const EfectoForm = ({ tipoEfecto, efectoId }) => {
  const navigate = useNavigate();
  const [, setData] = useState([]);
  const [factura, setFactura] = useState({});
  const [pagare, setPagare] = useState({});
  const rhForm = useForm({ mode: 'onBlur' });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getTipoPagare = (pagare) => {
    if (!pagare) {
      return 'PAGOR';
    }
    if (pagare.esALaOrden && pagare.esTruncable) {
      return 'PAGOR';
    }
    if (!pagare.esALaOrden && pagare.esTruncable) {
      return 'PAGNO';
    }
    if (pagare.esALaOrden && !pagare.esTruncable) {
      return 'PAGOT';
    }
    if (!pagare.esALaOrden && !pagare.esTruncable) {
      return 'PAGNT';
    }
  };

  const isFactura = [
    +tipoDocumentoString.FACTURA,
    tipoDocumentoString.FACTURA_PAGARE,
  ].includes(tipoEfecto);
  const isPagare = tipoEfecto === +tipoDocumentoString.PAGARE;

  useEffect(() => {
    console.error(tipoEfecto, efectoId);
  }, [tipoEfecto, efectoId]);

  useEffect(() => {
    if (isFactura) {
      const getFactura = async () => {
        const res = await facturasService.getFacturaById(efectoId);
        if (res) {
          const newFactura = {
            id: efectoId,
            libradoCif: res.libradoCif || '',
            libradoRazonSocial: res.libradoRazonSocial || '',
            numero: res.numero || '',
            importeNominal: res.importeNominal || '',
            fechaEmision: res.fechaEmision ? new Date(res.fechaEmision) : '',
            fechaVencimiento: res.fechaVencimiento
              ? new Date(res.fechaVencimiento)
              : '',
            files: [],
          };
          setFactura(newFactura);
          setData([
            {
              id: 0,
              file: '',
              factura: newFactura,
            },
          ]);
        }
      };
      getFactura();
    } else if (isPagare) {
      const getPagare = async () => {
        const res = await pagaresService.getPagareById(efectoId);
        if (res) {
          const newPagare = {
            id: efectoId,
            libradoCif: res.libradoCif,
            libradoRazonSocial: res.libradoRazonSocial,
            numero: res.numero || '',
            importeNominal: res.importeNominal || '',
            lugarEmision: res.lugarEmision,
            tipo: getTipoPagare(res),
            fechaEmision: res.fechaEmision ? new Date(res.fechaEmision) : '',
            fechaVencimiento: res.fechaVencimiento
              ? new Date(res.fechaVencimiento)
              : '',
            files: [],
            facturas: '',
            operacionId: res.operacionId,
          };

          setPagare(newPagare);
          setData([
            {
              id: 0,
              file: '',
              pagare: newPagare,
            },
          ]);
        }
      };
      getPagare();
    }
  }, [efectoId, tipoEfecto, isFactura, isPagare]);

  if (!factura && !pagare)
    return (
      <div
        style={{ minHeight: '560px' }}
        className="d-flex justify-content-center align-items-center"
      >
        <ProgressSpinner />
      </div>
    );

  return (
    <div className="detalle-efecto edit-effect__container ">
      {isFactura && (
        <FacturaForm
          factura={factura}
          setFactura={setFactura}
          isEditing
          isDisabled
          showTitle={false}
          showDropdown={false}
          rhForm={rhForm}
          showButtonPagare={false}
          showFechaVencimiento={false}
        />
      )}
      {isPagare && (
        <PagareForm
          pagare={pagare}
          setPagare={setPagare}
          isEditing
          isDisabled
          showTitle={false}
          showDropdown={false}
          rhForm={rhForm}
        />
      )}
      <div className="detalle-efecto__button">
        <Button
          className="w-100"
          onClick={() =>
            navigate(
              `/efecto/${
                isFactura
                  ? tipoDocumentoString.FACTURA
                  : tipoDocumentoString.PAGARE
              }/${efectoId}`
            )
          }
          label="Editar"
        />
      </div>
    </div>
  );
};

export default EfectoForm;
