import { useCallback } from 'react';

import {
  IDocumentoDeCesionByCesionIdGetG,
  IDocumentoDeCesionByCesionIdGetGP,
  IDocumentoDeCesionByFirmaFiltersGetG,
  IDocumentoDeCesionByFirmaFiltersGetGP,
  IDocumentoDeCesionUltimoNoRechazadoGet,
  IDocumentoDeCesionUltimoNoRechazadoGetP,
} from '@shared/interfaces/api/IDocumentoDeCesion';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { documentoDeCesion } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDocumentoDeCesion = () => {
  const {
    get: getDocumentoDeCesion,
    post: postDocumentoDeCesion,
    put,
    loading,
  } = useFetch(documentoDeCesion);
  const { newCancelToken } = useCancelToken();

  const documentoDeCesionByCesionIdGet = useCallback(
    async (cesionId: string): IDocumentoDeCesionByCesionIdGetGP => {
      const query = `/by-cesion-id/${cesionId}`;
      let res;
      try {
        res = await getDocumentoDeCesion<IDocumentoDeCesionByCesionIdGetG>(
          query,
          { cancelToken: newCancelToken() }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeCesionByCesionIdGetG);
    },
    [getDocumentoDeCesion, newCancelToken]
  );

  const documentoDeCesionByFirmaFiltersGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): IDocumentoDeCesionByFirmaFiltersGetGP => {
      let query;
      let res;

      if (queryState) {
        query = queryFixer('by-firma-filters', queryState);
      }
      if (params) {
        query = queryFixer(`by-firma-filters${params}`, queryState);
      }

      try {
        res = await getDocumentoDeCesion<IDocumentoDeCesionByFirmaFiltersGetG>(
          query
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeCesionByFirmaFiltersGetGP);
    },
    [getDocumentoDeCesion]
  );

  const documentoDeCesionFicheroReemplazoByIdPost = useCallback(
    async (id: string, files: any) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${id}?createBackup=true`;
      if (files?.length) {
        files.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postDocumentoDeCesion(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postDocumentoDeCesion]
  );

  const documentoDeCesionRegenerarDocumentosByFirmaNotarialId = useCallback(
    async (firmaNotarialId: string): Promise<boolean> => {
      const query = `/regenerar-documentos/by-firma-notarial-id/${firmaNotarialId}`;
      let res;
      try {
        res = await put(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [put]
  );

  const documentoDeCesionCrearContratoDeObraPost = useCallback(
    async (files: any, cesionId: string): Promise<boolean> => {
      const query = `/contrato-de-obra`;
      const formData = new FormData();
      if (files?.length) {
        files.forEach((row: any) => {
          formData.append('FormFile', row.file, row.file.name);
        });
      }
      formData.append('EsRecorte', 'false');
      formData.append('CesionId', cesionId);
      let res;
      try {
        res = await postDocumentoDeCesion(query, formData);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [postDocumentoDeCesion]
  );

  const documentoDeCesionUltimoNoRechazadoByCesionIdAndByTipoDocumentoGet =
    useCallback(
      async (
        cesionId: string,
        tipoDocumento: number
      ): IDocumentoDeCesionUltimoNoRechazadoGetP => {
        const query = `/ultimo-no-rechazado/by-cesion-id/${cesionId}/and-by-tipo-documento/${tipoDocumento}`;
        let res;
        try {
          res =
            await getDocumentoDeCesion<IDocumentoDeCesionUltimoNoRechazadoGet>(
              query,
              { cancelToken: newCancelToken() }
            );
        } catch (e) {
          notifications.unknownError(e);
        }
        return res || ({} as IDocumentoDeCesionUltimoNoRechazadoGet);
      },
      [getDocumentoDeCesion, newCancelToken]
    );

  const documentoDeCesionFirmadoAnteNotarioPost = useCallback(
    async (body: FormData): Promise<boolean> => {
      const query = `/firmado-ante-notario`;
      let res;
      try {
        res = await postDocumentoDeCesion(query, body);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [postDocumentoDeCesion]
  );

  return {
    documentoDeCesionByCesionIdGet,
    documentoDeCesionFicheroReemplazoByIdPost,
    documentoDeCesionByFirmaFiltersGet,
    documentoDeCesionCrearContratoDeObraPost,
    documentoDeCesionUltimoNoRechazadoByCesionIdAndByTipoDocumentoGet,
    documentoDeCesionRegenerarDocumentosByFirmaNotarialId,
    documentoDeCesionFirmadoAnteNotarioPost,
    loading,
  };
};

export default useDocumentoDeCesion;
