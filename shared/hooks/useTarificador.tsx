import { useCallback } from 'react';

import {
  ITarificadorConstantsGetP,
  ITarificadorPreciosOperacionByImportesPostResponseP,
} from '@shared/interfaces/api/ITarificador';
import { ITarificadorPreciosOperacionByImportesPost } from '@shared/interfaces/api/ITarificador/ITarificadorPreciosOperacionByImportesPostResponse';
import notifications from '@shared/utils/notifications';

import { tarificador } from './endpoints';
import { useFetch } from './useFetch';

const useTarificador = () => {
  const { get, post } = useFetch(tarificador);

  const tarificadorConstantsGet =
    useCallback(async (): ITarificadorConstantsGetP => {
      try {
        const res = await get<ITarificadorConstantsGetP>('/constants');
        if (res) return res;
      } catch (e) {
        notifications.unknownError(e);
      }
      return {} as ITarificadorConstantsGetP;
    }, [get]);

  const preciosOperacionByImportesPost = useCallback(
    async (body: ITarificadorPreciosOperacionByImportesPost) => {
      try {
        const res =
          await post<ITarificadorPreciosOperacionByImportesPostResponseP>(
            '/precios-operacion/by-importes',
            body
          );
        if (res) {
          notifications.success({
            body: 'Operación actualizada correctamente',
          });
          return res;
        }
      } catch (e) {
        notifications.unknownError(e);
      }
      return {} as ITarificadorPreciosOperacionByImportesPostResponseP;
    },
    [post]
  );

  return { preciosOperacionByImportesPost, tarificadorConstantsGet };
};

export default useTarificador;
