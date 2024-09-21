import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IPersonaByEmpresaIdG,
  IPersonaByEmpresaIdGP,
} from '@shared/interfaces/IPersona/IPersona';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { persona } from './endpoints';
import { useCancelToken } from './useCancelToken';

const usePersona = () => {
  const { remove: deletePersona, get: getPersonaByEmpresaId } =
    useFetch(persona);

  const { newCancelToken } = useCancelToken();

  const personaIdDelete = useCallback(
    async (id: string) => {
      const query = `/${id}`;
      try {
        const res = await deletePersona(query);
        res &&
          notifications.success({ body: 'Contacto eliminado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [deletePersona]
  );

  const personaByEmpresaIdGet = useCallback(
    async (queryState: IQueryReducer, id: string): IPersonaByEmpresaIdGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-empresa-id/${id}`, queryState);
        let res;
        try {
          res = await getPersonaByEmpresaId<IPersonaByEmpresaIdG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (e) {
          notifications.unknownError(e);
        }
        return res || ({} as IPersonaByEmpresaIdGP);
      }
      return {} as IPersonaByEmpresaIdGP;
    },
    [getPersonaByEmpresaId, newCancelToken]
  );

  return { personaIdDelete, personaByEmpresaIdGet };
};

export default usePersona;
