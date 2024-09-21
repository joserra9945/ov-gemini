import { DataTableValue } from 'primereact/datatable';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useTurboTableContext } from '../context';

interface TurboTableResponsiveSelectTemplateProps<T> {
  row: T;
}

export const TurboTableResponsiveExpanderTemplate = <T extends DataTableValue>({
  row,
}: TurboTableResponsiveSelectTemplateProps<T>) => {
  const { hasExpansion, onExternalRowToggle, isRowExpanded } =
    useTurboTableContext<T>();

  return hasExpansion ? (
    <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0}>
      <FontAwesomeIcon
        className="ml-1 mr-3 my-auto cursor-pointer text-gray-500"
        icon={isRowExpanded(row) ? faChevronDown : faChevronRight}
        onClick={() => onExternalRowToggle(row)}
      />
    </div>
  ) : null;
};
