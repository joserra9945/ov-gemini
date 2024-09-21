import { useCallback } from 'react';

import {
  IVerificacionByEstudioIdGetG,
  IVerificacionByEstudioIdGetGP,
} from '@shared/interfaces/api/IVerificacion';
import {
  IVerificacionEnviarPost,
  IVerificacionResponderPost,
} from '@shared/interfaces/api/IVerificacion/IVerificacionEnviarPost';
import notifications from '@shared/utils/notifications';

import { verificacion } from './endpoints';
import { useFetch } from './useFetch';

const useVerificacion = () => {
  const { get: getVerificacion, post: postVerificacion } =
    useFetch(verificacion);

  const verificacionByEstudioIdGet = useCallback(
    async (estudioId: string): IVerificacionByEstudioIdGetGP => {
      const query = `/by-estudio-id/${estudioId}?MaxResultCount=100`;
      let res;
      try {
        res = await getVerificacion<IVerificacionByEstudioIdGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IVerificacionByEstudioIdGetGP);
    },
    [getVerificacion]
  );

  const verificacionEnviarPost = useCallback(
    async (body: IVerificacionEnviarPost) => {
      const query = `/solicitar-envio`;
      let res;
      try {
        const formData = new FormData();
        formData.append('Id', body.id);
        formData.append('TextoAdicional', body.textoAdicional);
        body.emailsDestinatarios.forEach((email) => {
          formData.append('EmailsDestinatarios', email);
        });
        body.formFiles.forEach((row) => {
          formData.append('formFiles', row.file, row.file.name);
        });

        res = await postVerificacion<FormData>(query, formData);

        res &&
          notifications.success({
            body: 'Verificación enviada correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postVerificacion]
  );

  const verificacionResponderPost = useCallback(
    async (body: IVerificacionResponderPost) => {
      const query = `/responder`;
      let res;
      try {
        res = await postVerificacion<IVerificacionResponderPost>(query, body);

        res &&
          notifications.success({
            body: 'Verificación respondida correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postVerificacion]
  );

  return {
    verificacionByEstudioIdGet,
    verificacionEnviarPost,
    verificacionResponderPost,
  };
};

export default useVerificacion;
