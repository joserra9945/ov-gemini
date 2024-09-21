import { IColumn } from '@shared/interfaces';

import {
  IFilters,
  ITableFilters,
} from '@shared/components/Legacy/TurboFilters/interfaces';
import { IOptionTableSelection } from '@shared/components/Legacy/TurboTable/interfaces';

export interface IHeaderTurboTable {
  selectedColumns: IColumn[];
  columns: IColumn[];
  onColumnToggle: (e: any) => void;
  toggleFilters: (e?: boolean) => void;
  currentTable?: number;
  setCurrentTable?: (e: number) => void;
  tableOptions?: IOptionTableSelection[];
  tableTitle?: string;
  showFilter?: boolean;
  showSelectTable?: boolean;
  showSelectColumns?: boolean;
  CustomComponent?: JSX.Element;
  showTabs?: boolean;
  tabsOptions?: any[];
  setActiveTab?: (e: number) => void;
  turboFilters: boolean;
  filterFunction: (e: ITableFilters) => void;
  filtersSelected?: IFilters[];
  showColumnOptions?: boolean;
}
