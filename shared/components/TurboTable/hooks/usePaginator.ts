import { useEffect, useState } from 'react';
import { DataTableStateEvent } from 'primereact/datatable';

import { paginatorLayouts } from '../templates/PaginatorLayouts';

import { useDevice } from './useDevice';

interface UsePaginatorProps {
  onChangeQueryState: (values: { [x: string]: unknown }) => void;
  totalRecords?: number;
  paginator?: boolean;
  defaultRows?: number;
  defaultRowsPerPageOptions?: number[];
  defaultSkipCount?: number;
}

export const usePaginator = ({
  paginator = false,
  totalRecords = 0,
  onChangeQueryState,
  defaultRows = 10,
  defaultSkipCount = 0,
  defaultRowsPerPageOptions = [2, 5, 10, 20, 50, 100],
}: UsePaginatorProps) => {
  const { device } = useDevice();
  const [rows, setRows] = useState<number>(defaultRows);
  const [first, setFirst] = useState<number>(defaultSkipCount);
  const [paginatorLayout, setPaginatorLayout] = useState(
    paginatorLayouts.desktop
  );

  const onPage = (e: DataTableStateEvent) => {
    const { first: skipCount, rows: maxResult } = e;
    setRows(maxResult);
    setFirst(skipCount);
    onChangeQueryState({ maxResult, skipCount });
  };

  useEffect(() => {
    setPaginatorLayout(paginatorLayouts[device]);
  }, [device]);

  return {
    ...paginatorLayout,
    paginator,
    rows,
    rowsPerPageOptions: defaultRowsPerPageOptions,
    first,
    totalRecords,
    onPage,
  };
};
