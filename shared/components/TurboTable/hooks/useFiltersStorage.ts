import { useCallback } from 'react';

import { IQueryState } from '../interfaces/TurboTableType';

interface Iprops {
  tableKey?: string;
}

export const useFiltersStorage = ({ tableKey }: Iprops) => {
  const storageKey = `turbotabla-filters-${tableKey}`;
  const storeQuerySate = useCallback(
    (queryState: IQueryState) => {
      tableKey &&
        sessionStorage.setItem(storageKey, JSON.stringify(queryState));
    },
    [tableKey, storageKey]
  );

  const retrieveQueryState = useCallback(
    (defaultQueryState: IQueryState): IQueryState => {
      const StringfiedDefaultQueryState =
        JSON.stringify(defaultQueryState) || '{}';
      const storedQueryState = JSON.parse(
        sessionStorage.getItem(storageKey) || StringfiedDefaultQueryState
      ) as IQueryState;
      return storedQueryState;
    },
    [storageKey]
  );
  return {
    storeQuerySate,
    retrieveQueryState,
  };
};
