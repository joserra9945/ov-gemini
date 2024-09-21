import { useCallback } from 'react';

import { IGenericResponse } from '@shared/interfaces';
import {
  IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoId,
  IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdP,
  IDocumentoDeFinanciacionByFinanciacionIdGetG,
  IDocumentoDeFinanciacionByFinanciacionIdGetGP,
  IDocumentoDeFinanciacionByFirmaFiltersGetG,
  IDocumentoDeFinanciacionByFirmaFiltersGetGP,
  IDocumentoDeFinanciacionByIdGet,
  IDocumentoDeFinanciacionByIdGetP,
  IDocumentoDeFinanciacionEstadosRevisionPut,
} from '@shared/interfaces/api/IDocumentoDeFinanciacion';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { documentoDeFinanciacion } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDocumentoDeFinanciacion = () => {
  const { get, loading, post, put } = useFetch(documentoDeFinanciacion);

  const { newCancelToken } = useCancelToken();

  const documentoDeFinanciacionByFirmaFiltersGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): IDocumentoDeFinanciacionByFirmaFiltersGetGP => {
      let res;
      const query = queryFixer(`by-firma-filters${params}`, queryState);
      try {
        res = await get<IDocumentoDeFinanciacionByFirmaFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeFinanciacionByFirmaFiltersGetG);
    },
    [get, newCancelToken]
  );

  const documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet =
    useCallback(
      async (
        financiacionId: string,
        tipoDocumentoId: number
      ): IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoIdP => {
        let res;
        const query = `/by-financiacion-id/${financiacionId}/by-tipo-documento-id/${tipoDocumentoId}`;
        try {
          res =
            await get<IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoId>(
              query,
              {
                cancelToken: newCancelToken(),
              }
            );
        } catch (e) {
          notifications.unknownError(e);
        }
        return (
          res ||
          ({} as IDocumentoDeFinanciacionByFinanciacionIdByTipoDocumentoId)
        );
      },
      [get, newCancelToken]
    );

  const documentoDeFinanciacionAnexoCompensacionImpagoPost = useCallback(
    async (form: FormData) => {
      let res;
      try {
        res = await post(`/anexo-compensacion-impago`, form);
        res &&
          notifications.success({ body: 'Documento añadido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [post]
  );

  const documentoDeFinanciacionFicheroRemplazoByIdPost = useCallback(
    async (id: string, form: FormData, createBackup = false) => {
      let res;
      try {
        res = await post(
          `/fichero-reemplazo/by-id/${id}?createBackup=${createBackup}`,
          form
        );
        res &&
          notifications.success({ body: 'Documento añadido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [post]
  );
  const documentoDeFinanciacionFicherosByIdPut = useCallback(
    async (id: string, formData: FormData) => {
      let res;
      try {
        res = await put(`/ficheros/by-id/${id}`, formData);
        res &&
          notifications.success({ body: 'Fichero modificado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const documentoDeFinanciacionReemplazarFicherosPut = useCallback(
    async (body: { id: string; reemplazar: boolean }) => {
      let res;
      try {
        res = await put(`/reemplazar-ficheros`, body);
        res &&
          notifications.success({ body: 'Fichero modificado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const documentoDeFinanciacionEstadosRevisionPut = useCallback(
    async (body: IDocumentoDeFinanciacionEstadosRevisionPut) => {
      let res;
      try {
        res = await put(`/estados-revision`, body);
        res && notifications.success({ body: 'Modificado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );
  const documentoDeFinanciacionFirmarAnteNotarioPut = useCallback(
    async (form: FormData) => {
      let res;
      try {
        res = await put(`/firmar-ante-notario`, form);
        res &&
          notifications.success({ body: 'Documento firmado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const documentoDeFinanciacionByFinanciacionIdGet = useCallback(
    async (
      financiacionId: string,
      queryState?: IQueryReducer
    ): IDocumentoDeFinanciacionByFinanciacionIdGetGP => {
      let res;
      let query;
      if (queryState) {
        query = queryFixer(`by-financiacion-id/${financiacionId}`, queryState);
      } else {
        query = `/by-financiacion-id/${financiacionId}`;
      }
      try {
        res = await get<IDocumentoDeFinanciacionByFinanciacionIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeFinanciacionByFinanciacionIdGetG);
    },
    [get, newCancelToken]
  );

  const documentoDeFinanciacionByIdGet = useCallback(
    async (id: string): IDocumentoDeFinanciacionByIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await get<IDocumentoDeFinanciacionByIdGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeFinanciacionByIdGet);
    },
    [get, newCancelToken]
  );

  const documentoDeFinanciacionDatosBasicosByFinanciacionIdGet = async (
    operacionId: string,
    params?: string
  ) => {
    const res = await get<IGenericResponse<IDocumentoDeFinanciacionByIdGet>>(
      `datos-basicos/by-operacion-id/${operacionId}${params ?? ''}`,
      {
        cancelToken: newCancelToken(),
      }
    );
    return res || null;
  };

  return {
    loading,
    documentoDeFinanciacionByFirmaFiltersGet,
    documentoDeFinanciacionByFinanciacionIdByTipoIdDocumentoGet,
    documentoDeFinanciacionByFinanciacionIdGet,
    documentoDeFinanciacionAnexoCompensacionImpagoPost,
    documentoDeFinanciacionFicheroRemplazoByIdPost,
    documentoDeFinanciacionFicherosByIdPut,
    documentoDeFinanciacionReemplazarFicherosPut,
    documentoDeFinanciacionEstadosRevisionPut,
    documentoDeFinanciacionByIdGet,
    documentoDeFinanciacionDatosBasicosByFinanciacionIdGet,
    documentoDeFinanciacionFirmarAnteNotarioPut,
  };
};

export { useDocumentoDeFinanciacion };
