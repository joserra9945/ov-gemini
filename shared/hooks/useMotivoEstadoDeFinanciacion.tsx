import { useCallback } from 'react';

import {
  IMotivosEstadoDeFinaciacionGetG,
  IMotivosEstadoDeFinaciacionGetGP,
} from '@shared/interfaces/api/IMotivosEstadoDeFinanciacion';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { motivoEstadoFinanciacion } from './endpoints';

const useMotivoEstadoDeFinanciacion = () => {
  const { get: getMotivoEstadoDeFinanciacion } = useFetch(
    motivoEstadoFinanciacion
  );

  const motivosEstadoDeFinanciacionPerdidasGet = useCallback(async () => {
    const query = '/by-tipo/2/?MaxResultCount=100';
    let res;
    try {
      res =
        await getMotivoEstadoDeFinanciacion<IMotivosEstadoDeFinaciacionGetG>(
          query
        );
    } catch (e) {
      notifications.unknownError(e);
    }
    return res || ({} as IMotivosEstadoDeFinaciacionGetGP);
  }, [getMotivoEstadoDeFinanciacion]);

  return { motivosEstadoDeFinanciacionPerdidasGet };
};

export default useMotivoEstadoDeFinanciacion;
