import { useCallback, useContext, useEffect, useState } from 'react';
import { faArrowLeft, faGear } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GlobalAppContext from '@shared/context/GlobalAppContext';
import { useNotification } from '@shared/hooks';
import { INotificacionGetByFilters } from '@shared/interfaces/api/INotificacion/INotificacionGetByFilters';
import { notificationHub } from '@shared/utils/constants';
import { createSignalInstace } from '@shared/utils/createSignalInstace';
import notifications from '@shared/utils/notifications';

import { Spinner } from '../Legacy/Spinner';

import { ConfiguracionBody } from './ConfiguracionBody';
import { optionEnum, TITLE_OPTIONS } from './constants';
import { NotificacionesBody } from './NotificacionesBody';

export const Notificaciones = () => {
  const { userState } = useContext(GlobalAppContext);
  const tokenOnNotifications =
    userState?.accessToken?.token ?? sessionStorage.getItem('token');
  const { notificacionesByFilterGet, leerTodasNotificacionesPut, loading } =
    useNotification();
  const [notificaciones, setNotificaciones] = useState<
    INotificacionGetByFilters[]
  >([]);

  const [notificacionesVistas, setNotificacionesVistas] = useState(
    optionEnum.NOT_READ
  );
  const [titulo, setTitulo] = useState<string>(TITLE_OPTIONS.NOTIFICACIONES);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [notificationSignalR, setNotificationSignalR] =
    useState<signalR.HubConnection | null>(null);

  const fetchNotificaciones = useCallback(async () => {
    if (tokenOnNotifications) {
      try {
        const res = await notificacionesByFilterGet(
          notificacionesVistas !== optionEnum.NOT_READ
        );
        res && setNotificaciones(res.items);
      } catch (e) {
        notifications.unknownError(e);
      }
    }
  }, [notificacionesByFilterGet, notificacionesVistas, tokenOnNotifications]);

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  const leerTodasNotificaciones = async () => {
    await leerTodasNotificacionesPut();
    await fetchNotificaciones();
  };

  const initializedNotificationsSignal = useCallback(async () => {
    try {
      if (tokenOnNotifications) {
        const connNotification = createSignalInstace(
          process.env.REACT_APP_API_URL || '',
          notificationHub,
          tokenOnNotifications
        );
        connNotification.on('NewNotification', () => {
          notifications.info({ body: 'Nueva notificación' });
          fetchNotificaciones();
        });
        setNotificationSignalR(connNotification);
        await connNotification.start();
      }
    } catch (e) {
      notifications.unknownError(e);
    }
  }, [fetchNotificaciones, tokenOnNotifications]);

  useEffect(() => {
    if (!notificationSignalR) initializedNotificationsSignal();
    return () => {
      if (notificationSignalR?.state === 'Connected') {
        notificationSignalR?.stop();
        setNotificationSignalR(null);
      }
    };
  }, [notificationSignalR, initializedNotificationsSignal]);

  if (loading) return <Spinner loading color="#435dbc" size={50} />;
  return (
    <main className="w-96 bg-white">
      <section className="flex flex-row justify-between p-4 pb-2">
        {showSettings && (
          <FontAwesomeIcon
            className="pt-2 cursor-pointer"
            icon={faArrowLeft}
            onClick={() => {
              setShowSettings(false);
              setTitulo(TITLE_OPTIONS.NOTIFICACIONES);
            }}
          />
        )}
        <p className="text-xl font-medium">{titulo}</p>
        <div className="flex flex-row gap-4">
          <FontAwesomeIcon
            icon={faGear}
            size="xl"
            className="cursor-pointer hover:text-secondary"
            onClick={() => {
              setShowSettings(true);
              setTitulo(TITLE_OPTIONS.CONFIGURACION);
            }}
          />
        </div>
      </section>
      {!showSettings ? (
        <NotificacionesBody
          notificaciones={notificaciones}
          notificacionesVistas={notificacionesVistas}
          setNotificacionesVistas={setNotificacionesVistas}
          leerTodasNotificaciones={leerTodasNotificaciones}
        />
      ) : (
        <ConfiguracionBody />
      )}
    </main>
  );
};
