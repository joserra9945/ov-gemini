import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IDevolucionDePagaresGetByFiltersG,
  IDevolucionDePagaresGetByFiltersGP,
} from '@shared/interfaces/api/IDevolucionDePagares';
import { useFetch } from '@shared/utils';
import Notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { devolucionPagare } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useDevolucionDePagares = () => {
  const {
    get: getDevolucionPagares,
    post: postDevolucionDePagares,
    put: putDevolucionDePagaresConfirmar,
    remove: deleteDevolucionDePagares,
  } = useFetch(devolucionPagare);
  const { newCancelToken } = useCancelToken();

  const devolucionPagaresByFiltersGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): IDevolucionDePagaresGetByFiltersGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-filters${params}`, queryState);
        let res;
        try {
          res = await getDevolucionPagares<IDevolucionDePagaresGetByFiltersG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
        } catch (err) {
          Notifications.unknownError(err);
        }
        return res || ({} as IDevolucionDePagaresGetByFiltersGP);
      }
      return {} as IDevolucionDePagaresGetByFiltersGP;
    },
    [getDevolucionPagares, newCancelToken]
  );

  const devolucionPagaresPost = useCallback(
    async (pagareIds: string[], representanteIds: string[]) => {
      let res;
      try {
        res = await postDevolucionDePagares('', {
          pagareIds,
          representanteIds,
        });
        res &&
          Notifications.success({
            body: 'Devolución de pagaré creada correctamente',
          });
      } catch (err) {
        Notifications.unknownError(err);
      }
    },
    [postDevolucionDePagares]
  );

  const devolucionPagareConfirmarPut = useCallback(
    async (id: string) => {
      let res;
      try {
        res = await putDevolucionDePagaresConfirmar(`/confirmar/by-id/${id}`);
        res && Notifications.success();
      } catch (err) {
        Notifications.unknownError(err);
      }
    },
    [putDevolucionDePagaresConfirmar]
  );

  const devolucionPagareDelete = useCallback(
    async (id: string) => {
      let res;
      const query = `/${id}`;
      try {
        res = await deleteDevolucionDePagares(query);
        res && Notifications.success();
      } catch (err) {
        Notifications.unknownError(err);
      }
    },
    [deleteDevolucionDePagares]
  );

  return {
    devolucionPagaresByFiltersGet,
    devolucionPagaresPost,
    devolucionPagareConfirmarPut,
    devolucionPagareDelete,
  };
};

export { useDevolucionDePagares };
