import { ColumnFilterMatchModeOptions } from 'primereact/column';

import { IColumn } from '@shared/interfaces';

export interface ITableFilters {
  [key: string]: {
    value: any;
    type: IFilterMatchMode;
  };
}

export default interface ITurboFiltersProps {
  columns: IColumn[];
  setFilter: (filters: ITableFilters) => void;
  filtersSelected: IFilters[];
  clearFilters?: () => void;
  showClearButtons?: boolean;
  showAddMore?: boolean;
}

export interface IFilters {
  label: string;
  value: any;
  query: string;
  disabled?: boolean;
}

type IFilterMatchMode = ColumnFilterMatchModeOptions & 'range';
