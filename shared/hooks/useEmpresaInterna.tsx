import { useCallback } from 'react';

import { IEmpresaInternaGet } from '@shared/interfaces/api/IEmpresaInterna/IEmpresaInternaGet';
import notifications from '@shared/utils/notifications';

import { empresaInterna } from './endpoints';
import { useFetch } from './useFetch';

const useEmpresaInterna = () => {
  const { get: getEmpresaInterna, loading } = useFetch(empresaInterna);

  const empresaInternaGet = useCallback(async () => {
    let res;
    try {
      res = await getEmpresaInterna<IEmpresaInternaGet[]>();
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || ({} as IEmpresaInternaGet);
  }, [getEmpresaInterna]);

  return { empresaInternaGet, loading };
};

export default useEmpresaInterna;
