import { useCallback } from 'react';

import {
  IUsuarioExternoPostForLogin,
  IUsuarioExternoPostResponse,
  IUsuarioExternoPostResponseP,
} from '@shared/interfaces/api/IUsuarioExterno';
import notifications from '@shared/utils/notifications';

import { usuarioExterno } from './endpoints';
import { useFetch } from './useFetch';

const useUsuarioExterno = () => {
  const { post: postUsuarioExterno } = useFetch(usuarioExterno);

  const postUsuarioExternoForLogin = useCallback(
    async (data: IUsuarioExternoPostForLogin): IUsuarioExternoPostResponseP => {
      let res;
      try {
        res = await postUsuarioExterno<IUsuarioExternoPostResponse>('', data);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IUsuarioExternoPostResponse);
    },
    [postUsuarioExterno]
  );

  return { postUsuarioExternoForLogin };
};

export default useUsuarioExterno;
