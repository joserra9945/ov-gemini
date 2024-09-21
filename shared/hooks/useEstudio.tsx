import { useCallback } from 'react';

import {
  IEstudioByFiltersGetG,
  IEstudioByFiltersGetGP,
  IEstudioByIdGet,
  IEstudioByIdGetP,
} from '@shared/interfaces/api/IEstudio';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { estudio } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useEstudio = () => {
  const { get: getEstudio, put: putEstudio, loading } = useFetch(estudio);
  const { newCancelToken } = useCancelToken();

  const estudioIdGet = useCallback(
    async (id: string): IEstudioByIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await getEstudio<IEstudioByIdGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEstudioByIdGetP);
    },
    [getEstudio, newCancelToken]
  );

  const estudioCerrarByIdPut = useCallback(
    async (estudioId: string) => {
      const query = `/cerrar-by-id/${estudioId}`;
      let res;
      try {
        res = await putEstudio(query);
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res;
    },
    [putEstudio]
  );

  const estudioAnalistaByIdPut = useCallback(
    async (estudioId: string) => {
      const data = {
        id: estudioId,
        reemplazar: true,
      };
      const query = `/analista`;
      let res;
      try {
        res = await putEstudio(query, data);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [putEstudio]
  );

  const estudioByFiltersGet = useCallback(
    async (qS: IQueryReducer): IEstudioByFiltersGetGP => {
      const query = queryFixer('by-filters', qS);
      let res;
      try {
        res = await getEstudio<IEstudioByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEstudioByFiltersGetGP);
    },
    [getEstudio, newCancelToken]
  );

  const modificarAncladoByAnotacionId = useCallback(
    async (item: any) => {
      const { estudioId, id, anclada } = item;
      const query = `/${estudioId}/anotacion/${id}/anclar/${!anclada}`;
      let res;
      try {
        res = await putEstudio(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [putEstudio]
  );

  const estudioAlertasPrasValorByIdPut = useCallback(
    async (id: string) => {
      const query = `/alertas-pras/valor/by-id/${id}`;
      let res;
      try {
        res = await putEstudio(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [putEstudio]
  );

  return {
    loading,
    estudioIdGet,
    estudioCerrarByIdPut,
    estudioAnalistaByIdPut,
    estudioByFiltersGet,
    modificarAncladoByAnotacionId,
    estudioAlertasPrasValorByIdPut,
  };
};

export default useEstudio;
