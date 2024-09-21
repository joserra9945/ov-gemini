import { DataTableValue } from 'primereact/datatable';

import { GenericCheckbox } from '@shared/components/GenericCheckbox';

import { useTurboTableContext } from '../context';

export const TurboTableResponsiveSelectAllTemplate = <
  D extends DataTableValue
>() => {
  const {
    selectAll,
    onSelectAllChange,
    hasSelection,
    isResponsiveView,
    isMultipleSelection,
  } = useTurboTableContext<D>();
  return hasSelection && isResponsiveView && isMultipleSelection ? (
    <div className="flex flex-row p-4">
      <GenericCheckbox
        checked={selectAll}
        className="mr-2"
        onChange={onSelectAllChange}
      />
      <div className="text-base">Seleccionar todo</div>
    </div>
  ) : null;
};
