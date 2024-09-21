import { useCallback } from 'react';

import {
  IGarantiaByDirectLendingIdGetG,
  IGarantiaByDirectLendingIdGetGP,
  IGarantiaPost,
} from '@shared/interfaces/IGarantia';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { garantia } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useGarantia = () => {
  const { get, loading: loadingGarantia, post, remove } = useFetch(garantia);

  const { newCancelToken } = useCancelToken();

  const garantiaByDirectLendingId = useCallback(
    async (id: string, qS: IQueryReducer): IGarantiaByDirectLendingIdGetGP => {
      const query = queryFixer(`by-direct-lending-id/${id}`, qS);
      let res;
      try {
        res = await get<IGarantiaByDirectLendingIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IGarantiaByDirectLendingIdGetG);
    },
    [get, newCancelToken]
  );

  const garantiaByIdDelete = useCallback(
    async (id: string) => {
      let res;
      try {
        res = await remove<IGarantiaByDirectLendingIdGetG>(`/${id}`, {
          cancelToken: newCancelToken(),
        });
        res &&
          notifications.success({ body: 'Garantia eliminada correctamente.' });
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [newCancelToken, remove]
  );

  const garantiaPost = useCallback(
    async (body: IGarantiaPost) => {
      let res;
      try {
        res = await post('', body);
        res &&
          notifications.success({ body: 'Garantia creada correctamente.' });
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [post]
  );

  return {
    garantiaByDirectLendingId,
    garantiaByIdDelete,
    loadingGarantia,
    garantiaPost,
  };
};

export default useGarantia;
