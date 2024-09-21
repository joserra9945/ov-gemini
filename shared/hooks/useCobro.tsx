import { useCallback } from 'react';

import { useFetch } from '@shared/hooks/useFetch';
import {
  ICobroByFiltersGetG,
  ICobroByFiltersGetGP,
  ICobroPost,
} from '@shared/interfaces/ICobro';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { useCancelToken } from './useCancelToken';

const DTO_NAME = 'api/gefintech/cobro';

const useCobro = () => {
  const { get, post, loading } = useFetch(DTO_NAME);
  const { newCancelToken } = useCancelToken();

  const cobroByFiltersGet = useCallback(
    async (queryState: IQueryReducer): ICobroByFiltersGetGP => {
      const query = queryFixer('by-filters', queryState);

      let res;
      try {
        res = await get<ICobroByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as ICobroByFiltersGetGP);
    },
    [get, newCancelToken]
  );

  const cobroPost = useCallback(
    async (body: ICobroPost) => {
      try {
        const res = await post<ICobroPost>('', body);
        if (res) {
          notifications.success();
          return res;
        }
      } catch (e) {
        notifications.unknownError(e);
      }
      return {} as ICobroPost;
    },
    [post]
  );

  return {
    cobroByFiltersGet,
    cobroPost,
    loading,
  };
};

export { useCobro };
