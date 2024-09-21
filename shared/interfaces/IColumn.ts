import { CSSProperties } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IColumn {
  className?: string;
  hidden?: boolean;
  key: any;
  body?: any;
  sortable?: boolean;
  header: string | any;
  subheader?: string;
  field?: string;
  isFunctionComponent?: boolean;
  frozen?: boolean;
  filter?: boolean;
  filterElement?: JSX.Element;
  filterPlaceholder?: string;
  filterMatchMode?: FilterMatchMode | undefined;
  filterFunction?: (e: any) => void;
  customFilter?: any;
  textAlign?: 'left' | 'right' | 'center';
  align?: 'left' | 'right' | 'center';
  headerStyle?: any;
  style?: CSSProperties;
  editor?: any;
  editorValidator?: any;
  rowEditor?: boolean;
  onEditorInit?: (e: any) => void;
  onEditorSubmit?: (e: any) => void;
  onEditorCancel?: (e: any) => void;
  fixedFilter?: boolean;
  filterIconName?: IconDefinition;
  filterOrder?: number;
  isFixed?: boolean;
  totalColumnProperty?: any;
  alignFrozen?: 'left' | 'right' | undefined;
}
