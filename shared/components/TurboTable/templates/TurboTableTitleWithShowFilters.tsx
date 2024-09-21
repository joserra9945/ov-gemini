import { ReactNode } from 'react';
import { DataTableValue } from 'primereact/datatable';

import { useTurboTableContext } from '../context';
import { FiltersSwitch } from '../filters/components/FiltersSwitch';

interface TurboTableHeaderProps {
  title?: ReactNode;
}
export const TurboTableTitleWithShowFilters = <D extends DataTableValue>({
  title,
}: TurboTableHeaderProps) => {
  const { hasFilter } = useTurboTableContext<D>();

  return title || hasFilter ? (
    <div className="flex flex-row gap-2 p-5">
      {title && (
        <div className="flex justify-center  text-2xl font-medium">{title}</div>
      )}
      <div className="flex flex-grow justify-end">
        <FiltersSwitch />
      </div>
    </div>
  ) : null;
};
