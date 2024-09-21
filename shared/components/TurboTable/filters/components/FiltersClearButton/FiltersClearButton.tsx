import { DataTableValue } from 'primereact/datatable';
import { faEraser } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { useTurboTableContext } from '@shared/components/TurboTable/context';

export const FiltersClearButton = <D extends DataTableValue>() => {
  const { filtersHadbeenModyfied, clearHandler } = useTurboTableContext<D>();

  return (
    <GenericButton
      disabled={!filtersHadbeenModyfied}
      buttonType="primary"
      rounded
      icon={faEraser}
      onClick={clearHandler}
      tooltip="Limpiar filtros"
      tooltipOptions={{ position: 'left' }}
    />
  );
};
