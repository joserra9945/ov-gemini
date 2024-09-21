import { useCallback } from 'react';

import { enumEstadosFinanciacion } from '@shared/enum/enumEstadosFinanciacion';
import {
  ICesionBodyPost,
  ICesionByEstudioIdGetG,
  ICesionByEstudioIdGetGP,
  ICesionByFiltersGetG,
  ICesionByFiltersGetGP,
  ICesionByFiltersInternoGetG,
  ICesionByFiltersInternoGetGP,
  ICesionByFirmaNotarialIdGetG,
  ICesionByFirmaNotarialIdGetGP,
  ICesionByIdGet,
  ICesionByIdGetP,
  ICesionPut,
  ICesionVinculablesFirmaNotarialGetG,
  ICesionVinculablesFirmaNotarialGetGP,
} from '@shared/interfaces/api/ICesion';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { cesion } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useCesion = () => {
  const {
    get: getCesion,
    put: putCesion,
    post: postCesion,
    loading,
  } = useFetch(cesion);
  const { newCancelToken } = useCancelToken();

  const cesionByIdGet = useCallback(
    async (cesionId: string): ICesionByIdGetP => {
      const query = `/${cesionId}`;
      let res;
      try {
        res = await getCesion<ICesionByIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionByIdGet);
    },
    [getCesion]
  );
  const cesionByFiltersGet = useCallback(
    async (qS: IQueryReducer): ICesionByFiltersGetGP => {
      const query = queryFixer('by-filters', qS);
      let res;
      try {
        res = await getCesion<ICesionByFiltersGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionByFiltersGetG);
    },
    [getCesion]
  );

  const cesionEstadosFinanciacionPut = useCallback(
    async (ids: string[], estadoFinanciacion: number) => {
      const query = '/estados-financiacion';
      const data = { ids, estadoFinanciacion };
      try {
        const res = await putCesion(query, data);
        if (res) {
          switch (estadoFinanciacion) {
            case enumEstadosFinanciacion.PENDIENTE:
              notifications.success({
                body: 'Cesiones cambiadas a pendiente',
              });
              break;
            case enumEstadosFinanciacion.DENEGADA:
              notifications.success({
                body: 'Cesiones denegadas correctamente',
              });
              break;
            default:
              notifications.success({
                body: 'Cesiones aprobadas correctamente',
              });
          }
        }
        return !!res;
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putCesion]
  );

  const cesionByFiltersInternoGet = useCallback(
    async (
      params: string,
      queryState: IQueryReducer
    ): ICesionByFiltersInternoGetGP => {
      const query = queryFixer(`by-filters/interno${params}`, queryState);
      let res;
      try {
        res = await getCesion<ICesionByFiltersInternoGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionByFiltersInternoGetGP);
    },
    [getCesion, newCancelToken]
  );

  const cesionEstadoPut = useCallback(
    async (id: string, estado: number) => {
      const query = '/estado';
      const data = { id, estado };
      try {
        const res = await putCesion(query, data);
        res &&
          notifications.success({ body: 'Cesión actualizada correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putCesion]
  );

  const cesionByEstudioIdGet = useCallback(
    async (estudioId: string): ICesionByEstudioIdGetGP => {
      const query = `/by-estudio-id/${estudioId}`;
      let res;
      try {
        res = await getCesion<ICesionByEstudioIdGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionByEstudioIdGetGP);
    },
    [getCesion]
  );

  const cesionEmpresaInternaPut = useCallback(
    async (cesionId: string, empresaInternaId: string) => {
      try {
        const res = await putCesion('/empresa-interna', {
          cesionId,
          empresaInternaId,
        });
        res &&
          notifications.success({
            body: 'Se ha modificado la empresa interna de la cesión',
          });
        return res;
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [putCesion]
  );

  const cesionByFirmaNotarialIdGet = useCallback(
    async (
      firmaNotarialId: string,
      maxResult?: boolean
    ): ICesionByFirmaNotarialIdGetGP => {
      const query = `/by-firma-notarial-id/${firmaNotarialId}${
        maxResult ? '?MaxResultCount=100' : ''
      }`;
      let res;
      try {
        res = await getCesion<ICesionByFirmaNotarialIdGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionByFirmaNotarialIdGetG);
    },
    [getCesion]
  );
  const cesionContratoCesionByIdGet = useCallback(
    async (id: string) => {
      const query = `/contrato-cesion/by-id/${id}`;
      let res;
      try {
        res = await getCesion<Blob>(query, {
          responseType: 'blob',
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [getCesion]
  );

  const cesionVinculablesAFirmaNotarialGet = useCallback(
    async (qS: IQueryReducer): ICesionVinculablesFirmaNotarialGetGP => {
      const query = queryFixer('vinculables-a-firma-notarial/by-filters', qS);
      let res;
      try {
        res = await getCesion<ICesionVinculablesFirmaNotarialGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as ICesionVinculablesFirmaNotarialGetG);
    },
    [getCesion]
  );
  const cesionPost = useCallback(
    async (data: ICesionBodyPost): Promise<string> => {
      let res;
      try {
        res = await postCesion<string>('', data);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || '';
    },
    [postCesion]
  );

  const cesionPut = useCallback(
    async (data: ICesionPut): Promise<boolean> => {
      let res;
      try {
        res = await putCesion<boolean>('', data);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [putCesion]
  );

  return {
    cesionByIdGet,
    cesionByFiltersGet,
    cesionByFiltersInternoGet,
    cesionEstadoPut,
    cesionByEstudioIdGet,
    cesionEmpresaInternaPut,
    cesionByFirmaNotarialIdGet,
    cesionContratoCesionByIdGet,
    cesionVinculablesAFirmaNotarialGet,
    cesionPost,
    cesionPut,
    cesionEstadosFinanciacionPut,
    loading,
  };
};

export default useCesion;
