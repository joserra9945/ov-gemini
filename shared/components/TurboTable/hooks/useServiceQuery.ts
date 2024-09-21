import { useCallback, useEffect, useState } from 'react';

import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import {
  dateFilterButtonPropsGetter,
  defaultFilterButtonPropsGetter,
  generateSearchParams,
  multiSelectFilterButtonPropsGetter,
  rangeFilterButtonPropsGetter,
  selectFilterButtonPropsGetter,
  switchFilterButtonPropsGetter,
} from '../filters/utils/helpers';
import {
  FilterButtonProps,
  IFilter,
  IMappedQueryState,
  IQueryState,
  queryParamsType,
} from '../interfaces/TurboTableType';

import { useFiltersStorage } from './useFiltersStorage';

interface UseServiceQueryProps<D> {
  serviceCall: (queryState: IMappedQueryState) => Promise<IGenericResponse<D>>;
  defaultQueryState: IQueryState;
  tableKey?: string;
  queryStateListener?: (event: IQueryState) => void;
  dataListener?: (event: IGenericResponse<D>) => void;
  extraDependencies?: { [x: string]: unknown };
}

export const useServiceQuery = <D>({
  serviceCall,
  defaultQueryState,
  tableKey,
  queryStateListener,
  dataListener,
  extraDependencies,
}: UseServiceQueryProps<D>) => {
  const { retrieveQueryState, storeQuerySate } = useFiltersStorage({
    tableKey,
  });
  const [data, setData] = useState<IGenericResponse<D>>(
    {} as IGenericResponse<D>
  );
  const [queryState, setQueryState] = useState<IQueryState>(
    retrieveQueryState(defaultQueryState)
  );
  const [temporaryParams, setTemporaryParmas] = useState<IQueryState>(
    retrieveQueryState(defaultQueryState)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeQueryState = (value: { [x: string]: unknown }) => {
    const newState = {
      ...queryState,
      ...value,
    };
    setTemporaryParmas(newState);
    setQueryState(newState);
  };

  const clearSingleFilter = (names: string[]) => {
    const newState = {
      ...queryState,
      skipCount: 0,
      params: {
        ...queryState.params,
        ...names.reduce((acc, name) => ({ ...acc, [name]: '' }), {}),
      },
    };
    setTemporaryParmas(newState);
    setQueryState(newState);
  };

  const onChangeQueryStateParams = (value: queryParamsType) => {
    const newState = {
      ...queryState,
      params: {
        ...queryState.params,
        ...value,
      },
    };
    setTemporaryParmas(newState);
    setQueryState(newState);
  };

  const onChangeTemporaryParams = (value: queryParamsType) => {
    setTemporaryParmas({
      ...temporaryParams,
      params: {
        ...temporaryParams.params,
        ...value,
      },
    });
  };

  const applyHandler = () => {
    setQueryState(temporaryParams);
  };

  const clearHandler = () => {
    setTemporaryParmas(defaultQueryState);
    setQueryState(defaultQueryState);
  };

  const cancelHandler = () => {
    setTemporaryParmas(queryState);
  };

  const filterButtonPropsGetter = (filter: IFilter): FilterButtonProps => {
    switch (filter.type) {
      case 'text':
        return defaultFilterButtonPropsGetter({ queryState, filter });
      case 'select':
        return selectFilterButtonPropsGetter({ queryState, filter });
      case 'multiSelect':
        return multiSelectFilterButtonPropsGetter({ queryState, filter });
      case 'numberRange':
        return rangeFilterButtonPropsGetter({ queryState, filter });
      case 'switch':
        return switchFilterButtonPropsGetter({ queryState, filter });
      case 'dateRange':
        return dateFilterButtonPropsGetter({ queryState, filter });
      default:
        return {} as FilterButtonProps;
    }
  };

  const filtersHadbeenModyfied =
    JSON.stringify(queryState?.params || {}) !==
    JSON.stringify(defaultQueryState?.params || {});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      storeQuerySate(queryState);
      const res = await serviceCall({
        ...queryState,
        params: generateSearchParams(queryState.params),
      });
      setData(res);
    } finally {
      setLoading(false);
    }
  }, [queryState, serviceCall, storeQuerySate]);

  useEffect(() => {
    fetchData();
  }, [fetchData, extraDependencies]);

  useEffect(() => {
    queryStateListener?.(queryState);
  }, [queryState, queryStateListener]);

  useEffect(() => {
    dataListener?.(data);
  }, [data, dataListener]);

  return {
    data,
    temporaryParams,
    queryState,
    loading,
    filtersHadbeenModyfied,
    fetchData,
    setQueryState,
    onChangeQueryState,
    onChangeTemporaryParams,
    applyHandler,
    cancelHandler,
    clearHandler,
    filterButtonPropsGetter,
    onChangeQueryStateParams,
    clearSingleFilter,
  };
};
