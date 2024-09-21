import { useCallback } from 'react';

import {
  IPagareERPAceptableGetG,
  IPagareERPAceptableGetGP,
} from '@shared/interfaces/api/IPagareERP';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { pagareERP } from './endpoints';
import { useCancelToken } from './useCancelToken';

const usePagareERP = () => {
  const { newCancelToken } = useCancelToken();
  const { get: getPagareERP } = useFetch(pagareERP);

  const pagareERPDocumentoFirmadoGet = useCallback(
    async (id: string) => {
      const query = `/${id}/documento-firmado`;
      let res;
      try {
        res = await getPagareERP<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [getPagareERP, newCancelToken]
  );

  const pagareERPAceptablesGet = useCallback(
    async (params: object): IPagareERPAceptableGetGP => {
      const query = '/aceptables';
      let res;
      try {
        res = await getPagareERP<IPagareERPAceptableGetG>(query, {
          cancelToken: newCancelToken(),
          ...params,
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IPagareERPAceptableGetGP);
    },
    [getPagareERP, newCancelToken]
  );

  return {
    pagareERPDocumentoFirmadoGet,
    pagareERPAceptablesGet,
  };
};

export { usePagareERP };
