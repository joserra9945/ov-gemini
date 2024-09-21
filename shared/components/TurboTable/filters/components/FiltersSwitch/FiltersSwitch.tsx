import { DataTableValue } from 'primereact/datatable';
import { faFilter, faXmarkCircle } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { useTurboTableContext } from '@shared/components/TurboTable/context';

interface Iprops {
  wrapperCalssName?: string;
}

export const FiltersSwitch = <D extends DataTableValue>({
  wrapperCalssName,
}: Iprops) => {
  const { showFilter, toogleFilter, hasFilter } = useTurboTableContext<D>();

  return hasFilter ? (
    <GenericButton
      buttonType="none"
      rounded
      icon={showFilter ? faXmarkCircle : faFilter}
      onClick={toogleFilter}
      className="scale-125"
      wrapperClassName={`flex justufy-center mr-3 ${wrapperCalssName || ''}`}
      tooltip={showFilter ? 'Esconder filtros' : 'Mostrar filtros'}
      tooltipOptions={{ position: 'left' }}
    />
  ) : null;
};
