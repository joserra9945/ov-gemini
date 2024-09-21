import { KeyboardEvent, SyntheticEvent, useRef } from 'react';
import { DataTableValue } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';

import { GenericButton } from '@shared/components/GenericButton';
import { GenericOverlaypanel } from '@shared/components/GenericOverlaypanel';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

import { FiltersForms } from '../../forms';
import { FiltersApplyButton } from '../FiltersApplyButton';
import { FiltersButtonIcon } from '../FiltersButtonIcon';
import { FiltersCancelButton } from '../FiltersCancelButton';

interface IProps {
  filter: IFilter;
}

export const FiltersItemButton = <D extends DataTableValue>({
  filter,
}: IProps) => {
  const { className, icon } = filter;
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const { cancelHandler, applyHandler, filterButtonPropsGetter } =
    useTurboTableContext<D>();

  const { buttonType, label: buttonLabel } = filterButtonPropsGetter(filter);

  const hideOverlaypanel = (event: SyntheticEvent<Element, Event>) => {
    filter.type !== 'switch' && overlayPanelRef?.current?.toggle(event);
  };

  const onApply = (e: SyntheticEvent<Element, Event>) => {
    applyHandler();
    hideOverlaypanel(e);
  };

  const onCancel = (e: SyntheticEvent<Element, Event>) => {
    cancelHandler();
    hideOverlaypanel(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onApply(e);
    }
  };

  return (
    <>
      <GenericButton
        buttonType={buttonType}
        className={`w-full h-10 flex justify-center ${className}`}
        onClick={hideOverlaypanel}
        icon={icon}
      >
        {buttonLabel}
        <FiltersButtonIcon filter={filter} />
      </GenericButton>
      <GenericOverlaypanel
        overlaypanelRef={overlayPanelRef}
        onHide={cancelHandler}
      >
        <div
          role="button"
          tabIndex={0}
          className="flex flex-col gap-2 w-[300px]"
          onKeyDown={handleKeyDown}
        >
          <div className="flex flex-col gap-2 p-2 overflow-y-auto max-h-[200px]">
            <FiltersForms filter={filter} />
          </div>

          <div className="p-5 flex justify-end gap-2">
            <FiltersCancelButton onCancel={onCancel} />
            <FiltersApplyButton onApply={onApply} />
          </div>
        </div>
      </GenericOverlaypanel>
    </>
  );
};
