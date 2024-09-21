import { useCallback } from 'react';

import { IImpagoPost, IImpagoPut } from '@shared/interfaces/IImpago';
import notifications from '@shared/utils/notifications';

import { impago } from './endpoints';
import { useFetch } from './useFetch';

const useImpago = () => {
  const {
    put: putImpago,
    post: postImpago,
    remove: deleteImpago,
  } = useFetch(impago);

  const gestionImpagoPut = useCallback(
    async (body: IImpagoPut) => {
      let res;
      try {
        res = await putImpago('', body);
        res &&
          notifications.success({
            body: 'Se ha modificado correctamente el impago',
          });
        return res;
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [putImpago]
  );

  const gestionImpagoPost = useCallback(
    async (body: IImpagoPost) => {
      let res;
      try {
        res = await postImpago('', body);
        res &&
          notifications.success({
            body: 'Se ha creado correctamente el impago',
          });
        return res;
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [postImpago]
  );

  const gestionImpagoDelete = useCallback(
    async (id: string) => {
      let res;
      try {
        res = await deleteImpago(`/${id}`);
        res &&
          notifications.success({
            body: 'Se ha eliminado correctamente el impago',
          });
        return res;
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [deleteImpago]
  );

  const impagoGestorPut = useCallback(
    async (id: string) => {
      let res;
      try {
        res = await putImpago(`/gestor`, {
          id,
        });
        res &&
          notifications.success({
            body: 'El gestor del recobro ha sido asignado correctamente',
          });
        return !!res;
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [putImpago]
  );

  return {
    gestionImpagoPut,
    gestionImpagoPost,
    gestionImpagoDelete,
    impagoGestorPut,
  };
};

export default useImpago;
