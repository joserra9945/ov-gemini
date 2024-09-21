import { useState } from 'react';
import { DataTableRowToggleEvent, DataTableValue } from 'primereact/datatable';

export const useRowExpansion = <D extends DataTableValue>() => {
  const [expandedRows, setExpandedRows] = useState<D[]>([]);

  const onRowToggle = (e: DataTableRowToggleEvent) => {
    setExpandedRows(e.data as D[]);
  };

  const isRowExpanded = (row: D) =>
    expandedRows.some(({ id }: D) => row.id === id);

  const onExternalRowToggle = (row: D) => {
    const newSelection = isRowExpanded(row)
      ? expandedRows.filter(({ id }: D) => row.id !== id)
      : [...expandedRows, row];

    setExpandedRows(newSelection);
  };

  return {
    expandedRows,
    onRowToggle,
    onExternalRowToggle,
    isRowExpanded,
  };
};
