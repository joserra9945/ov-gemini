import { useCallback } from 'react';

import {
  IDirectLendingByEstudioIdGetG,
  IDirectLendingByEstudioIdGetGP,
  IDirectLendingByFiltersGetG,
  IDirectLendingByFiltersGetGP,
  IDirectLendingByFirmaNotarialIdGetG,
  IDirectLendingByFirmaNotarialIdGetGP,
} from '@shared/interfaces/api/IDirectLending';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { directLending } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useDirectLending = () => {
  const { get, put, loading } = useFetch(directLending);

  const { newCancelToken } = useCancelToken();

  const directLendingByEstudioIdGet = useCallback(
    async (
      estudioId: string,
      qS: IQueryReducer
    ): IDirectLendingByEstudioIdGetGP => {
      const query = queryFixer(`by-estudio-id/${estudioId}`, qS);
      let res;
      try {
        res = await get<IDirectLendingByEstudioIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDirectLendingByEstudioIdGetG);
    },
    [get, newCancelToken]
  );
  const directLendingAnalistaIdPut = useCallback(
    async (id: string) => {
      const query = `/${id}/analista`;
      let res;
      try {
        res = await put(query, {
          cancelToken: newCancelToken(),
        });
        notifications.success({
          body: 'Direct lending modificado correctamente.',
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [put, newCancelToken]
  );
  const directLendingByFiltersIdGet = useCallback(
    async (qS: IQueryReducer): IDirectLendingByFiltersGetGP => {
      const query = queryFixer(`by-filters`, qS);
      let res;
      try {
        res = await get<IDirectLendingByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDirectLendingByFiltersGetG);
    },
    [get, newCancelToken]
  );

  const directLendingByFirmaNotarialIdGet = useCallback(
    async (
      firmaNotarialId: string,
      qS: IQueryReducer
    ): IDirectLendingByFirmaNotarialIdGetGP => {
      const query = queryFixer(`by-firma-notarial-id/${firmaNotarialId}`, qS);
      let res;
      try {
        res = await get<IDirectLendingByFirmaNotarialIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDirectLendingByFirmaNotarialIdGetG);
    },
    [get, newCancelToken]
  );

  return {
    loading,
    directLendingByEstudioIdGet,
    directLendingAnalistaIdPut,
    directLendingByFirmaNotarialIdGet,
    directLendingByFiltersIdGet,
  };
};

export default useDirectLending;
