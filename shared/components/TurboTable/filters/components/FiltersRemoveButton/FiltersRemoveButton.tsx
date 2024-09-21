import { DataTableValue } from 'primereact/datatable';
import { faXmark } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { useTurboTableContext } from '@shared/components/TurboTable/context';

export const FiltersRemoveButton = <D extends DataTableValue>() => {
  const { removeFilters, clearHandler } = useTurboTableContext<D>();

  const removeFiltersHandler = () => {
    removeFilters();
    clearHandler();
  };
  return (
    <GenericButton
      buttonType="primary"
      rounded
      icon={faXmark}
      onClick={removeFiltersHandler}
      tooltip="Quitar filtros"
      tooltipOptions={{ position: 'left' }}
    />
  );
};
