import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { DataTableValueArray } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';

import {
  DataTablePassThrough,
  ListBoxPassThrough,
  OverlayPanelPassThrough,
  SkeletonPassThrough,
  TooltipPassThrough,
} from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  className?: string;
  width?: string;
}

type IProps = ILibraryParams;

const GenericSkeleton: FC<IProps> = ({ className, ...rest }) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          datatable: DataTablePassThrough<DataTableValueArray>(),
          overlaypanel: OverlayPanelPassThrough,
          listbox: ListBoxPassThrough,
          tooltip: TooltipPassThrough,
          skeleton: SkeletonPassThrough,
        },
      }}
    >
      <Skeleton className={className ?? '!h-2 !bg-gray-300'} {...rest} />
    </PrimeReactProvider>
  );
};

export default GenericSkeleton;
