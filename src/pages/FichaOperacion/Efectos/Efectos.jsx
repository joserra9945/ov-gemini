import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EfectoService from 'utils/services/efectos-service';

import { downloadFileFromBinary } from '@shared/utils/utils';

import EfectosCard from 'components/EfectosCard/EfectosCard';

const efectoService = new EfectoService();

const Efectos = ({ operacionId, estado }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({ items: [] });

  const fetchData = useCallback(async () => {
    const res = await efectoService.getAllEfectoByOperacionId(operacionId);

    if (res) {
      setData(res);
      setLoader(false);
    }
  }, [operacionId]);

  const download = async (id, tipoDocumentoNombre) => {
    const res = await efectoService.getFicheroInPDFById(id);
    if (res) {
      downloadFileFromBinary({ file: res, tipoDocumentoNombre });
    }
  };

  const show = (id, tipoEfecto) =>
    navigate(`/detalle/efecto/${id}/${estado}`, { state: { tipoEfecto } });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      className={`efectos-operacion-container ${
        loader ? 'efectos-operacion-container--loading' : ''
      } w-full`}
    >
      {data.items?.map((el) => {
        return (
          <EfectosCard key={el?.id} data={el} download={download} show={show} />
        );
      })}
    </div>
  );
};

export default Efectos;
