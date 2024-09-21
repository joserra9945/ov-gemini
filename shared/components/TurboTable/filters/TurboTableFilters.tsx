import { DataTableValue } from 'primereact/datatable';

import { useTurboTableContext } from '../context';
import { IFilter } from '../interfaces/TurboTableType';

import {
  FiltersAddButton,
  FiltersClearButton,
  FiltersItemButton,
  FiltersRemoveButton,
} from './components';

export const TurboTableFilters = <D extends DataTableValue>() => {
  const { showFilter, selectedFilters, hasFilter } = useTurboTableContext<D>();

  return showFilter && hasFilter ? (
    <div className="w-full flex flex-row flex-wrap justify-between gap-2 px-5">
      <div className="w-full flex flex-row flex-wrap gap-2 max-h-40 lg:max-h-none overflow-y-auto py-2">
        {selectedFilters.map((filter: IFilter) => (
          <FiltersItemButton filter={filter} />
        ))}
        <div className="flex-grow flex flex-row justify-end gap-2 px-2">
          <FiltersAddButton />
          <FiltersClearButton />
          <FiltersRemoveButton />
        </div>
      </div>
    </div>
  ) : null;
};
