import { FC, ReactNode } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { DataTableValueArray } from 'primereact/datatable';
import { Tooltip, TooltipPassThroughOptions } from 'primereact/tooltip';
import { nanoid } from 'nanoid';

import {
  DataTablePassThrough,
  ListBoxPassThrough,
  OverlayPanelPassThrough,
  TooltipPassThrough,
} from '@shared/styles/primereact/passThrough';

export interface ITooltipTarget {
  target: string;
}

interface IProps {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'mouse';
  content: ReactNode;
  children: FC<ITooltipTarget>;
  pt?: TooltipPassThroughOptions;
}

const GenericTooltip: FC<IProps> = ({
  content,
  children: TargetComponent,
  position = 'top',
  pt,
}) => {
  const target = `tooltip_${nanoid()}`;

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          datatable: DataTablePassThrough<DataTableValueArray>(),
          overlaypanel: OverlayPanelPassThrough,
          listbox: ListBoxPassThrough,
          tooltip: TooltipPassThrough,
        },
      }}
    >
      <>
        <Tooltip
          target={`.${target}`}
          position={position}
          pt={pt}
          showDelay={100}
        >
          {content}
        </Tooltip>
        <TargetComponent target={target} />
      </>
    </PrimeReactProvider>
  );
};

export default GenericTooltip;
