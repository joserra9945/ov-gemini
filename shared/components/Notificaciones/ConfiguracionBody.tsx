import { useCallback, useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { isEmpty } from 'lodash';
import { nanoid } from 'nanoid';

import useConfiguracion from '@shared/hooks/useConfiguracion';
import {
  INotificacionesConfigurationByFilterGet,
  INotificacionesConfigurationByFilterGetG,
} from '@shared/interfaces/api/IConfiguracion';
import notifications from '@shared/utils/notifications';

import { Spinner } from '../Legacy/Spinner';

export const ConfiguracionBody = () => {
  const {
    notificacionesConfigurationByFilterGet,
    notificacionConfiguracionPut,
  } = useConfiguracion();
  const token = sessionStorage.getItem('token');
  const [configuraciones, setConfiguraciones] =
    useState<INotificacionesConfigurationByFilterGetG>();

  const fetchConfiguracion = useCallback(async () => {
    if (token) {
      try {
        const res = await notificacionesConfigurationByFilterGet(token);

        res && setConfiguraciones(res);
      } catch (e) {
        notifications.unknownError(e);
      }
    }
  }, [notificacionesConfigurationByFilterGet, token]);

  useEffect(() => {
    fetchConfiguracion();
  }, [fetchConfiguracion]);

  const handleSettingChange = async (
    configuracion: INotificacionesConfigurationByFilterGet,
    valor: boolean
  ) => {
    await notificacionConfiguracionPut(configuracion, valor);
    fetchConfiguracion();
  };

  if (!configuraciones || isEmpty(configuraciones))
    return (
      <section className="p-4 border-b pt-2">
        <Spinner loading color="#0F1C40" size={80} />
      </section>
    );
  return (
    <section className="p-4 border-b pt-2">
      <div className="max-h-96 overflow-auto">
        {configuraciones.items.length > 0 &&
          configuraciones.items.map((configuracion) => (
            <div
              className="flex flex-row gap-4 justify-between border-b p-4"
              key={nanoid()}
            >
              <p className="text-base mb-2">
                {configuracion.category} {configuracion.type}
              </p>
              <InputSwitch
                checked={configuracion.active}
                onChange={(e) => handleSettingChange(configuracion, !!e.value)}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
