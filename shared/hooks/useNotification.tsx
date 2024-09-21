import { useCallback } from 'react';

import {
  INotificacionGetByFiltersG,
  INotificacionGetByFiltersGP,
} from '@shared/interfaces/api/INotificacion/INotificacionGetByFilters';
import {
  INotificationTypeGet,
  INotificationTypeGetP,
} from '@shared/interfaces/api/INotificacion/INotificationTypeGet';
import notifications from '@shared/utils/notifications';

import { notification } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useNotification = () => {
  const { get, put, loading } = useFetch(notification);

  const { newCancelToken } = useCancelToken();

  const notificacionesByFilterGet = useCallback(
    async (tipoNotificacion: boolean): INotificacionGetByFiltersGP => {
      const query = `/by-filters?Read=${tipoNotificacion}&MaxResultCount=100`;
      let res;
      try {
        res = await get<INotificacionGetByFiltersG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotificacionGetByFiltersGP);
    },
    [get, newCancelToken]
  );

  const leerTodasNotificacionesPut = useCallback(async () => {
    let res;
    try {
      res = await put(`/read-all`, {
        cancelToken: newCancelToken(),
      });
    } catch (e) {
      notifications.unknownError(e);
      return res;
    }
  }, [newCancelToken, put]);

  const notificationsTypesGet = useCallback(async (): INotificationTypeGetP => {
    let res;
    try {
      res = await get<INotificationTypeGet>('/types', {
        cancelToken: newCancelToken(),
      });
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || ({} as INotificationTypeGet);
  }, [get, newCancelToken]);

  const notificationsSetReadByidPut = useCallback(
    async (read: boolean, data: string[]) => {
      let res;
      try {
        res = await put(`/set-read/${read}`, data, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, put]
  );
  return {
    notificacionesByFilterGet,
    leerTodasNotificacionesPut,
    notificationsTypesGet,
    notificationsSetReadByidPut,
    loading,
  };
};

export default useNotification;
