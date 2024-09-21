import { useCallback } from 'react';

import {
  ICesionERPGetG,
  ICesionERPGetGP,
} from '@shared/interfaces/api/ICesionErp';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { cesionERP } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useCesionERP = () => {
  const { newCancelToken } = useCancelToken();

  const { get: getCesionERP } = useFetch(cesionERP);

  const downloadFicheroCesionERP = useCallback(
    async (id: string) => {
      const query = `/${id}/documento-firmado`;
      try {
        const res = await getCesionERP<Blob>(query, { responseType: 'blob' });
        if (res) {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(res);
          a.download = `Documento de evidencias.pdf`;
          a.click();
        }
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [getCesionERP]
  );

  const cesionERPDocumentoFirmadoGet = useCallback(
    async (id: string) => {
      const query = `/${id}/documento-firmado`;
      let res;
      try {
        res = await getCesionERP<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [getCesionERP, newCancelToken]
  );

  const cesionERPGet = useCallback(
    async (params: object): ICesionERPGetGP => {
      const query = '';
      let res;
      try {
        res = await getCesionERP<ICesionERPGetG>(query, {
          cancelToken: newCancelToken(),
          ...params,
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionERPGetGP);
    },
    [getCesionERP, newCancelToken]
  );

  return {
    cesionERPDocumentoFirmadoGet,
    downloadFicheroCesionERP,
    cesionERPGet,
  };
};

export { useCesionERP };
