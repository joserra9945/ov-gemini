import { DataTableValue } from 'primereact/datatable';
import { faSearch } from '@fortawesome/pro-light-svg-icons';

import { GenericInputText } from '@shared/components/GenericInputText';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

interface Iprops {
  filter: IFilter;
}

export const FiltersFormInputText = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { name } = filter;
  const filterName = name || '';
  const { onChangeTemporaryParams, temporaryParams } =
    useTurboTableContext<D>();
  return (
    <GenericInputText
      value={temporaryParams.params[filterName] as string}
      onChange={(value) => onChangeTemporaryParams({ [filterName]: value })}
      wrapperClassName="px-4 mt-5"
      rightIcon={faSearch}
    />
  );
};
