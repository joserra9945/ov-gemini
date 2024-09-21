import { useCallback } from 'react';

import {
  ICuentaClienteIdMovimientoGetG,
  ICuentaClienteIdMovimientoGetGP,
} from '@shared/interfaces/api/ICuentaCliente';
import {
  ICuentaClienteGetG,
  ICuentaClienteGetGP,
} from '@shared/interfaces/api/ICuentaCliente/ICuentaClienteGet';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { cuentaCliente } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useCuentaCliente = () => {
  const { newCancelToken } = useCancelToken();

  const { get: getCuentaCliente, loading } = useFetch(cuentaCliente);

  const cuentaClienteGet = useCallback(
    async (
      empresaInternaId: string,
      libradorId: string
    ): ICuentaClienteGetGP => {
      const query = `?EmpresaInternaIds=${empresaInternaId}&LibradorId=${libradorId}`;
      let res;
      try {
        res = await getCuentaCliente<ICuentaClienteGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICuentaClienteGetG);
    },
    [getCuentaCliente]
  );

  const cuentaClienteIdMovimientosGet = useCallback(
    async (
      id: string,
      queryState: IQueryReducer
    ): ICuentaClienteIdMovimientoGetGP => {
      const query = queryFixer(`${id}/movimientos`, queryState);
      let res;
      try {
        res = await getCuentaCliente<ICuentaClienteIdMovimientoGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaClienteIdMovimientoGetG);
    },
    [getCuentaCliente, newCancelToken]
  );

  const cuentaClienteIdMovimientosByFiltersGet = useCallback(
    async (
      id: string,
      queryState: IQueryReducer
    ): ICuentaClienteIdMovimientoGetGP => {
      const query = queryFixer(`${id}/movimientos/by-filters`, queryState);
      let res;
      try {
        res = await getCuentaCliente<ICuentaClienteIdMovimientoGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaClienteIdMovimientoGetG);
    },
    [getCuentaCliente, newCancelToken]
  );

  return {
    cuentaClienteIdMovimientosGet,
    cuentaClienteIdMovimientosByFiltersGet,
    cuentaClienteGet,
    loading,
  };
};

export default useCuentaCliente;
