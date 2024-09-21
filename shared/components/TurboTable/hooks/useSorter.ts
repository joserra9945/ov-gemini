import { useState } from 'react';
import { DataTableStateEvent } from 'primereact/datatable';

import { TurboTableSortOrder } from '../interfaces/TurboTableType';
import { mapSortingCriteriaFormOrder, sortOrderObject } from '../utils/helpers';

interface useSorterProps {
  onChangeQueryState: (values: { [x: string]: unknown }) => void;
}

export const useSorter = ({ onChangeQueryState }: useSorterProps) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<TurboTableSortOrder>(0);

  const setNewSortProps = (property: string) => {
    if (sortField === property) {
      const newSortOrder = sortOrderObject[
        sortOrder.toString() as keyof typeof sortOrderObject
      ].key as TurboTableSortOrder;
      newSortOrder === 0 && setSortField('');
      setSortOrder(newSortOrder);
    } else {
      setSortField(property);
      setSortOrder(1);
    }
  };

  const onSort = (e: DataTableStateEvent) => {
    const { sortField: property } = e;
    setNewSortProps(property);
    onChangeQueryState({
      sortingCriteria: mapSortingCriteriaFormOrder(property, sortOrder),
    });
  };

  return {
    onSort,
    sortField,
    sortOrder,
  };
};
