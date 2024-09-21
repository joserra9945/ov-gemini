import { useCallback } from 'react';

import { alertasEnum } from '@shared/enum/alertasOperaciones';
import {
  IIAlertasExternasGetByFiltersG,
  IIAlertasExternasGetByFiltersGP,
} from '@shared/interfaces/api/IAlertasExternas';
import notifications from '@shared/utils/notifications';

import { useFetch } from './useFetch';

export const useAlertas = () => {
  const { get: getAlertas } = useFetch(
    '/api/gefintech/alertas/AlertaExternas/'
  );

  const getAlertasByOperacion = useCallback(
    async (operacionId: string): IIAlertasExternasGetByFiltersGP => {
      const query = `by-filters?Estados=${alertasEnum.ACTIVA}&Estados=${alertasEnum.INACTIVA}&IdExterno=${operacionId}&MaxResultCount=100`;
      let res;
      try {
        res = await getAlertas<IIAlertasExternasGetByFiltersG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }

      return res || ({} as IIAlertasExternasGetByFiltersG);
    },
    [getAlertas]
  );

  return { getAlertasByOperacion };
};
