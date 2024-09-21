import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { isEmpty } from 'lodash';

import {
  IPagareByDevolucionDePagareFiltersG,
  IPagareByDevolucionDePagareFiltersGP,
  IPagareByIdGet,
  IPagareByIdGetP,
  IPagareByPrestamoIdGetG,
  IPagareByPrestamoIdGetGP,
  IPagareByRemesaFiltersG,
  IPagareByRemesaFiltersGP,
  IPagareConciliableG,
  IPagareConciliableGP,
  IPagareGetByFiltersG,
  IPagareGetByFiltersGP,
  IPagarePrestamoPost,
  IPagareResumenByOperacionIdG,
  IPagareResumenByOperacionIdGP,
} from '@shared/interfaces/api/IPagare';
import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { pagare } from './endpoints';
import { useCancelToken } from './useCancelToken';

const usePagare = () => {
  const {
    get: getPagare,
    put: putPagare,
    post: postPagare,
    loading,
  } = useFetch(pagare);
  const { newCancelToken } = useCancelToken();

  const pagareByFiltersGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): IPagareGetByFiltersGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-filters${params}`, queryState);
        let res;
        try {
          res = await getPagare<IPagareGetByFiltersG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (err) {
          notifications.unknownError(err);
        }
        return res || ({} as IPagareGetByFiltersGP);
      }
      return {} as IPagareGetByFiltersGP;
    },
    [getPagare, newCancelToken]
  );

  const pagareByDevolucionPagareFiltersGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): IPagareByDevolucionDePagareFiltersGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(
          `by-devolucion-de-pagare-filters${params}`,
          queryState
        );
        let res;
        try {
          res = await getPagare<IPagareByDevolucionDePagareFiltersG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (err) {
          notifications.unknownError(err);
        }
        return res || ({} as IPagareByDevolucionDePagareFiltersGP);
      }
      return {} as IPagareByDevolucionDePagareFiltersGP;
    },
    [getPagare, newCancelToken]
  );

  const pagaresConciliablesByFiltersGet = useCallback(
    async (params: string, queryState: IQueryReducer) => {
      const query = queryFixer(`conciliables/by-filters?${params}`, queryState);

      let res;
      try {
        res = await getPagare<IPagareConciliableG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (error) {
        notifications.unknownError(error);
      }

      return res || ({} as IPagareConciliableGP);
    },
    [getPagare, newCancelToken]
  );

  const putVerificacionPagareByEfectosId = useCallback(
    async (efectoIds: string[], estado: number) => {
      const query = '/estado-verificacion';
      let res;
      try {
        res = await putPagare(query, {
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
    [newCancelToken, putPagare]
  );

  const pagareFicherosByIdPut = useCallback(
    async (form: FieldValues, pagareId?: string) => {
      if (!form.files) return;
      const datos = new FormData();
      const query = `/ficheros/by-id/${pagareId || form.id}`;
      form.files.forEach((file: any) => {
        datos.append('rawFile', file.file, file.file.name);
      });
      try {
        await putPagare(query, datos);
        notifications.success({
          body: 'Se ha adjuntado el pagaré correctamente',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putPagare]
  );

  const pagareFicheroReemplazoByIdPost = useCallback(
    async (id: string, files: any) => {
      const datos = new FormData();
      const query = `/fichero-reemplazo/by-id/${id}?createBackup=true`;
      if (files.length) {
        files.forEach((row: any) => {
          datos.append('rawFile', row.file, row.file.name);
        });
      }
      try {
        const res = await postPagare(query, datos);
        res &&
          notifications.success({
            body: 'Se ha subido el documento correctamente',
          });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postPagare]
  );

  const pagareByIdGet = useCallback(
    async (id: string): IPagareByIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await getPagare<IPagareByIdGet>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagareByIdGet);
    },
    [getPagare]
  );

  const pagareResumenByOperacionIdGet = useCallback(
    async (id: string): IPagareResumenByOperacionIdGP => {
      let res;
      try {
        res = await getPagare<IPagareResumenByOperacionIdG>(
          `/resumen/by-operacion-id/${id}`
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagareResumenByOperacionIdGP);
    },
    [getPagare]
  );

  const pagareByRemesaFiltersGet = useCallback(
    async (queryState: IQueryReducer): IPagareByRemesaFiltersGP => {
      const query = queryFixer('by-remesa-filters', queryState);
      let res;
      try {
        res = await getPagare<IPagareByRemesaFiltersG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagareByRemesaFiltersGP);
    },
    [getPagare, newCancelToken]
  );

  const pagareByPrestamoIdGet = useCallback(
    async (
      queryState: IQueryReducer,
      prestamoId: string
    ): IPagareByPrestamoIdGetGP => {
      const query = queryFixer(`by-prestamo-id/${prestamoId}`, queryState);
      let res;
      try {
        res = await getPagare<IPagareByPrestamoIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagareByPrestamoIdGetG);
    },
    [getPagare, newCancelToken]
  );

  const pagarePrestamoPost = useCallback(
    async (body: IPagarePrestamoPost) => {
      let res;
      try {
        res = await postPagare('/prestamo', body);
        res &&
          notifications.success({
            body: 'Se ha creado el préstamo correctamente',
          });
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [postPagare]
  );

  return {
    pagareByFiltersGet,
    pagareByDevolucionPagareFiltersGet,
    pagaresConciliablesByFiltersGet,
    putVerificacionPagareByEfectosId,
    pagareFicherosByIdPut,
    pagareFicheroReemplazoByIdPost,
    pagareByIdGet,
    pagareResumenByOperacionIdGet,
    loading,
    pagareByRemesaFiltersGet,
    pagareByPrestamoIdGet,
    pagarePrestamoPost,
  };
};

export { usePagare };
