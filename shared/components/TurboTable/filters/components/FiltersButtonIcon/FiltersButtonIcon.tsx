import { SyntheticEvent } from 'react';
import { DataTableValue } from 'primereact/datatable';
import { faChevronDown, faXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GenericButton } from '@shared/components/GenericButton';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

import { FiltersFormSwitch } from '../../forms/FiltersFormSwitch';

interface Iprops {
  filter: IFilter;
}

export const FiltersButtonIcon = <D extends DataTableValue>({
  filter,
}: Iprops) => {
  const { clearable, name, start, end } = filter;
  const { queryState, clearSingleFilter } = useTurboTableContext<D>();

  const filterName = start?.name || end?.name || name || '';

  const onClearFilterItem = (e: SyntheticEvent<Element, Event>) => {
    e.stopPropagation();
    const params = [
      ...(start ? [start?.name] : []),
      ...(end ? [end?.name] : []),
      ...(name ? [name] : []),
    ];
    clearSingleFilter(params);
  };

  if (filter.type === 'switch') {
    return <FiltersFormSwitch filter={filter} />;
  }

  if (clearable && !!queryState.params[filterName]) {
    return (
      <GenericButton
        buttonType="secondary"
        className="scale-75"
        rounded
        icon={faXmark}
        onClick={onClearFilterItem}
      />
    );
  }

  return <FontAwesomeIcon icon={faChevronDown} />;
};
