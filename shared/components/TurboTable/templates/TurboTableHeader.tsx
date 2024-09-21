import { ReactNode } from 'react';

import { TurboTableFilters } from '../filters';

import { TurboTableResponsiveSelectAllTemplate } from './ResponsiveTemplateSelectAll';
import { TurboTableTitleWithShowFilters } from './TurboTableTitleWithShowFilters';

interface TurboTableHeaderProps {
  customHeader?: ReactNode;
  title?: ReactNode;
}
export const TurboTableHeader = ({
  customHeader,
  title,
}: TurboTableHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        {customHeader || <TurboTableTitleWithShowFilters title={title} />}
      </div>
      <TurboTableFilters />
      <TurboTableResponsiveSelectAllTemplate />
    </div>
  );
};
