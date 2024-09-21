import { ReactNode } from 'react';
import {
  DataTableFilterMeta,
  DataTableProps,
  DataTableValueArray,
} from 'primereact/datatable';

import { IColumn } from '@shared/interfaces';

export type ITableProps<D> = {
  columns: IColumn[];
  multiple?: boolean;
  dtRef?: React.MutableRefObject<any>;
  setFilters?: (e: DataTableFilterMeta) => void;
  onChangeRowsPerPage?: (e: any) => void;
  isLoading?: boolean;
  virtualScroll?: boolean;
  virtualRowHeight?: number;
  virtualScrollDelay?: number;
  emptyMessage?: string | ReactNode;
  skeletonLoader?: boolean;
  singleSelection?: boolean;
  expandable?: boolean;
  leftExpandable?: boolean;
  fixedColumns?: boolean;
  firstColumnStyle?: React.CSSProperties;
  allowExpansion?: boolean;
} & DataTableProps<D & DataTableValueArray>;
