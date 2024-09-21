import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { IColumn } from '@shared/interfaces';

export interface IOptionEstado {
  label: string;
  value: number;
  query: string;
  color: string;
  unchecked?: boolean;
}

export interface IOptionTableSelection {
  name: string;
  value: number;
  icon?: IconProp;
  columns: IColumn[];
}

export interface IFilters {
  label: string;
  value: any;
  query: string;
  matchMode?: string;
}

type IFilterMatchMode =
  | 'startsWith'
  | 'contains'
  | 'endsWith'
  | 'equals'
  | 'notEquals'
  | 'in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'custom'
  | 'range';

export interface ITableFilters {
  [key: string]: {
    value: any;
    type: IFilterMatchMode;
  };
}
