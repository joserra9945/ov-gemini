import { Context, useMemo } from 'react';
import { DataTableValueArray } from 'primereact/datatable';

import { TurboTableContext } from '../context/TurboTableContext';
import { initialQueryState } from '../filters/utils/helpers';
import { useFilters } from '../hooks/useFilters';
import { usePaginator } from '../hooks/usePaginator';
import { useRowExpansion } from '../hooks/useRowExpansion';
import { useSelection } from '../hooks/useSelection';
import { useServiceQuery } from '../hooks/useServiceQuery';
import { useSorter } from '../hooks/useSorter';
import {
  ITurboTableContext,
  TurboTableMultipleSelectionProps,
  TurboTableProviderProps,
  TurboTableSingleSelectionProps,
} from '../interfaces/TurboTableType';
import { displayedData } from '../utils/helpers';

export const TurboTableProvider = <D extends DataTableValueArray>({
  serviceCall,
  paginator = false,
  children: Content,
  defaultQueryState = initialQueryState,
  tableKey,
  columns = [],
  hasFilter = false,
  hasSelection = false,
  selectionListener,
  selectionType = 'multiple',
  hasExpansion = false,
  onRowClick,
  queryStateListener,
  dataListener,
  extraDependencies,
}: TurboTableProviderProps<D>) => {
  const TyppedContext = TurboTableContext as Context<ITurboTableContext<D>>;
  const {
    data,
    loading,
    filtersHadbeenModyfied,
    queryState,
    temporaryParams,
    onChangeQueryState,
    applyHandler,
    cancelHandler,
    onChangeTemporaryParams,
    clearHandler,
    filterButtonPropsGetter,
    onChangeQueryStateParams,
    clearSingleFilter,
  } = useServiceQuery<D[number]>({
    defaultQueryState,
    tableKey,
    serviceCall,
    queryStateListener,
    dataListener,
    extraDependencies,
  });

  const pagination = usePaginator({
    paginator,
    totalRecords: data.totalCount,
    defaultSkipCount: queryState.skipCount,
    onChangeQueryState,
  });

  const sorting = useSorter({
    onChangeQueryState,
  });

  const {
    selectionMode,
    selection,
    onExternalSelectionChange,
    onSelectAllChange,
    selectAll,
    isMultipleSelection,
    onSelectionChange,
  } = useSelection<D>({ selectionType, data, selectionListener });

  const { expandedRows, onRowToggle, onExternalRowToggle, isRowExpanded } =
    useRowExpansion<D>();

  const {
    selectedFilters,
    availableFilters,
    showFilter,
    displayedColumns,
    isResponsiveView,
    addFilter,
    removeFilters,
    setAvailableFilters,
    setSelectedFilters,
    toogleFilter,
  } = useFilters({ columns, tableKey, defaultQueryState });

  const defaultValue = useMemo(
    () => ({
      temporaryParams,
      selectedFilters,
      availableFilters,
      filtersHadbeenModyfied,
      queryState,
      showFilter,
      hasFilter,
      hasSelection,
      selectionType,
      isMultipleSelection,
      selection,
      selectAll,
      displayedColumns,
      isResponsiveView,
      loading,
      hasExpansion,
      onSelectAllChange,
      onChangeQueryState,
      applyHandler,
      cancelHandler,
      onChangeTemporaryParams,
      addFilter,
      removeFilters,
      setAvailableFilters,
      clearHandler,
      filterButtonPropsGetter,
      setSelectedFilters,
      onChangeQueryStateParams,
      toogleFilter,
      clearSingleFilter,
      onExternalSelectionChange,
      onRowToggle,
      onExternalRowToggle,
      isRowExpanded,
      onRowClick,
    }),
    [
      temporaryParams,
      selectedFilters,
      availableFilters,
      filtersHadbeenModyfied,
      queryState,
      showFilter,
      hasFilter,
      hasSelection,
      selectionType,
      isMultipleSelection,
      selection,
      selectAll,
      displayedColumns,
      isResponsiveView,
      loading,
      hasExpansion,
      onChangeQueryState,
      applyHandler,
      cancelHandler,
      onChangeTemporaryParams,
      addFilter,
      removeFilters,
      setAvailableFilters,
      clearHandler,
      filterButtonPropsGetter,
      setSelectedFilters,
      onChangeQueryStateParams,
      toogleFilter,
      clearSingleFilter,
      onExternalSelectionChange,
      onSelectAllChange,
      onRowToggle,
      onExternalRowToggle,
      isRowExpanded,
      onRowClick,
    ]
  );

  const TableValue = displayedData({
    loading,
    length: pagination.rows,
    data,
  }) as D;

  const selectionProps = {
    selectionMode,
    selectAll,
    selection,
    onSelectionChange,
    onSelectAllChange,
  } as TurboTableSingleSelectionProps<D> | TurboTableMultipleSelectionProps<D>;

  return (
    <TyppedContext.Provider value={defaultValue}>
      <Content
        pagination={pagination}
        sorting={sorting}
        selection={selectionProps}
        expansion={{
          expandedRows,
          onRowToggle,
        }}
        data={TableValue}
      />
    </TyppedContext.Provider>
  );
};
