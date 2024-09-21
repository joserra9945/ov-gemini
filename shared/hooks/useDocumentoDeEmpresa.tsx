import { useCallback } from 'react';

import {
  IDocumentoDeCesionByFirmaFiltersGetG,
  IDocumentoDeCesionByFirmaFiltersGetGP,
} from '@shared/interfaces/api/IDocumentoDeCesion';
import {
  IDocumentoDeEmpresaG,
  IDocumentoDeEmpresaGP,
} from '@shared/interfaces/api/IDocumentoDeEmpresa/IDocumentoDeEmpresa';
import {
  IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetG,
  IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetGP,
} from '@shared/interfaces/api/IDocumentoDeEmpresa/IDocumentoDeEmpresaPagosCertificadosByLibradorIdGet';
import { IDataFile } from '@shared/interfaces/IDataFile';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { documentoDeEmpresa } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDocumentoDeEmpresa = () => {
  const {
    post: postDocumentoDeEmpresa,
    get: getDocumentoDeEmpresa,
    loading,
  } = useFetch(documentoDeEmpresa);
  const { newCancelToken } = useCancelToken();

  const documentoDeEmpresaPost = useCallback(
    async (
      tipoDocumentoId: number,
      fechaEmision: string,
      fechaVencimiento: string,
      empresaId: string,
      files: IDataFile[]
    ): Promise<IDocumentoDeEmpresaGP> => {
      const formData = new FormData();

      formData.append('TipoDocumentoId', tipoDocumentoId.toString());
      formData.append('FechaEmision', fechaEmision);
      formData.append('FechaVencimiento', fechaVencimiento);
      formData.append('EmpresaId', empresaId);

      files.forEach((file) => {
        formData.append('formFiles', file.file, file.file.name);
      });

      let res: IDocumentoDeEmpresaG | null = null;
      try {
        res = await postDocumentoDeEmpresa<IDocumentoDeEmpresaG>('/', formData);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeEmpresaG);
    },
    [postDocumentoDeEmpresa]
  );

  const documentoDeEmpresaByFirmaFiltersGet = useCallback(
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
        res = await getDocumentoDeEmpresa<IDocumentoDeCesionByFirmaFiltersGetG>(
          query,
          { cancelToken: newCancelToken() }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDeCesionByFirmaFiltersGetGP);
    },
    [getDocumentoDeEmpresa, newCancelToken]
  );

  const documentoDeEmpresaFicheroReemplazoByIdPost = useCallback(
    async (documentoId: string, files: IDataFile[]) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${documentoId}?createBackup=true`;
      if (files?.length) {
        files.forEach((row) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postDocumentoDeEmpresa(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postDocumentoDeEmpresa]
  );

  const documentoDeEmpresaPagosCertificadosByLibradorIdGet = useCallback(
    async (libradorId: string) => {
      const query = `/pagos-certificados/by-librador-id/${libradorId}?maxResultCount=100`;
      let res;
      try {
        res =
          await getDocumentoDeEmpresa<IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetG>(
            query
          );
      } catch (err) {
        notifications.unknownError(err);
      }
      return (
        res || ({} as IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetGP)
      );
    },
    [getDocumentoDeEmpresa]
  );
  return {
    documentoDeEmpresaPost,
    documentoDeEmpresaByFirmaFiltersGet,
    documentoDeEmpresaPagosCertificadosByLibradorIdGet,
    documentoDeEmpresaFicheroReemplazoByIdPost,
    loading,
  };
};

export default useDocumentoDeEmpresa;
