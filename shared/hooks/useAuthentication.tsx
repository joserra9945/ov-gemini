import { useCallback } from 'react';

import {
  IAuth,
  IAuthUserGet,
  IAuthUserGetP,
  IAuthUserPostResponse,
  IAuthUserPostResponseP,
  IAuthUserPut,
  IRefreshTokenPost,
  IRefreshTokenPostResponse,
} from '@shared/interfaces/api/IAuth';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { authentication } from './endpoints';

const useAuthentication = () => {
  const {
    get: getAuth,
    post,
    loading,
    put: putAuth,
  } = useFetch(authentication);

  const authUserGet = useCallback(
    async (id: string): IAuthUserGetP => {
      let res;
      const query = `/user/${id}`;
      try {
        res = await getAuth<IAuthUserGet>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IAuthUserGet);
    },
    [getAuth]
  );

  const authUserPut = useCallback(
    async (data: IAuthUserPut) => {
      let res;
      const query = `/user`;
      try {
        res = await putAuth(query, data);
      } catch (err) {
        console.error(err);
      }
      return !!res;
    },
    [putAuth]
  );

  const loginPost = useCallback(
    async (data: IAuth): IAuthUserPostResponseP => {
      let res;
      const query = `/log-in`;
      try {
        res = await post<IAuthUserPostResponse>(query, data);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IAuthUserPostResponse);
    },
    [post]
  );

  const resetTokenPost = useCallback(
    async (data: IRefreshTokenPost): Promise<IRefreshTokenPostResponse> => {
      let res: IRefreshTokenPostResponse | null = null;
      const query = '/Refresh-token';
      try {
        res = await post<IRefreshTokenPostResponse>(query, data);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IRefreshTokenPostResponse);
    },
    [post]
  );

  const refreshPRASToken = useCallback(async () => {
    const tokenPRAS = sessionStorage.getItem('tokenPRAS');

    if (tokenPRAS) {
      return;
    }

    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const res =
      refreshToken &&
      token &&
      (await resetTokenPost({
        refreshToken,
        product: 'PRAS',
        accessToken: token,
      }));

    if (res) {
      sessionStorage.setItem('tokenPRAS', res?.accessToken.token);
      sessionStorage.setItem('tokenRefreshPRAS', res?.refreshToken);
    }
  }, [resetTokenPost]);

  return {
    authUserGet,
    loginPost,
    resetTokenPost,
    authUserPut,
    refreshPRASToken,
    loading,
  };
};

export { useAuthentication };
