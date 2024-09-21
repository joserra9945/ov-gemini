import { useCallback } from 'react';

import {
  IAceptacionByEstudioIdGet,
  IAceptacionByEstudioIdGetG,
  IAceptacionByEstudioIdGetGP,
  IAceptacionEnviarPost,
  IAceptacionResponderPost,
} from '@shared/interfaces/api/IAceptacion';
import notifications from '@shared/utils/notifications';

import { aceptacion } from './endpoints';
import { useFetch } from './useFetch';

const useAceptacion = () => {
  const { get: getAceptacion, post: postAceptacion } = useFetch(aceptacion);

  const aceptacionByEstudioIdGet = useCallback(
    async (estudioId: string): IAceptacionByEstudioIdGetGP => {
      const query = `/by-estudio-id/${estudioId}`;
      let res;
      try {
        res = await getAceptacion<IAceptacionByEstudioIdGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IAceptacionByEstudioIdGetGP);
    },
    [getAceptacion]
  );

  const aceptacionByCesionIdGet = useCallback(
    async (cesionId: string) => {
      const query = `/by-cesion-id/${cesionId}`;
      let res;
      try {
        res = await getAceptacion<IAceptacionByEstudioIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IAceptacionByEstudioIdGet);
    },
    [getAceptacion]
  );

  const aceptacionResponderPost = useCallback(
    async (body: IAceptacionResponderPost) => {
      const query = `/responder`;
      let res;
      try {
        res = await postAceptacion<FormData>(query, body);
        res &&
          notifications.success({
            body: 'Aceptación respondida correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postAceptacion]
  );

  const aceptacionEnviarPost = useCallback(
    async (body: IAceptacionEnviarPost) => {
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

        res = await postAceptacion<FormData>(query, formData);

        res &&
          notifications.success({
            body: 'Aceptación enviada correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postAceptacion]
  );

  return {
    aceptacionByEstudioIdGet,
    aceptacionByCesionIdGet,
    aceptacionResponderPost,
    aceptacionEnviarPost,
  };
};
export default useAceptacion;
