import { useCallback, useEffect, useState } from 'react';
import {
  DataTableCellSelection,
  DataTableSelectionMultipleChangeEvent,
  DataTableSelectionSingleChangeEvent,
  DataTableValueArray,
} from 'primereact/datatable';

import { IGenericResponse } from '@shared/interfaces';

interface useSelectionProps<D extends DataTableValueArray> {
  data: IGenericResponse<D[number]>;
  selectionListener?: (selection: D) => void;
  selectionType?: 'multiple' | 'single';
}

export const useSelection = <D extends DataTableValueArray>({
  data,
  selectionListener,
  selectionType,
}: useSelectionProps<D>) => {
  const isMultipleSelection = selectionType === 'multiple';
  const [selection, setSelection] = useState<
    D | D[number] | DataTableCellSelection<D> | null | undefined
  >(
    (isMultipleSelection ? [] : null) as
      | D
      | D[number]
      | DataTableCellSelection<D>
      | null
      | undefined
  );

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const selectionMode = isMultipleSelection ? 'checkbox' : 'radiobutton';
  const updateSelectAll = useCallback(
    (newSelection: D) => {
      isMultipleSelection &&
        data.items &&
        setSelectAll(
          (data.items as D).every((row) =>
            (newSelection || []).some(({ id }) => row.id === id)
          )
        );
    },
    [isMultipleSelection, data]
  );

  const onSelectionChange = (
    e:
      | DataTableSelectionMultipleChangeEvent<D>
      | DataTableSelectionSingleChangeEvent<D>
  ) => {
    const newSelection = e.value;
    setSelection(newSelection);
    updateSelectAll(newSelection as D);
    selectionListener?.(newSelection as D);
  };

  const getNewSelectionForExternalChange = (row: D[number]) => {
    if (!isMultipleSelection) return row;
    const alreadySelected = ((selection || []) as D).some(
      ({ id }) => row.id === id
    );
    return alreadySelected
      ? ((selection || []) as D[]).filter(({ id }: D[number]) => row.id !== id)
      : [...((selection || []) as D[]), row];
  };

  const onExternalSelectionChange = (row: D) => {
    const newSelection = getNewSelectionForExternalChange(row);
    setSelection(newSelection as D & DataTableValueArray);
    updateSelectAll(newSelection as D & DataTableValueArray);
    selectionListener?.(newSelection as D & DataTableValueArray);
  };

  const onSelectAllChange = () => {
    const newSelection = selectAll
      ? ((selection || []) as D).filter(
          ({ id }: D[number]) => !(data.items as D).some((row) => row.id === id)
        )
      : [...((selection || []) as D), ...data.items];

    setSelection(newSelection);
    updateSelectAll(newSelection as D);
    selectionListener?.(newSelection as D);
  };

  useEffect(() => {
    updateSelectAll(selection as D);
  }, [updateSelectAll, selection]);

  return {
    selectionMode,
    isMultipleSelection,
    selectAll,
    selection,
    onSelectionChange,
    onSelectAllChange,
    onExternalSelectionChange,
  };
};
