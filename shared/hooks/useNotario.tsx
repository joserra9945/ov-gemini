import { useCallback } from 'react';

import {
  INotarioByFiltersGetG,
  INotarioByFiltersGetGP,
  INotarioByIdGet,
  INotarioByIdGetP,
  INotarioByProvinciaIdGetGP,
  INotarioProvinciaByLibradorIdGetG,
  INotarioProvinciaByLibradorIdGetGP,
} from '@shared/interfaces/api/INotario';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { notario } from './endpoints';
import { useFetch } from './useFetch';

const useNotario = () => {
  const { get, loading: loadingNotarios } = useFetch(notario);

  const notarioByFiltersGet = useCallback(
    async (queryState: IQueryReducer): INotarioByFiltersGetGP => {
      const query = queryFixer(`by-filters`, queryState);
      let res;
      try {
        res = await get<INotarioByFiltersGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotarioByFiltersGetG);
    },
    [get]
  );
  const notarioByIdGet = useCallback(
    async (id: string): INotarioByIdGetP => {
      const query = `/${id}`;
      let res;
      try {
        res = await get<INotarioByIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotarioByIdGet);
    },
    [get]
  );

  const notarioByProvinciaId = useCallback(
    async (
      id: string,
      queryState: IQueryReducer
    ): INotarioByProvinciaIdGetGP => {
      const query = queryFixer(`by-provincia-id/${id}`, queryState);
      let res;
      try {
        res = await get<INotarioByProvinciaIdGetGP>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotarioByProvinciaIdGetGP);
    },
    [get]
  );

  const notarioProvinciaByLibradorId = useCallback(
    async (libradorId: string): INotarioProvinciaByLibradorIdGetGP => {
      const query = `/provincia/by-librador-id/${libradorId}`;
      let res;
      try {
        res = await get<INotarioProvinciaByLibradorIdGetG>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as INotarioProvinciaByLibradorIdGetG);
    },
    [get]
  );

  return {
    loadingNotarios,
    notarioByFiltersGet,
    notarioByProvinciaId,
    notarioProvinciaByLibradorId,
    notarioByIdGet,
  };
};

export default useNotario;
