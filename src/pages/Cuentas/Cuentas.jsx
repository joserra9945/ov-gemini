import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useCuentaExterna from '@shared/hooks/useCuentaExterna';

import TableCuentas from 'components/tables/TableCuentas';

import './cuentas.scss';

const Cuentas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cuentas, setCuentas] = useState([]);
  const { libradorId } = useSelector((store) => store.userState);

  const { cuentaExternaGet } = useCuentaExterna();

  const fetchCuentas = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await cuentaExternaGet(libradorId);
      setCuentas(res);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }, [cuentaExternaGet, libradorId]);

  useEffect(() => {
    fetchCuentas();
  }, [fetchCuentas]);

  return (
    <TableCuentas
      data={cuentas}
      fetchCuentas={fetchCuentas}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default Cuentas;
