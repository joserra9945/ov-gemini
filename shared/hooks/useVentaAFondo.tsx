import { useCallback } from 'react';

import {
  IVentaAFondoByIdGetG,
  IVentaAFondoByIdGetGP,
} from '@shared/interfaces/api/IVentaFondo';
import { useFetch } from '@shared/utils';
import Notifications from '@shared/utils/notifications';

import { ventaAFondo } from './endpoints';

const useVentaAFondo = () => {
  const { get } = useFetch(ventaAFondo);

  const getVentaAFondoById = useCallback(
    async (id: string): IVentaAFondoByIdGetGP => {
      const query = `/by-id/${id}`;
      let res;
      try {
        res = await get<IVentaAFondoByIdGetG>(query);
      } catch (err) {
        Notifications.unknownError(err);
      }
      return res || ({} as IVentaAFondoByIdGetGP);
    },

    [get]
  );

  return { getVentaAFondoById };
};

export default useVentaAFondo;
