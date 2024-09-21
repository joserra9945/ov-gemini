import { DataTableValue } from 'primereact/datatable';

import { GenericCheckbox } from '@shared/components/GenericCheckbox';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import {
  IFilter,
  IOption,
} from '@shared/components/TurboTable/interfaces/TurboTableType';

interface Iprops {
  filter: IFilter;
}

export const FiltersFormMultiSelect = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { name, options = [], itemTemplate } = filter;
  const { onChangeTemporaryParams, temporaryParams } =
    useTurboTableContext<D>();
  const filterName = name || '';
  const filterValue = (temporaryParams.params[filterName] || []) as any[];

  const isSelected = (value: number | string | boolean) =>
    filterValue.includes(value);

  const onChangeHandler = (value: number | string | boolean) => {
    const alreadySelected = isSelected(value);

    const newSelects = alreadySelected
      ? filterValue.filter((selected: any) => selected !== value)
      : [...filterValue, value];
    onChangeTemporaryParams({ [filterName]: newSelects });
  };

  return (
    <>
      {options.map(({ label, value, className }: IOption) => (
        <button
          type="button"
          onClick={() => onChangeHandler(value)}
          className="px-4 py-2 flex justify-start text-left"
        >
          <GenericCheckbox
            className="mr-2 my-auto"
            checked={filterValue.includes(value)}
          />

          {itemTemplate ? itemTemplate({ label, value, className }) : label}
        </button>
      ))}
    </>
  );
};
