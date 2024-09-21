/* eslint-disable */
// @ts-nocheck

import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  DataTableColumnResizeEndParams,
  DataTableFilterMeta,
  DataTablePageParams,
  DataTableSelectionChangeParams,
  DataTableSortOrderType,
  DataTableSortParams,
} from 'primereact/datatable';
import { isEqual, isString } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

import { IColumn } from '@shared/interfaces';
import { formatCurrency } from '@shared/utils/formatters';

import { ITableProps, Table as BasicTable } from '../Table';
import TableWrapper from '../TableWrapper';

import { setCustomFilters } from './helpers/customFilters';
import useDragScroll from './helpers/useDragScroll';
import { HeaderTurboTable } from './components';
import {
  IActionQuery,
  initialState,
  IQueryReducer,
  queryReducer,
  queryType,
  setStringSortOrder,
} from './helpers';
import { IFilters, IOptionTableSelection, ITableFilters } from './interfaces';

interface ITurboTableProps<D>
  extends Omit<ITableProps<D>, 'onSelectionChange' | 'columns'> {
  subHeaderValues?: { [key: string]: string };
  columns: IColumn[];
  onSelectionChange?(row: D | D[]): void;
  setQueryState?: (queryState: any) => void;
  showFilter?: boolean;
  showSelectTable?: boolean;
  showSelectColumns?: boolean;
  currentTable?: number;
  setCurrentTable?: (e: number) => void;
  tableOptions?: IOptionTableSelection[];
  tableTitle?: string;
  showHeader?: boolean;
  HeaderCustomComponent?: JSX.Element;
  initialQueryState?: IQueryReducer;
  showTabs?: boolean;
  tabsOptions?: any[];
  setActiveTab?: (e: number) => void;
  setIsFiltering?: (e: boolean) => void;
  handleSelectedFromParent?: boolean;
  turboFilters?: boolean;
  defaultFilters?: IFilters[];
  hideHeader?: boolean;
  persistantParam?: { value: string; label: string };
  onPageChange?: (e: DataTablePageParams) => void;
  fixedColumns?: boolean;
  firstColumnStyle?: React.CSSProperties;
  showColumnOptions?: boolean;
  SubHeaderCustomComponent?: JSX.Element;
  value: any;
  isDataSelectable?: (data: any) => boolean;
  allowExpansion?: (data:T) => boolean;
}

