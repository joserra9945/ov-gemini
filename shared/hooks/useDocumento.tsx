import { useCallback } from 'react';

import notifications from '@shared/utils/notifications';
import { toBase64 } from '@shared/utils/tobase64';

import { documento } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDocumento = () => {
  const { get: getDocumento, loading } = useFetch(documento);
  const { newCancelToken } = useCancelToken();

  const documentoPdfByIdGet = useCallback(
    async (id: string) => {
      let res;
      const query = `/pdf/by-id/${id}`;
      try {
        res = await getDocumento<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return res;
    },
    [getDocumento, newCancelToken]
  );

  const downloadDocumentoPdfByIdGet = useCallback(
    async (id: string, name?: string) => {
      const query = `/pdf/by-id/${id}`;
      try {
        const res = await getDocumento<Blob>(query, { responseType: 'blob' });
        if (res) {
          const pdf64 = await toBase64(res);
          const a = document.createElement('a');
          a.href = pdf64 as string;
          a.download = `${name || id}.pdf`;
          a.click();
        }
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [getDocumento]
  );

  return { documentoPdfByIdGet, downloadDocumentoPdfByIdGet, loading };
};

export default useDocumento;
