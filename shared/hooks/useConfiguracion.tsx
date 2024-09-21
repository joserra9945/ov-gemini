import { useCallback } from 'react';

import {
  INotificacionesConfigurationByFilterGet,
  INotificacionesConfigurationByFilterGetG,
  INotificacionesConfigurationByFilterGetGP,
} from '@shared/interfaces/api/IConfiguracion';
import notifications from '@shared/utils/notifications';

import { configuration } from './endpoints';
import { notificationConfig } from './helpers';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useConfiguracion = () => {
  const { get, put } = useFetch(configuration, notificationConfig, 'data');

  const { newCancelToken } = useCancelToken();

  const notificacionesConfigurationByFilterGet = useCallback(
    async (token: string): INotificacionesConfigurationByFilterGetGP => {
      let res;
      try {
        res = await get<INotificacionesConfigurationByFilterGetG>('', {
          cancelToken: newCancelToken(),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotificacionesConfigurationByFilterGetGP);
    },
    [get, newCancelToken]
  );

  const notificacionConfiguracionPut = useCallback(
    async (
      configuracion: INotificacionesConfigurationByFilterGet,
      nuevoEstado: boolean
    ) => {
      try {
        await put<any>(`/set-active/${nuevoEstado}`, [configuracion.id], {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [newCancelToken, put]
  );

  return {
    notificacionesConfigurationByFilterGet,
    notificacionConfiguracionPut,
  };
};

export default useConfiguracion;
