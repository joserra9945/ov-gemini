import { DataTableValue } from 'primereact/datatable';

import { useTurboTableContext } from '@shared/components/TurboTable/context';
import {
  IFilter,
  IOption,
} from '@shared/components/TurboTable/interfaces/TurboTableType';

interface Iprops {
  filter: IFilter;
}

export const FiltersFormSelect = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { name, options = [], itemTemplate } = filter;
  const filterName = name || '';
  const { onChangeTemporaryParams, temporaryParams } =
    useTurboTableContext<D>();

  const isSelected = (value: number | string | boolean) =>
    temporaryParams.params[filterName] === value;

  return (
    <>
      {options.map(({ label, value, className }: IOption) => (
        <button
          type="button"
          onClick={() => onChangeTemporaryParams({ [filterName]: value })}
        >
          {itemTemplate ? (
            itemTemplate({ label, value, className })
          ) : (
            <span
              className={`px-4 py-2 flex justify-start text-left hover:bg-blue-100 hover:font-bold ${
                isSelected(value) ? 'bg-blue-100 font-bold' : ''
              }`}
            >
              {label}
            </span>
          )}
        </button>
      ))}
    </>
  );
};
