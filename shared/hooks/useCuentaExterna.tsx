import { useCallback } from 'react';

import {
  ICuentaExternaByEmpresaIdGetG,
  ICuentaExternaByEmpresaIdGetGP,
  ICuentaExternaByFiltersGetG,
  ICuentaExternaByFiltersGetGP,
  ICuentaExternaGetG,
  ICuentaExternaGetGP,
} from '@shared/interfaces/api/ICuentaExterna';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { cuentaExterna } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useCuentaExterna = () => {
  const {
    get: getCuentaExterna,
    put: putCuentaExterna,
    loading,
  } = useFetch(cuentaExterna);

  const { newCancelToken } = useCancelToken();

  const cuentaExternaGet = useCallback(async (): ICuentaExternaGetGP => {
    let res;
    const query = `/by-empresa-activa`;
    try {
      res = await getCuentaExterna<ICuentaExternaGetG>(query, {
        cancelToken: newCancelToken(),
      });
    } catch (e) {
      notifications.unknownError(e);
      console.error(e);
    }
    return res || ({} as ICuentaExternaGetGP);
  }, [getCuentaExterna, newCancelToken]);

  const desactivarCuentaExternaById = useCallback(
    async (id: string, activa: boolean): ICuentaExternaGetGP => {
      let res;
      const data = {
        id,
        activa,
      };
      const query = `/activa`;
      try {
        res = await putCuentaExterna<ICuentaExternaGetG>(query, data, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICuentaExternaGetGP);
    },
    [newCancelToken, putCuentaExterna]
  );

  const cuentaExternaByFiltersGet = useCallback(
    async (params: string): ICuentaExternaByFiltersGetGP => {
      const query = `/by-filters${params}`;
      let res;
      try {
        res = await getCuentaExterna<ICuentaExternaByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaExternaByFiltersGetGP);
    },
    [getCuentaExterna, newCancelToken]
  );
  const cuentaExternaByEmpresaIdGet = useCallback(
    async (
      id: string,
      params: IQueryReducer
    ): ICuentaExternaByEmpresaIdGetGP => {
      const query = queryFixer(`by-empresa-id/${id}`, params);
      let res;
      try {
        res = await getCuentaExterna<ICuentaExternaByEmpresaIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICuentaExternaByEmpresaIdGetG);
    },
    [getCuentaExterna, newCancelToken]
  );

  return {
    loading,
    cuentaExternaGet,
    desactivarCuentaExternaById,
    cuentaExternaByFiltersGet,
    cuentaExternaByEmpresaIdGet,
  };
};

export default useCuentaExterna;
