import { IGenericResponse } from '@shared/interfaces';

import { TurboTableSortOrder } from '../interfaces/TurboTableType';

interface displayedDataProps {
  loading?: boolean;
  length: number;
  data: IGenericResponse<unknown>;
}

export const displayedData = ({ loading, length, data }: displayedDataProps) =>
  loading ? Array.from({ length }) : data.items;

export const sortOrderObject = {
  '0': {
    key: 1,
    value: 'ASC',
  },
  '1': {
    key: -1,
    value: 'DESC',
  },
  '-1': {
    key: 0,
    value: null,
  },
};

export const mapSortingCriteriaFormOrder = (
  property: string,
  sortOrder: TurboTableSortOrder
) => {
  const newSortOrder =
    sortOrderObject[sortOrder.toString() as keyof typeof sortOrderObject];

  if (!newSortOrder.value) return null;

  return {
    sort: newSortOrder.value,
    property,
  };
};
