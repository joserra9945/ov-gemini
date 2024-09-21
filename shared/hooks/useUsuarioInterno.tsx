import { useCallback } from 'react';

import {
  IUsuarioInternoPost,
  IUsuarioInternoPostResponse,
  IUsuarioInternoPostResponseP,
  UsuarioInternoLoggedGet,
  UsuarioInternoLoggedGetP,
} from '@shared/interfaces/api/IUsuarioInterno';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { usuarioInterno } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useUsuarioInterno = () => {
  const {
    put: putUsuarioInterno,
    get,
    post: postUsuarioInterno,
  } = useFetch(usuarioInterno);
  const { newCancelToken } = useCancelToken();

  const suplantarIdentidadEmpresa = useCallback(
    async (empresaId: string) => {
      const query = `/empresa-activa/${empresaId}`;
      let res;
      try {
        res = await putUsuarioInterno(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [putUsuarioInterno]
  );

  const loggedUsuarioInternoGet =
    useCallback(async (): UsuarioInternoLoggedGetP => {
      let res;
      const query = `/logged`;
      try {
        res = await get<UsuarioInternoLoggedGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as UsuarioInternoLoggedGet);
    }, [get, newCancelToken]);

  const postUsuarioInternoForAltaUsuario = useCallback(
    async (data: IUsuarioInternoPost): IUsuarioInternoPostResponseP => {
      let res;
      try {
        res = await postUsuarioInterno<IUsuarioInternoPostResponse>('', data);
      } catch (error) {
        notifications.unknownError(error);
        throw error;
      }
      return res || ({} as IUsuarioInternoPostResponse);
    },
    [postUsuarioInterno]
  );

  return {
    suplantarIdentidadEmpresa,
    loggedUsuarioInternoGet,
    postUsuarioInternoForAltaUsuario,
  };
};

export default useUsuarioInterno;
