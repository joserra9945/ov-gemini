import { useCallback } from 'react';

import {
  ISolicitudDeCompraByCif,
  ISolicitudDeCompraByCifGP,
} from '@shared/interfaces/api/ISolicitudDeCompra';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { solicitudCompraEquifax, solicitudCompraExperia } from './endpoints';

interface Error {
  request: {
    response: string;
  };
}

const useSolicitudDeCompra = () => {
  const { post: postSolicitud, get: getSolicitud } = useFetch(
    solicitudCompraEquifax
  );

  const { post: postSolicitudRAI, get: getSolicitudRAI } = useFetch(
    solicitudCompraExperia
  );

  const solicitudUltimaByCifGet = useCallback(
    async (cif: string): ISolicitudDeCompraByCifGP => {
      let res;
      const query = `/ultima/by-cif/${cif}`;
      try {
        res = await getSolicitud<ISolicitudDeCompraByCif>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ISolicitudDeCompraByCif);
    },
    [getSolicitud]
  );

  const solicitudCompraPost = useCallback(
    async (cif: string) => {
      const query = `/by-cif/${cif}`;
      try {
        await postSolicitud(query);
        notifications.success();
      } catch (e: unknown) {
        notifications.warning({
          body: JSON.parse((e as Error).request.response)?.errors,
        });
      }
    },
    [postSolicitud]
  );

  const solicitudUltimaByCifRAIGet = useCallback(
    async (cif: string): ISolicitudDeCompraByCifGP => {
      let res;
      const query = `/ultima/by-cif/${cif}`;
      try {
        res = await getSolicitudRAI<ISolicitudDeCompraByCif>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ISolicitudDeCompraByCif);
    },
    [getSolicitudRAI]
  );

  const solicitudCompraRAIPost = useCallback(
    async (cif: string) => {
      const query = `/by-cif/${cif}`;
      try {
        await postSolicitudRAI(query);
        notifications.success();
      } catch (e: unknown) {
        notifications.warning({
          body: JSON.parse((e as Error).request.response)?.errors,
        });
      }
    },
    [postSolicitudRAI]
  );

  return {
    solicitudCompraPost,
    solicitudUltimaByCifGet,
    solicitudCompraRAIPost,
    solicitudUltimaByCifRAIGet,
  };
};

export { useSolicitudDeCompra };
