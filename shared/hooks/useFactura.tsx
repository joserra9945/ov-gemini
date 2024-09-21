import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import {
  IFacturaByPagareIdGetG,
  IFacturaByPagareIdGetGP,
} from '@shared/interfaces/api/IFactura';
import {
  IFacturaDetallesByFiltersGetG,
  IFacturaDetallesByFiltersGetGP,
  IPagareResumenByOperacionIdG,
  IPagareResumenByOperacionIdGP,
} from '@shared/interfaces/api/IPagare';
import notifications from '@shared/utils/notifications';

import { factura } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useFactura = () => {
  const {
    get: getFactura,
    put: putFactura,
    post: postFactura,
    loading,
  } = useFetch(factura);
  const { newCancelToken } = useCancelToken();

  const facturaByPagareIdGet = useCallback(
    async (id: string): IFacturaByPagareIdGetGP => {
      let res;
      const query = `/by-pagare-id/${id}`;
      try {
        res = await getFactura<IFacturaByPagareIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IFacturaByPagareIdGetGP);
    },
    [getFactura, newCancelToken]
  );

  const putVerificacionFacturaByEfectosId = useCallback(
    async (efectoIds: string[], estado: number) => {
      const query = '/estado-verificacion';
      let res;
      try {
        res = await putFactura(query, {
          efectoIds,
          estado,
          cancelToken: newCancelToken(),
        });
        res &&
          notifications.success({
            body: 'Efecto validado correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putFactura]
  );

  const facturaFicherosByIdPut = useCallback(
    async (form: FieldValues, facturaId?: string) => {
      const datos = new FormData();
      const query = `/ficheros/by-id/${facturaId || form.efectoId}`;
      form.files.forEach((doc: any) => {
        datos.append('rawFile', doc.file, doc.file.name);
      });
      try {
        await putFactura(query, datos);
        notifications.success({
          body: 'Se ha adjuntado la factura correctamente',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putFactura]
  );

  const facturaFicheroReemplazoByIdPost = useCallback(
    async (id: string, files: any) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${id}?createBackup=true`;
      if (files?.lenght) {
        files.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postFactura(query, datos);
        res &&
          notifications.success({ body: 'Documento subido correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postFactura]
  );

  const facturaResumenByOperacionIdGet = useCallback(
    async (id: string): IPagareResumenByOperacionIdGP => {
      let res;
      try {
        res = await getFactura<IPagareResumenByOperacionIdG>(
          `/resumen/by-operacion-id/${id}`
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagareResumenByOperacionIdGP);
    },
    [getFactura]
  );

  const facturaDetallesByFiltersGet = useCallback(
    async (id: string): IFacturaDetallesByFiltersGetGP => {
      let res;
      try {
        res = await getFactura<IFacturaDetallesByFiltersGetG>(
          `/detalles/by-filters?FacturaId=${id}`,
          {
            cancelToken: newCancelToken(),
          }
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IFacturaDetallesByFiltersGetG);
    },
    [getFactura, newCancelToken]
  );

  return {
    facturaByPagareIdGet,
    putVerificacionFacturaByEfectosId,
    facturaFicherosByIdPut,
    facturaFicheroReemplazoByIdPost,
    facturaResumenByOperacionIdGet,
    facturaDetallesByFiltersGet,
    loading,
  };
};

export default useFactura;
