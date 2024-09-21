import { useCallback } from 'react';

import {
  IDocumentoDeEfectoByEfectoIdByTipoGet,
  IDocumentoDeEfectoByEfectoIdByTipoGetP,
  IDocumentoDeEfectoDatosBasicosByEfectoIdGetG,
  IDocumentoDeEfectoDatosBasicosByEfectoIdGetGP,
  IDocumentoDeEfectoVistaClienteByEfectoIdGetG,
  IDocumentoDeEfectoVistaClienteByEfectoIdGetGP,
} from '@shared/interfaces/api/IDocumentoDeEfecto';
import notifications from '@shared/utils/notifications';

import { documentoDeEfecto } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDocumentoDeEfecto = () => {
  const {
    get: getDocumentoEfecto,
    post: postDocumentoEfecto,
    remove: deleteDocumentoEfecto,
  } = useFetch(documentoDeEfecto);

  const { newCancelToken } = useCancelToken();

  const documentoDeEfectoPost = useCallback(
    async (data: FormData) => {
      const query = '/';
      let res;
      try {
        res = await postDocumentoEfecto(query, data);
        res && notifications.success();
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as FormData);
    },
    [postDocumentoEfecto]
  );

  const documentoDeEfectoDatosBasicosByEfectoIdGet = useCallback(
    async (efectoId: string): IDocumentoDeEfectoDatosBasicosByEfectoIdGetGP => {
      const query = `/datos-basicos/by-efecto-id/${efectoId}`;
      let res;
      try {
        res =
          await getDocumentoEfecto<IDocumentoDeEfectoDatosBasicosByEfectoIdGetG>(
            query
          );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDocumentoDeEfectoDatosBasicosByEfectoIdGetGP);
    },
    [getDocumentoEfecto]
  );

  const documentoDeEfectoVistaClienteByEfectoId = useCallback(
    async (efectoId: string): IDocumentoDeEfectoVistaClienteByEfectoIdGetGP => {
      const query = `/vista-cliente/by-efecto-id/${efectoId}`;
      let res;
      try {
        res =
          await getDocumentoEfecto<IDocumentoDeEfectoVistaClienteByEfectoIdGetG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDocumentoDeEfectoVistaClienteByEfectoIdGetGP);
    },
    [getDocumentoEfecto, newCancelToken]
  );

  const documentoDeEfectoByEfectoIdByTipo = useCallback(
    async (
      efectoId: string,
      tipo: number
    ): IDocumentoDeEfectoByEfectoIdByTipoGetP => {
      const query = `/by-efecto-id/${efectoId}/by-tipo/${tipo}`;
      let res;
      try {
        res = await getDocumentoEfecto<IDocumentoDeEfectoByEfectoIdByTipoGet>(
          query,
          { cancelToken: newCancelToken() }
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDocumentoDeEfectoByEfectoIdByTipoGetP);
    },
    [getDocumentoEfecto, newCancelToken]
  );

  const documentoDeEfectoByIdDelete = useCallback(
    async (id: string) => {
      let res;
      const query = `/${id}`;
      try {
        res = await deleteDocumentoEfecto(query);
        res &&
          notifications.success({ body: 'Documento eliminado correctamente' });
      } catch (err) {
        notifications.unknownError(err);
      }
    },
    [deleteDocumentoEfecto]
  );

  const documentoDeEfectoFicheroReemplazoByIdPost = useCallback(
    async (documentoId: string, files: any) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${documentoId}`;
      if (files?.length) {
        files.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postDocumentoEfecto(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postDocumentoEfecto]
  );

  return {
    documentoDeEfectoPost,
    documentoDeEfectoDatosBasicosByEfectoIdGet,
    documentoDeEfectoVistaClienteByEfectoId,
    documentoDeEfectoByEfectoIdByTipo,
    documentoDeEfectoByIdDelete,
    documentoDeEfectoFicheroReemplazoByIdPost,
  };
};

export default useDocumentoDeEfecto;
