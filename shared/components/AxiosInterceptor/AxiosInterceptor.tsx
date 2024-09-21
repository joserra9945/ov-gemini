import { useContext, useMemo } from 'react';
import axios, { HttpStatusCode } from 'axios';

import GlobalAppContext from '@shared/context/GlobalAppContext';
import { IAuthUserPostResponse } from '@shared/interfaces/api/IAuth';
import notifications from '@shared/utils/notifications';

export const AxiosInterceptor = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { userState, setUserState, setLogged } = useContext(GlobalAppContext);

  useMemo(() => {
    axios.interceptors.request.use(
      (config) => {
        const expiracy = sessionStorage.getItem('expire');
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        if (expiracy != null && now.getTime() > new Date(expiracy).getTime()) {
          const refreshToken = sessionStorage.getItem('refreshToken');
          if (userState?.accessToken.token && refreshToken) {
            setUserState({
              ...userState,
              accessToken: userState.accessToken,
              refreshToken,
            });
          }
        }

        const newConfig = { ...config };
        if (!newConfig.baseURL) {
          newConfig.baseURL = process.env.REACT_APP_API_URL;
        }
        if (!newConfig.responseType) {
          newConfig.responseType = 'json';
        }

        const tokenContext = userState?.accessToken?.token;

        const tokenLocalStorage = sessionStorage.getItem('token');
        newConfig.headers.Authorization = `Bearer ${
          tokenLocalStorage ?? tokenContext
        }`;

        return newConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        if (response?.status === HttpStatusCode.Ok) {
          if (response?.data?.result) {
            return response.data.result;
          }
          if (response?.data) {
            return response.data;
          }
          if (response?.data === 0) {
            return 0;
          }
          return { response: 'ok' };
        }
      },
      async (axiosError) => {
        console.error(axiosError);
        const status = axiosError?.response?.status;
        const data = axiosError.response?.data;
        const errors = data?.errors;
        switch (status) {
          case HttpStatusCode.BadRequest:
            if (errors?.[0]?.code === 'UserLockedOut') {
              notifications.errorServidor({
                title: 'Error',
                body: 'Usuario bloqueado. Revise su email.',
              });
            } else if (errors?.[0]?.code === 'InvalidCredentials') {
              notifications.errorServidor({
                title: 'Error',
                body: 'Email o contraseña incorrectos.',
              });
            } else {
              notifications.errorServidor();
            }
            break;
          case HttpStatusCode.Unauthorized:
            setUserState?.({} as IAuthUserPostResponse);
            setLogged?.(false);
            sessionStorage.clear();

            notifications.errorServidor(
              {
                title: '¡Error en sesión!',
                body: 'Su sesión ha caducado, será redirigido a la ventana de inicio de sesión en 10 segundos.',
              },
              true
            );
            setTimeout(() => {
              window.location.href = '/gestion/login';
            }, 10000);
            break;

          /*
           * Los errores custom del back para el usuario final vienen a través de un 406
           * NotAcceptable, si esperamos un blob requiere un tratamiento especial
           * para sacar el string de errora mostrar.
           */
          case HttpStatusCode.NotAcceptable:
            let errorString;
            if (
              axiosError.request.responseType === 'blob' &&
              data instanceof Blob &&
              data.type &&
              data.type.toLowerCase().indexOf('json') !== -1
            ) {
              errorString = JSON.parse(
                await axiosError.response.data.text()
              ).errors?.join(' ');
            } else {
              errorString = errors?.join(' ');
            }

            notifications.warning({
              body: errorString,
            });
            break;
          case HttpStatusCode.InternalServerError:
            notifications.errorServidor({
              title: 'Error de servidor',
              body: 'Se ha producido un error no controlado en el servidor.',
            });
            break;
          default:
            /*
             * Solo mostramos los errores genéricos de peticiones que no hayan sido
             * canceladas para evitar confundir al usuario.
             */
            if (axiosError?.name !== 'CanceledError') {
              notifications.errorServidor();
            }
            break;
        }

        return Promise.reject(axiosError);
      }
    );
  }, [setLogged, setUserState, userState]);

  return children;
};
