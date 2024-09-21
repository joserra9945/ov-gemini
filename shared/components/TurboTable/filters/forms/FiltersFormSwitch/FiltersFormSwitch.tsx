import { DataTableValue } from 'primereact/datatable';

import { GenericInpuSwitch } from '@shared/components/GenericInputSwitch';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

interface Iprops {
  filter: IFilter;
}

export const FiltersFormSwitch = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { name } = filter;
  const { queryState, onChangeQueryStateParams } = useTurboTableContext<D>();

  return (
    <GenericInpuSwitch
      checked={!!queryState.params[name || '']}
      onChange={(value) => {
        onChangeQueryStateParams({ [name || '']: value });
      }}
      wrapperClassName="flex justify-center"
    />
  );
};
