import { useCallback } from 'react';

import {
  IFacturaERPAceptableGetG,
  IFacturaERPAceptableGetGP,
  IFacturaERPByFiltersGetG,
  IFacturaERPByFiltersGetGP,
} from '@shared/interfaces/api/IFacturaERP';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { facturaERP } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useFacturaERP = () => {
  const { newCancelToken } = useCancelToken();
  const { get: getFacturaERP } = useFetch(facturaERP);

  const facturaERPDocumentoFirmadoGet = useCallback(
    async (id: string) => {
      const query = `/${id}/documento-firmado`;
      let res;
      try {
        res = await getFacturaERP<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [getFacturaERP, newCancelToken]
  );

  const facturaERPGeneratePdfGet = useCallback(
    async (id: string) => {
      const query = `/generate-pdf/${id}`;
      let res;
      try {
        res = await getFacturaERP<Blob>(query, {
          cancelToken: newCancelToken(),
          responseType: 'blob',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [getFacturaERP, newCancelToken]
  );

  const facturaERPByFiltersGet = useCallback(
    async (params: object): IFacturaERPByFiltersGetGP => {
      const query = '/by-filters';
      let res;
      try {
        res = await getFacturaERP<IFacturaERPByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
          ...params,
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFacturaERPByFiltersGetGP);
    },
    [getFacturaERP, newCancelToken]
  );

  const facturaERPAceptablesGet = useCallback(
    async (params: object): IFacturaERPAceptableGetGP => {
      const query = '/aceptables';
      let res;
      try {
        res = await getFacturaERP<IFacturaERPAceptableGetG>(query, {
          cancelToken: newCancelToken(),
          ...params,
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFacturaERPAceptableGetGP);
    },
    [getFacturaERP, newCancelToken]
  );

  return {
    facturaERPGeneratePdfGet,
    facturaERPDocumentoFirmadoGet,
    facturaERPByFiltersGet,
    facturaERPAceptablesGet,
  };
};

export { useFacturaERP };
