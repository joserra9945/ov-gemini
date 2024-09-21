import { Column, ColumnProps } from 'primereact/column';
import { DataTableValue } from 'primereact/datatable';
import { nanoid } from 'nanoid';

import { useTurboTableContext } from '../context';
import { IColumn } from '../interfaces/TurboTableType';

import { LoadingTemplate } from './LoadingTemplate';

export const TurboTableColumns = <D extends DataTableValue>() => {
  const {
    displayedColumns,
    isResponsiveView,
    hasSelection,
    loading,
    selectionType,
    hasExpansion,
  } = useTurboTableContext<D>();

  const mapColumnsProps = (column: IColumn) => {
    const {
      name: field,
      header,
      className,
      align,
      alignHeader,
      sortable,
    } = column;
    const body = loading ? LoadingTemplate(isResponsiveView) : column.body;
    const key = `${field}-${nanoid()}`;

    return {
      key,
      header,
      field,
      className,
      body,
      align,
      alignHeader,
      sortable,
    };
  };

  return [
    ...(!isResponsiveView && hasSelection
      ? [<Column selectionMode={selectionType} />]
      : []),
    ...(!isResponsiveView && hasExpansion
      ? [<Column expander className="pt-6" />]
      : []),
    ...(displayedColumns || [])
      .map(mapColumnsProps)
      .map((props: ColumnProps) => <Column {...props} />),
  ];
};
