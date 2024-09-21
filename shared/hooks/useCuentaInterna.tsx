import { useCallback } from 'react';

import {
  ICuentaInternaGetG,
  ICuentaInternaGetGP,
  ICuentaInternaIdGet,
  ICuentaInternaIdGetP,
} from '@shared/interfaces/api/ICuentaInterna';
import notifications from '@shared/utils/notifications';

import { cuentaInterna } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useCuentaInterna = () => {
  const { get: getCuentaInterna } = useFetch(cuentaInterna);
  const { newCancelToken } = useCancelToken();
  const cuentaInternaGet = useCallback(async (): ICuentaInternaGetGP => {
    let res;
    try {
      res = await getCuentaInterna<ICuentaInternaGetG>('', {
        cancelToken: newCancelToken(),
      });
    } catch (e) {
      notifications.unknownError(e);
      console.error(e);
    }
    return res || ({} as ICuentaInternaGetGP);
  }, [getCuentaInterna, newCancelToken]);

  const cuentaInternaByEmpresaIdGet = useCallback(
    async (empresaId: string): ICuentaInternaGetGP => {
      const query = `/by-empresa-id/${empresaId}`;
      let res;
      try {
        res = await getCuentaInterna<ICuentaInternaGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaInternaGetGP);
    },
    [getCuentaInterna]
  );

  const cuentaInternaIdGet = useCallback(
    async (id: string): ICuentaInternaIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await getCuentaInterna<ICuentaInternaIdGet>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaInternaIdGet);
    },
    [getCuentaInterna]
  );

  return { cuentaInternaGet, cuentaInternaByEmpresaIdGet, cuentaInternaIdGet };
};

export default useCuentaInterna;
