import { useCallback } from 'react';

import {
  ITomaDeRazonByEfectoEstudioIdGetG,
  ITomaDeRazonByEfectoEstudioIdGetGP,
  ITomaDeRazonByIdGet,
  ITomaDeRazonByIdGetP,
} from '@shared/interfaces/api/ITomaDeRazon';
import notifications from '@shared/utils/notifications';

import { tomaDeRazon } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useTomaDeRazon = () => {
  const {
    get: getTomaDeRazon,
    put: putTomaDeRazon,
    post: postTomaDeRazon,
  } = useFetch(tomaDeRazon);

  const { newCancelToken } = useCancelToken();

  const tomaDeRazonByEfectoEstudioIdGet = useCallback(
    async (id: string): ITomaDeRazonByEfectoEstudioIdGetGP => {
      const query = `/by-efecto-estudio-id/${id}`;
      let res;
      try {
        res = await getTomaDeRazon<ITomaDeRazonByEfectoEstudioIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ITomaDeRazonByEfectoEstudioIdGetGP);
    },
    [getTomaDeRazon, newCancelToken]
  );

  const tomaDeRazonByIdGet = useCallback(
    async (id: string): ITomaDeRazonByIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await getTomaDeRazon<ITomaDeRazonByIdGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ITomaDeRazonByIdGetP);
    },
    [getTomaDeRazon, newCancelToken]
  );

  const tomaDeRazonEstadoByIdPut = useCallback(
    async (id: string, estado: number, data: FormData) => {
      const query = `/estado/${estado}/by-id/${id}`;
      try {
        const res = await putTomaDeRazon(query, data);
        res &&
          notifications.success({ body: 'Toma de razón subida correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putTomaDeRazon]
  );

  const tomaDeRazonRegenerarPut = useCallback(
    async (id: string) => {
      const query = '/regenerar';
      try {
        const res = await putTomaDeRazon(query, { id });
        res &&
          notifications.success({
            body: 'Toma de razón regenerada correctamente',
          });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putTomaDeRazon]
  );

  const tomaDeRazonFirmarPorLibradorByIdPost = useCallback(
    async (tomaDeRazonId: string, files: any) => {
      const datos = new FormData();
      const query = `/firmar-por-librador/by-id/${tomaDeRazonId}`;
      if (files?.length) {
        files.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postTomaDeRazon(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postTomaDeRazon]
  );

  const tomaDeRazonIdByEfectoIdGet = useCallback(
    async (efectoId: string): Promise<string> => {
      const query = `/id/by-efecto-id/${efectoId}`;
      let res;
      try {
        res = await getTomaDeRazon<string>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || '';
    },
    [getTomaDeRazon]
  );

  return {
    tomaDeRazonByEfectoEstudioIdGet,
    tomaDeRazonByIdGet,
    tomaDeRazonEstadoByIdPut,
    tomaDeRazonRegenerarPut,
    tomaDeRazonFirmarPorLibradorByIdPost,
    tomaDeRazonIdByEfectoIdGet,
  };
};

export default useTomaDeRazon;
