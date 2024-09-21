import { useCallback } from 'react';

import notifications from '@shared/utils/notifications';

import { IEnumArrayP } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { tipoDocumento } from './endpoints';
import { useFetch } from './useFetch';

const useTipoDocumento = () => {
  const { get: getTipoDocumento } = useFetch(tipoDocumento);

  const documentoDeEmpresaGet = useCallback(async (): IEnumArrayP => {
    const query = `/documentos-de-empresa`;
    let res;
    try {
      res = await getTipoDocumento<IEnumArrayP>(query);
    } catch (e) {
      notifications.unknownError(e);
    }
    return res || ({} as IEnumArrayP);
  }, [getTipoDocumento]);

  return { documentoDeEmpresaGet };
};

export default useTipoDocumento;
