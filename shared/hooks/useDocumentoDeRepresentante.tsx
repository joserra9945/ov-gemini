import { useCallback } from 'react';

import { newFormatDateUTC } from '@shared/utils/formatters';
import notifications from '@shared/utils/notifications';

import { documentoDeRepresentante } from './endpoints';
import { useFetch } from './useFetch';

const useDocumentoDeRepresentante = () => {
  const { post: postDocumento, loading } = useFetch(documentoDeRepresentante);

  const documentoDeRepresentantePost = useCallback(
    async (files: any, data: any) => {
      const datos = new FormData();
      datos.append('RepresentanteId', data?.representanteId);
      datos.append('EmpresaId', data?.empresaId);
      datos.append('TipoDocumentoId', data?.tipoDocumentoId);
      datos.append(
        'fechaVencimiento',
        newFormatDateUTC(data?.fechaVencimiento)
      );
      files.forEach((doc: any) => {
        datos.append('FormFiles', doc?.file);
      });
      try {
        await postDocumento('/', datos);
        notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postDocumento]
  );

  const documentoDeRepresentanteFicheroReemplazoByIdPost = useCallback(
    async (id: string, files: any) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${id}?createBackup=true`;
      if (files.length) {
        files?.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postDocumento(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postDocumento]
  );

  return {
    documentoDeRepresentantePost,
    documentoDeRepresentanteFicheroReemplazoByIdPost,
    loading,
  };
};

export default useDocumentoDeRepresentante;
