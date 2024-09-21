import { useMemo, useState } from 'react';

import { mapAvailableAndSelectedFilters } from '../filters/utils/helpers';
import {
  AvailableAndSelectedFiltersResponseProps,
  IColumn,
  IFilter,
  IQueryState,
} from '../interfaces/TurboTableType';

import { useDevice } from './useDevice';
import { useFiltersStorage } from './useFiltersStorage';

interface Iprops {
  columns: IColumn[];
  tableKey?: string;
  defaultQueryState: IQueryState;
}

export const useFilters = ({
  columns = [],
  tableKey,
  defaultQueryState,
}: Iprops) => {
  const { device } = useDevice();

  const { retrieveQueryState } = useFiltersStorage({ tableKey });
  const reducedFilters = useMemo(
    () =>
      columns
        .filter(({ filter }: IColumn) => !!filter)
        .reduce(
          (
            accumaltor: AvailableAndSelectedFiltersResponseProps,
            { filter }: IColumn
          ) =>
            mapAvailableAndSelectedFilters({
              accumaltor,
              filter,
              retrieveQueryState,
              defaultQueryState,
            }),
          {
            selecteds: [],
            options: [],
            defaultSelected: [],
            defaultOptions: [],
          }
        ),
    [columns, defaultQueryState, retrieveQueryState]
  );
  const [selectedFilters, setSelectedFilters] = useState<IFilter[]>(
    reducedFilters.selecteds
  );
  const [availableFilters, setAvailableFilters] = useState<IFilter[]>(
    reducedFilters.options
  );
  const [showFilter, setShowFilter] = useState(true);

  const displayedColumns =
    columns.filter(
      ({ devices }: IColumn) => !devices || devices?.includes(device)
    ) || [];
  const isResponsiveView = displayedColumns.length === 1;

  const toogleFilter = () => {
    setShowFilter(!showFilter);
  };

  const addFilter = (filter: IFilter) => {
    const newSeledFilters = [...selectedFilters, filter];
    const newAvailbleFilters = availableFilters.filter(
      ({ name }) => name !== filter.name
    );
    setSelectedFilters(newSeledFilters);
    setAvailableFilters(newAvailbleFilters);
  };

  const removeFilters = () => {
    setSelectedFilters(reducedFilters.defaultSelected);
    setAvailableFilters(reducedFilters.defaultOptions);
  };

  return {
    selectedFilters,
    availableFilters,
    showFilter,
    setAvailableFilters,
    addFilter,
    removeFilters,
    setSelectedFilters,
    toogleFilter,
    displayedColumns,
    isResponsiveView,
  };
};
