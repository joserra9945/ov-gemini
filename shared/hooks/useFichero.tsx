import { useCallback } from 'react';

import notifications from '@shared/utils/notifications';

import { fichero } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useFichero = () => {
  const { get: getFichero, loading } = useFetch(fichero);
  const { newCancelToken } = useCancelToken();

  const ficheroPDFByDocumentoIdGet = useCallback(
    async (documentoId: string) => {
      const query = `/pdf/by-documento-id/${documentoId}`;
      let res;
      try {
        res = await getFichero<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as Blob);
    },
    [getFichero, newCancelToken]
  );

  return {
    ficheroPDFByDocumentoIdGet,
    loading,
  };
};

export default useFichero;
