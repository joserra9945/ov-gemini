import { MouseEvent, ReactNode } from 'react';
import { DataTableRowClickEvent, DataTableValue } from 'primereact/datatable';

import { useTurboTableContext } from '../context';

import { TurboTableResponsiveExpanderTemplate } from './ResponsiveTemplateExpander';
import { TurboTableResponsiveSelectTemplate } from './ResponsiveTemplateSelect';

interface TurboTableResponsiveTemplateProps {
  header: {
    left: ReactNode;
    right: ReactNode;
  };
  content: {
    label: ReactNode;
    value: ReactNode;
  }[];
}

export const TurboTableResponsiveTemplate = <T extends DataTableValue>(
  data: TurboTableResponsiveTemplateProps,
  row: T
) => {
  const { onRowClick } = useTurboTableContext<T>();

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    onRowClick?.({ originalEvent: e, data: row } as DataTableRowClickEvent);
    e.stopPropagation();
  };

  return (
    <div className="w-full" onClick={clickHandler} role="button" tabIndex={0}>
      <div className="flex flex-row justify-between px-4 py-4 border-t border-b">
        <div className="flex flex-row">
          <TurboTableResponsiveSelectTemplate row={row} />
          <TurboTableResponsiveExpanderTemplate row={row} />
          <div className="text-info-20 text-base max-w-80">
            {data.header.left}
          </div>
        </div>

        {data.header.right}
      </div>
      <div className="px-4 py-2">
        {data.content.map(({ label, value }) => (
          <div className="flex flex-row justify-between mb-2">
            <div className="mb-2 truncate">{label}</div>
            <div className="mb-2 font-semibold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
