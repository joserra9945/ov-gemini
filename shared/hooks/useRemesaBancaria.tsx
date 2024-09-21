import { useCallback } from 'react';

import { IRemesaBancariaPost } from '@shared/interfaces/api/IRemesaBancaria';
import notifications from '@shared/utils/notifications';

import { remesaBancaria } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useRemesaBancaria = () => {
  const {
    get: getRemesaBancaria,
    post: postRemesaBancaria,
    put,
    loading,
  } = useFetch(remesaBancaria);
  const { newCancelToken } = useCancelToken();

  const remesaBancariaPdfResumenByIdGet = useCallback(
    async (id: string): Promise<Blob> => {
      let res;

      try {
        const query = `/pdf-resumen/by-id/${id}`;
        res = await getRemesaBancaria<Blob>(query, {
          responseType: 'blob',
          cancelToken: newCancelToken(),
        });
        res &&
          notifications.success({
            body: 'Se ha descargado el documento correctamente',
          });
      } catch (error) {
        notifications.unknownError(error);
      }

      return res || ({} as Promise<Blob>);
    },
    [getRemesaBancaria, newCancelToken]
  );

  const remesaBancariaPost = useCallback(
    async (payload: IRemesaBancariaPost): Promise<string> => {
      let res;
      try {
        res = await postRemesaBancaria<string>(undefined, payload);
        res &&
          notifications.success({
            title: '¡Éxito!',
            body: 'Remesa creada correctamente',
          });
      } catch (error) {
        notifications.unknownError(error);
      }

      return res || '';
    },
    [postRemesaBancaria]
  );

  const remesaBancariaFechaCobroPrevistaPut = useCallback(
    async (body: { id: string; fechaCobroPrevista: Date }) => {
      let res;
      try {
        res = await put('/fecha-cobro-prevista', body);
      } catch (error) {
        notifications.unknownError(error);
      }

      return !!res;
    },
    [put]
  );

  return {
    loading,
    remesaBancariaPdfResumenByIdGet,
    remesaBancariaPost,
    remesaBancariaFechaCobroPrevistaPut,
  };
};

export default useRemesaBancaria;
