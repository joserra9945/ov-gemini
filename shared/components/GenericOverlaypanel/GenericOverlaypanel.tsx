import { FC, LegacyRef, ReactNode } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { OverlayPanel } from 'primereact/overlaypanel';

import { OverlayPanelPassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  className?: string;
  overlaypanelRef?: LegacyRef<OverlayPanel>;
  children?: ReactNode;
  onHide?: () => void;
}

type IProps = ILibraryParams;

const GenericOverlaypanel: FC<IProps> = ({
  className,
  overlaypanelRef,
  children,
  onHide,
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: {
          overlaypanel: OverlayPanelPassThrough,
        },
      }}
    >
      <OverlayPanel ref={overlaypanelRef} className={className} onHide={onHide}>
        {children}
      </OverlayPanel>
    </PrimeReactProvider>
  );
};

export default GenericOverlaypanel;
