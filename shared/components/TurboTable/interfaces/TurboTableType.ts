import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import {
  DataTableCellSelection,
  DataTableProps,
  DataTableRowClickEvent,
  DataTableRowToggleEvent,
  DataTableSelectAllChangeEvent,
  DataTableSelectionMultipleChangeEvent,
  DataTableSelectionSingleChangeEvent,
  DataTableStateEvent,
  DataTableValue,
  DataTableValueArray,
} from 'primereact/datatable';
import { PaginatorTemplate } from 'primereact/paginator';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

import { ButtonType } from '@shared/components/GenericButton/GenericButton';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';

import { ISortingCriteria } from '@shared/components/Legacy/TurboTable/helpers';

export type queryParamsType = {
  [key: string]:
    | string
    | number
    | boolean
    | number[]
    | Date
    | any[]
    | null
    | undefined;
};

export type TurboTableSortOrder = 0 | 1 | -1;

export type TurboTableGenericType<D extends DataTableValue> = D;

type TurboTableProps<D extends DataTableValueArray> = {
  serviceCall: (
    queryState: IMappedQueryState
  ) => Promise<IGenericResponse<D[number]>>;
  queryStateListener?: (event: IQueryState) => void;
  dataListener?: (event: IGenericResponse<D>) => void;
  extraDependencies?: { [x: string]: unknown };
  columns: IColumn[];
  customHeader?: ReactNode;
  defaultQueryState?: IQueryState;
  tableKey?: string;
  hasFilter?: boolean;
  hasSelection?: boolean;
  selectionType?: 'multiple' | 'single';
  hasExpansion?: boolean;
  selectionListener?: (
    selection:
      | D
      | D[number]
      | DataTableCellSelection<D>
      | null
      | undefined
      | any
      | any[]
  ) => void;
} & DataTableProps<D & DataTableValueArray>;

export interface IQueryState {
  sortingCriteria?: ISortingCriteria | ISortingCriteria[] | null;
  maxResult?: number;
  skipCount?: number;
  params: queryParamsType;
}

export interface IMappedQueryState {
  sortingCriteria?: ISortingCriteria | ISortingCriteria[] | null;
  maxResult?: number;
  skipCount?: number;
  params: string;
}
export interface IOption {
  label: string;
  value: number | string | boolean;
  id?: string;
  checked?: boolean;
  color?: string;
  className?: string;
}

export interface IFilterRange {
  name: string;
}
export interface IFilter {
  type:
    | 'text'
    | 'multiSelect'
    | 'dateRange'
    | 'select'
    | 'switch'
    | 'numberRange';
  defaultValue?: string | number[];
  name?: string;
  label: string;
  order?: number;
  hidden?: boolean;
  options?: IOption[];
  icon?: IconDefinition;
  fixed?: boolean;
  clearable?: boolean;
  className?: string;
  start?: IFilterRange;
  end?: IFilterRange;
  itemTemplate?: (option: IOption) => ReactNode;
}
interface IColumn {
  name: string;
  body?: (param: any, options?: any) => JSX.Element;
  responsive?: 'desktop' | 'laptop' | 'mobile' | 'tablet';
  xsPosition?: number;
  header?: string;
  filter?: IFilter;
  align?: 'left' | 'center' | 'right';
  alignHeader?: 'left' | 'center' | 'right';
  frozen?: boolean;
  devices: ('mobile' | 'tablet' | 'desktop')[];
  className?: string;
  fixedFilter?: boolean;
  sortable?: boolean;
}

interface IColumFilter {
  name: string;
  filter: IFilter;
}

interface FilterProps {
  label: string;
  name: string;
  options?: IOption[];
}

interface DefaultFilterButtonPropsGetterProps {
  queryState: IQueryState;
  filter: IFilter;
}

interface FilterButtonProps {
  buttonType: ButtonType;
  label: string;
}

interface AvailableAndSelectedFiltersResponseProps {
  selecteds: IFilter[];
  options: IFilter[];
  defaultSelected: IFilter[];
  defaultOptions: IFilter[];
}

interface AvailableAndSelectedFiltersProps {
  accumaltor: AvailableAndSelectedFiltersResponseProps;
  filter?: IFilter;
  retrieveQueryState: (defaultQueryState: IQueryState) => IQueryState;
  defaultQueryState: IQueryState;
}

type inputNumberFilterOperator = '=' | '</>' | '>' | '<';
interface mapTemporaryParamsValueOnChangeInputProps {
  key: string;
  value: number;
  startName: string;
  endName: string;
  operator: inputNumberFilterOperator;
}
interface mapTemporaryParamsValueOnChangeOperatorProps {
  operator: inputNumberFilterOperator;
  startValue?: number;
  startName: string;
  endName: string;
}

interface getDefaultOperatorProps {
  startValue?: number;
  endValue?: number;
}

