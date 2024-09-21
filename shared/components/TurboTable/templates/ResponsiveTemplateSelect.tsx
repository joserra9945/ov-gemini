import { DataTableValue } from 'primereact/datatable';

import { GenericCheckbox } from '@shared/components/GenericCheckbox';
import { GenericInpuRadio } from '@shared/components/GenericInputRadio';

import { useTurboTableContext } from '../context';

interface TurboTableResponsiveSelectTemplateProps<T> {
  row: T;
}

export const TurboTableResponsiveSelectTemplate = <D extends DataTableValue>({
  row,
}: TurboTableResponsiveSelectTemplateProps<D>) => {
  const {
    onExternalSelectionChange,
    selection,
    hasSelection,
    isMultipleSelection,
  } = useTurboTableContext<D>();
  const isSelected =
    isMultipleSelection &&
    ((selection || []) as D[]).some(({ id }: D) => row.id === id);

  return hasSelection ? (
    <div onClick={(e) => e.stopPropagation()} role="button" tabIndex={0}>
      {isMultipleSelection ? (
        <GenericCheckbox
          checked={isSelected}
          className="mr-2"
          onChange={() => onExternalSelectionChange(row)}
        />
      ) : (
        <GenericInpuRadio
          checked={row.id === (selection as D)?.id}
          onChange={() => onExternalSelectionChange(row)}
        />
      )}
    </div>
  ) : null;
};