const TurboTable = <T,>({
  value,
  subHeaderValues,
  columns,
  className,
  showFilter,
  showColumnOptions = true,
  showSelectTable,
  showSelectColumns,
  currentTable,
  tableOptions,
  tableTitle,
  HeaderCustomComponent,
  SubHeaderCustomComponent,
  initialQueryState,
  showTabs,
  tabsOptions,
  selected,
  handleSelectedFromParent,
  persistantParam,
  isLoading,
  showHeader = true,
  skeletonLoader = false,
  turboFilters = false,
  hideHeader = false,
  defaultFilters = [],
  onSelectionChange,
  setQueryState,
  onPageChange,
  onColReorder,
  onColumnResizeEnd,
  onVirtualScroll,
  setCurrentTable,
  setActiveTab,
  setIsFiltering,
  fixedColumns = true,
  firstColumnStyle = { flexBasis: '100px', width: '100px' },
  stateKey,
  allowExpansion = true,
  ...rest
}: ITurboTableProps<T>): JSX.Element => {
  const dtRef = useRef<any>(null);
  useDragScroll({
    sliderRef: dtRef,
  });
  const [filtersSelected, setFiltersSelected] = useState<IFilters[]>([]);
  const [tableFilters, setTableFilters] = useState<DataTableFilterMeta>({});
  const [selectedColumns, setSelectedColumns] = useState<IColumn[]>();
  const [sortField, setSortField] = useState<string>();
  const [sortOrder, setSortOrder] = useState<DataTableSortOrderType>();
  const [rowsSelected, setRowsSelected] = useState<T | T[] | undefined>(
    selected
  );
  const [filterable, setFilterable] = useState(false);
  const [queryState, dispatch] = useReducer<
    Reducer<IQueryReducer, IActionQuery>
  >(queryReducer, initialQueryState || initialState());
  const tieneParams = useRef(stateKey && sessionStorage?.getItem(stateKey));

  const renderCounter = useRef(0);
  renderCounter.current += 1;

  const makeSubHeader = useCallback((): IColumn[] => {
    if (subHeaderValues) {
      const newColumns: IColumn[] = columns.map((column: IColumn) => {
        if (column?.subheader) {
          const newColumn = cloneDeep(column);
          const finalSubHeaderValue = formatCurrency(
            subHeaderValues[column.subheader]
          );

          newColumn.header = (): JSX.Element => (
            <>
              <p className="header-p">{column.header}</p>
              <p className="subheader-p">{finalSubHeaderValue}</p>
            </>
          );
          return newColumn;
        }
        return column;
      });
      return newColumns;
    }

    return columns;
  }, [columns, subHeaderValues]);

  const _onSelectionChange = (row: T | T[]): void => {
    setRowsSelected(row);
    onSelectionChange && onSelectionChange(row);
  };

  const _onColReorder = (e: any) => {
    const newSelectedColumns = e.columns.reduce(
      (acummulator: any[], currentValue: any) => {
        const column = selectedColumns?.find((sc: { key: any }) =>
          currentValue.key.includes(sc?.key)
        );
        if (column) {
          acummulator.push(column);
        }
        return acummulator;
      },
      []
    );
    setSelectedColumns(newSelectedColumns);
    if (onColReorder) {
      onColReorder(newSelectedColumns);
    }
  };

  const _onColumnResizeEnd = (e: DataTableColumnResizeEndParams) => {
    if (onColumnResizeEnd) {
      onColumnResizeEnd(e);
    }
  };

  const onColumnToggle = (valueColumn: IColumn[]) => {
    const selColumns = valueColumn;
    const orderedSelectedColumns = columns.filter((col) =>
      selColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const getFieldRangeFilterValue = (
    valueFieldRange: string | number,
    fieldName: string,
    filterName: string
  ): string => {
    return valueFieldRange
      ? `&${fieldName}${filterName}=${valueFieldRange}`
      : '';
  };

  const getQuery = (field: string, valueQuery: any, matchMode: string) => {
    if (matchMode === 'range') {
      return `${getFieldRangeFilterValue(
        valueQuery[0],
        field,
        'LowerLimit'
      )}${getFieldRangeFilterValue(valueQuery[1], field, 'UpperLimit')}`;
    }
    const valueString = isString(valueQuery);
    const value =
      valueQuery && valueString ? encodeURIComponent(valueQuery) : valueQuery;
    return Array.isArray(valueQuery)
      ? valueQuery.length
        ? `&${field}=${valueQuery.join(`&${field}=`)}`
        : ''
      : value
      ? `&${field}=${value}`
      : '';
  };

  const setFilters = (newFilters: any) => {
    const fields = Object.keys(newFilters);
    const parsedFilters = fields.map((field) => {
      // eslint-disable-next-line no-shadow
      const { value, matchMode } = newFilters[field];
      return {
        label: field,
        value,
        query: getQuery(field, value, matchMode),
      };
    });
    !isEqual(filtersSelected, parsedFilters) &&
      setFiltersSelected(parsedFilters);
    setTableFilters(newFilters);
  };

  const onSort = (e: DataTableSortParams) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
    if (!e.sortField && initialQueryState?.sortingCriteria) {
      dispatch({
        payload: {
          sortingCriteria: initialQueryState?.sortingCriteria,
        },
        type: queryType.SORT,
      });
      return;
    }
    const sortStringOrder = setStringSortOrder(e.sortOrder);
    if (!sortStringOrder) {
      dispatch({
        payload: {
          sortingCriteria: null,
        },
        type: queryType.SORT,
      });
      return;
    }
    dispatch({
      payload: {
        sortingCriteria: {
          property: e.sortField,
          sort: sortStringOrder,
        },
      },
      type: queryType.SORT,
    });
  };

  const toggleFilters = (andClearFilters = false) => {
    if (andClearFilters) {
      const disabledColumns = columns.filter(
        (column) => column.customFilter?.disabled
      );

      const newStaticParams = disabledColumns?.map(
        (stColumn) =>
          `&${stColumn.customFilter?.name}=${stColumn.filterElement?.props?.defaultValue}`
      );

      dispatch({
        payload: { params: newStaticParams?.join('') || '' },
        type: queryType.PARAMS,
      });

      const filterColumnsWithDisableds = (filters, disabledCols) => {
        const res = {};
        for (const key in filters) {
          const filter = disabledCols.find(
            (item) => item.customFilter && item.customFilter?.name === key
          );
          if (filter) {
            res[key] = filters[key];
          }
        }
        return res;
      };
      const newColumns = filterColumnsWithDisableds(
        tableFilters,
        disabledColumns
      );

      setFilters(newColumns);
      setTableFilters(newColumns);
      onSort({ sortField: '', sortOrder: 0, multiSortMeta: null });
      dtRef?.current?.reset();
    }
    let newSelectedColumns = cloneDeep(selectedColumns);

    newSelectedColumns = newSelectedColumns?.map((element: IColumn) => {
      const returnElement = element;
      if (!element.customFilter?.disabled) {
        if ('filter' in element && !turboFilters) {
          returnElement.filter = !andClearFilters && !filterable;
        }
        return returnElement;
      }
      return returnElement;
    });

    setFilterable(!andClearFilters && !filterable);
    setIsFiltering && setIsFiltering(!andClearFilters && !filterable);
    setSelectedColumns(newSelectedColumns);
  };

  const filterTable = useCallback((): void => {
    if (filtersSelected.length) {
      const persistantParamsNewValue = filtersSelected.some(
        (filter: { label: string | undefined }) =>
          filter.label === persistantParam?.label
      );
      let newState =
        !persistantParamsNewValue && persistantParam?.value
          ? persistantParam.value
          : '';
      filtersSelected.forEach((el: IFilters) => {
        newState += el.query;
      });
      dispatch({ payload: { params: newState }, type: queryType.PARAMS });
    }
  }, [filtersSelected, persistantParam]);

  useEffect(() => {
    filterTable();
  }, [filterTable]);

  useEffect(() => {
    /*
     * Solo aplicaremos los filtros por defecto
     * si no hay ningún stateKey guardado (!tieneParams.current)
     */
    if (defaultFilters?.length && !tieneParams.current) {
      const defaultF = defaultFilters.reduce(
        (accumulator, currentValue): DataTableFilterMeta => {
          return {
            ...accumulator,
            [currentValue.label]: {
              value: !currentValue?.isMulti
                ? currentValue.value
                : currentValue.value.split(','),
              matchMode: currentValue.matchMode || 'in',
            },
          };
        },
        {}
      );
      setTableFilters(defaultF);
      setFiltersSelected(defaultFilters);
    }
  }, [defaultFilters]);

  useEffect(() => {
    setQueryState &&
      setQueryState((qs: IQueryReducer) => {

        // qs es el valor anterior de queryState. Si son iguales, se devuelve el valor anterior.
        if (isEqual(qs, queryState)) {
          return qs;
        }

        const stateKeyValue = sessionStorage.getItem(stateKey) && JSON.parse(sessionStorage.getItem(stateKey));
        const tieneFiltros = stateKeyValue?.filters && 
        Object.keys(stateKeyValue.filters).filter(key => stateKeyValue.filters[key]?.value);

        // Si hay un stateKey ya guardado en Application, es decir, se ha renderizado al menos una vez.
        if (stateKeyValue) {
          
          // Si tengo filtros guardados en el stateKey.
          if (tieneFiltros?.length > 0) {
            
            // Esperamos a que Datatable reconstruya los params del queryState para devolver el nuevo queryState.
            // Miramos que el queryState tenga params. Si no tiene y hay filtros en el sessionStorage, miramos si estos han sido borrados.
            if (queryState?.params || tieneFiltros?.length === 0) {
              return queryState;
            }

          // Si no tiene filtros guardados en el stateKey, devuelvo el queryState que se está poniendo por defecto con el initialQueryState.
          } else {
            return queryState;
          }
        } 

        // Si no hay un stateKey ya guardado, aplicamos el defaultFilters, si existe.
        else if (defaultFilters.length > 0) {
            
            // Esperamos a que Datatable reconstruya los params del queryState para devolver el nuevo queryState.
            // Miramos que el queryState tenga params. Si no tiene y hay filtros en el sessionStorage, miramos si estos han sido borrados.
            if (queryState?.params || tieneFiltros?.length === 0) {
              return queryState;
            }
          } 

          // Si no tiene defaultFilters, devuelvo el queryState que se está poniendo por defecto con el initialQueryState.
          else {
            return queryState;
          }
      }
      );
  }, [
    filtersSelected.length,
    queryState,
    setQueryState,
    stateKey,
    tieneParams,
  ]);

  useEffect(() => {
    if (columns) {
      const newColumnsSubheader = makeSubHeader();
      const filters = dtRef?.current?.props?.filters;
      const filtersKeys = filters && Object.keys(filters);

      setCustomFilters(newColumnsSubheader, dtRef, filtersSelected);

      let newSelectedColumns = cloneDeep(newColumnsSubheader);
      if (filtersKeys?.length || filterable) {
        newSelectedColumns = newSelectedColumns?.map((element: IColumn) => {
          const returnElement = element;
          if ('filter' in element && !turboFilters) {
            returnElement.filter = true;
          }
          return returnElement;
        });
        setIsFiltering && setIsFiltering(true);
      }
      setSelectedColumns(newSelectedColumns);
    }
  }, [
    columns,
    filterable,
    filtersSelected,
    makeSubHeader,
    setIsFiltering,
    turboFilters,
  ]);

  // PAGINATION
  const onPage = (e: DataTablePageParams) => {
    if (queryState?.skipCount !== e?.first) {
      dispatch({
        payload: {
          skipCount: e.first,
        },
        type: queryType.SKIP,
      });
    }
    onPageChange && onPageChange(e);
  };

  const onChangeRowsPerPage = (e: number) => {
    dispatch({
      payload: {
        maxResult: e,
      },
      type: queryType.MAXRES,
    });
  };

  const filterFunction = useCallback((filters: ITableFilters) => {
    if (Object.keys(filters)?.length) {
      Object.keys(filters).forEach((f) =>
        dtRef.current.filter(filters[f]?.value, f, filters[f]?.type)
      );
    } else {
      setFiltersSelected([]);
      setTableFilters({});
    }
  }, []);

  return (
    <>
      {/* <h1>Renders: {renderCounter.current}</h1> */}
      {selectedColumns && (
        <TableWrapper data={value || []}>
          <BasicTable
            isLoading={isLoading}
            columns={selectedColumns}
            first={
              setQueryState
                ? queryState.skipCount
                : initialQueryState?.skipCount
            }
            rows={
              setQueryState
                ? queryState.maxResult
                : initialQueryState?.maxResult
            }
            header={
              showHeader ? (
                <HeaderTurboTable
                  showColumnOptions={showColumnOptions}
                  selectedColumns={selectedColumns}
                  columns={columns}
                  onColumnToggle={onColumnToggle}
                  toggleFilters={toggleFilters}
                  currentTable={currentTable}
                  setCurrentTable={setCurrentTable}
                  tableOptions={tableOptions}
                  showFilter={showFilter}
                  showSelectTable={showSelectTable}
                  showSelectColumns={showSelectColumns}
                  tableTitle={tableTitle}
                  showTabs={showTabs}
                  tabsOptions={tabsOptions}
                  setActiveTab={setActiveTab}
                  CustomComponent={HeaderCustomComponent}
                  SubHeaderCustomComponent={SubHeaderCustomComponent}
                  turboFilters={turboFilters}
                  filtersSelected={filtersSelected}
                  filterFunction={filterFunction}
                />
              ) : null
            }
            onPage={onPage}
            onSort={onSort}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
            onSelectionChange={(e: DataTableSelectionChangeParams) =>
              _onSelectionChange(e.value)
            }
            className={`${className ?? ''}${
              turboFilters ? ' with-turbo-filters' : ' without-turbo-filters'
            }${hideHeader ? ' with-no-header' : ''}`}
            dtRef={dtRef}
            filterDelay={300}
            onColReorder={_onColReorder}
            onColumnResizeEnd={_onColumnResizeEnd}
            selected={handleSelectedFromParent ? selected : rowsSelected}
            onChangeRowsPerPage={onChangeRowsPerPage}
            sortField={sortField}
            sortOrder={sortOrder}
            filters={tableFilters}
            setFilters={setFilters}
            skeletonLoader={skeletonLoader}
            value={value}
            fixedColumns={fixedColumns}
            firstColumnStyle={firstColumnStyle}
            stateKey={stateKey}
            allowExpansion={allowExpansion}
            {...rest}
          />
        </TableWrapper>
      )}
    </>
  );
};

export default TurboTable;