interface ITurboTableContext<D extends DataTableValue> {
  temporaryParams: IQueryState;
  selectedFilters: IFilter[];
  availableFilters: IFilter[];
  filtersHadbeenModyfied: boolean;
  queryState: IQueryState;
  showFilter: boolean;
  hasFilter: boolean;
  hasSelection: boolean;
  selectionType: 'multiple' | 'single';
  isMultipleSelection: boolean;
  selection:
    | (D & DataTableValueArray)
    | (D & DataTableValueArray)[number]
    | DataTableCellSelection<D & DataTableValueArray>
    | null
    | undefined;
  selectAll: boolean;
  displayedColumns: IColumn[];
  isResponsiveView: boolean;
  loading: boolean;
  hasExpansion: boolean;
  onChangeQueryState: (value: { [x: string]: unknown }) => void;
  applyHandler: () => void;
  cancelHandler: () => void;
  onChangeTemporaryParams: (value: queryParamsType) => void;
  addFilter: (filter: IFilter) => void;
  removeFilters: () => void;
  setAvailableFilters: Dispatch<SetStateAction<IFilter[]>>;
  clearHandler: () => void;
  filterButtonPropsGetter: (filter: IFilter) => FilterButtonProps;
  setSelectedFilters: Dispatch<SetStateAction<IFilter[]>>;
  onChangeQueryStateParams: (value: queryParamsType) => void;
  toogleFilter: () => void;
  clearSingleFilter: (name: string[]) => void;
  onExternalSelectionChange: (row: D) => void;
  onSelectAllChange: () => void;
  onRowToggle: (e: DataTableRowToggleEvent) => void;
  onExternalRowToggle: (row: D) => void;
  isRowExpanded: (row: D) => boolean;
  onRowClick?: (event: DataTableRowClickEvent) => void;
}

interface TurboTablePaginationProps {
  paginatorLeft: ReactNode;
  pageLinkSize: number;
  paginatorTemplate: PaginatorTemplate;
  currentPageReportTemplate: string;
  paginator: boolean;
  rows: number;
  rowsPerPageOptions: number[];
  first: number;
  totalRecords: number;
  onPage: (event: DataTableStateEvent) => void;
}

interface TurboTableSortingProps {
  onSort: (event: DataTableStateEvent) => void;
  sortField: string;
  sortOrder?: 0 | 1 | -1 | null;
}

interface TurboTableSingleSelectionProps<D extends DataTableValueArray> {
  /**
   * Specifies the selection mode, valid values are "single", "multiple", "radiobutton" and "checkbox".
   * todo: replace "any" by "radiobutton": typing error in TurboTable.tsx file at DataTable component
   */
  selectionMode: any;
  selection: D[number];
  onSelectionChange: (event: DataTableSelectionSingleChangeEvent<D>) => void;
}

interface TurboTableMultipleSelectionProps<D extends DataTableValueArray> {
  /**
   * Specifies the selection mode, valid values are "single", "multiple", "radiobutton" and "checkbox".
   * todo: replace "any" by "checkbox": typing error in TurboTable.tsx file at DataTable component
   */
  selectionMode: any;
  selectAll: boolean;
  selection: D;
  onSelectionChange: (event: DataTableSelectionMultipleChangeEvent<D>) => void;
  onSelectAllChange: (event: DataTableSelectAllChangeEvent) => void;
}

interface TurboTableExpansionProps<D extends DataTableValue> {
  expandedRows: D[];
  onRowToggle: (e: DataTableRowToggleEvent) => void;
}
interface TurboTableProviderChildsProps<D extends DataTableValueArray> {
  pagination: TurboTablePaginationProps;
  sorting: TurboTableSortingProps;
  selection:
    | TurboTableSingleSelectionProps<D>
    | TurboTableMultipleSelectionProps<D>;
  expansion: TurboTableExpansionProps<D>;
  data: D;
}

interface TurboTableProviderProps<D extends DataTableValueArray> {
  serviceCall: (
    queryState: IMappedQueryState
  ) => Promise<IGenericResponse<D[number]>>;
  queryStateListener?: (event: IQueryState) => void;
  dataListener?: (event: IGenericResponse<D[number]>) => void;
  extraDependencies?: { [x: string]: unknown };
  paginator?: boolean;
  children: FC<TurboTableProviderChildsProps<D>>;
  defaultQueryState?: IQueryState;
  tableKey?: string;
  columns: IColumn[];
  hasFilter?: boolean;
  hasSelection?: boolean;
  selectionListener?: (
    selection: D | D[number] | DataTableCellSelection<D> | null | undefined
  ) => void;
  selectionType?: 'multiple' | 'single';
  hasExpansion?: boolean;
  onRowClick?: (event: DataTableRowClickEvent) => void;
}

export type {
  AvailableAndSelectedFiltersProps,
  AvailableAndSelectedFiltersResponseProps,
  DefaultFilterButtonPropsGetterProps,
  FilterButtonProps,
  FilterProps,
  getDefaultOperatorProps,
  IColumFilter,
  IColumn,
  inputNumberFilterOperator,
  ITurboTableContext,
  mapTemporaryParamsValueOnChangeInputProps,
  mapTemporaryParamsValueOnChangeOperatorProps,
  TurboTableExpansionProps,
  TurboTableMultipleSelectionProps,
  TurboTablePaginationProps,
  TurboTableProps,
  TurboTableProviderChildsProps,
  TurboTableProviderProps,
  TurboTableSingleSelectionProps,
  TurboTableSortingProps,
};
