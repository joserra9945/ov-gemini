import { useCallback, useState } from 'react';

import { useNotario } from '@shared/hooks';
import { INotarioByFiltersGet } from '@shared/interfaces/api/INotario';
import { initialQueryState, PROVINCIA_ID } from '@shared/utils/constants';

import { IQueryState } from './interfaces';

export const useGetNotarios = () => {
  const { notarioByFiltersGet, loadingNotarios } = useNotario();
  const [queryState, _] = useState({
    ...initialQueryState,
    maxResult: 20,
  });

  const parseNotarios = useCallback((dataList: any) => {
    return dataList?.map((el: any) => ({
      id: el?.id,
      description: `${el.nombreCompleto}`,
    }));
  }, []);

  const parseNotariosLocales = useCallback(
    (dataList: INotarioByFiltersGet[]) => {
      return dataList?.map((el) => ({
        id: el?.id,
        description: `${el?.nombre} ${el?.apellidos}`,
      }));
    },
    []
  );

  const getAllNotarios = useCallback(
    async (qs?: IQueryState) => {
      const res = await notarioByFiltersGet(qs || queryState);
      return res;
    },
    [notarioByFiltersGet, queryState]
  );

  const getNotariosByProvincia = useCallback(
    async (provinciaId: string, qs?: IQueryState) => {
      const res = await notarioByFiltersGet({
        ...(qs || queryState),
        params: `&ProvinciaId=${provinciaId}`,
      });
      return res;
    },
    [notarioByFiltersGet, queryState]
  );

  const getNotariosValencia = useCallback(
    async (qs?: IQueryState) => {
      const res = await notarioByFiltersGet({
        ...(qs || queryState),
        params: `&ProvinciaId=${PROVINCIA_ID.VALENCIA}`,
      });
      return res;
    },
    [notarioByFiltersGet, queryState]
  );

  return {
    getAllNotarios,
    getNotariosByProvincia,
    getNotariosValencia,
    parseNotarios,
    parseNotariosLocales,
    loadingNotarios,
  };
};
