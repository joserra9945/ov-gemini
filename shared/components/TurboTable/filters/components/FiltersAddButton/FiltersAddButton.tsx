import { SyntheticEvent, useRef } from 'react';
import { DataTableValue } from 'primereact/datatable';
import { OverlayPanel } from 'primereact/overlaypanel';

import { GenericButton } from '@shared/components/GenericButton';
import { GenericOverlaypanel } from '@shared/components/GenericOverlaypanel';
import { useTurboTableContext } from '@shared/components/TurboTable/context';
import { IFilter } from '@shared/components/TurboTable/interfaces/TurboTableType';

export const FiltersAddButton = <D extends DataTableValue>() => {
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const { addFilter, availableFilters } = useTurboTableContext<D>();

  const toogleOverlaypanel = (e: SyntheticEvent<Element, Event>) => {
    overlayPanelRef?.current?.toggle?.(e);
  };

  const addFilterHandler = (
    e: SyntheticEvent<Element, Event>,
    option: IFilter
  ) => {
    addFilter(option);
    toogleOverlaypanel(e);
  };

  return (
    <>
      <GenericButton
        buttonType="none"
        className="h-full disabled:text-gray-300"
        onClick={toogleOverlaypanel}
        disabled={!availableFilters.length}
      >
        + Añadir filtro
      </GenericButton>
      <GenericOverlaypanel overlaypanelRef={overlayPanelRef}>
        <div className="flex flex-col gap-2 w-full cursor-pointer min-w-52">
          {availableFilters.map((option: IFilter) => (
            <button
              type="button"
              onClick={(e) => addFilterHandler(e, option)}
              className="px-4 py-2 flex justify-start hover:bg-blue-100 hover:font-bold"
            >
              {option.label}
            </button>
          ))}
        </div>
      </GenericOverlaypanel>
    </>
  );
};
