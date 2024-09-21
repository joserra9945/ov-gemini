import { useCallback } from 'react';

import {
  IPrestamoIdAmortizacionesGetG,
  IPrestamoIdAmortizacionesGetGP,
  IPrestamoIdGet,
  IPrestamoIdGetP,
  IPrestamoPost,
  IPrestamoPut,
} from '@shared/interfaces/IPrestamo';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { prestamo } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const usePrestamo = () => {
  const { get, post, put, loading } = useFetch(prestamo);

  const { newCancelToken } = useCancelToken();

  const prestamoIdGet = useCallback(
    async (id: string): IPrestamoIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await get<IPrestamoIdGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPrestamoIdGet);
    },
    [get, newCancelToken]
  );

  const prestamoPost = useCallback(
    async (body: IPrestamoPost): Promise<boolean> => {
      let res;
      try {
        res = await post('', body);
        res &&
          notifications.success({
            body: 'Se ha creado el préstamo correctamente',
          });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [post]
  );

  const prestamoGenerarContratoPut = useCallback(
    async (id: string) => {
      const query = '/generar-contrato';
      let res;
      try {
        res = await put(query, { id });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const prestamoIdAmortizacionesGet = useCallback(
    async (id: string, qS: IQueryReducer): IPrestamoIdAmortizacionesGetGP => {
      const query = queryFixer(`${id}/amortizaciones`, qS);
      let res;
      try {
        res = await get<IPrestamoIdAmortizacionesGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPrestamoIdAmortizacionesGetG);
    },
    [get, newCancelToken]
  );

  const prestamoPut = useCallback(
    async (body: IPrestamoPut): Promise<boolean> => {
      let res;
      try {
        res = await put('', body);
        res &&
          notifications.success({
            body: 'Se ha modificado el préstamo correctamente',
          });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const prestamoIdBorradorContratoGet = useCallback(
    async (id: string) => {
      const query = `/${id}/borrador-contrato`;
      let res;
      try {
        res = await get<Blob>(query, {
          responseType: 'blob',
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [get]
  );

  return {
    prestamoIdGet,
    prestamoPost,
    prestamoGenerarContratoPut,
    prestamoIdBorradorContratoGet,
    prestamoIdAmortizacionesGet,
    prestamoPut,
    loading,
  };
};

export default usePrestamo;
