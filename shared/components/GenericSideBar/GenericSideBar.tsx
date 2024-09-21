import { FC } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { CSSTransitionProps } from 'primereact/csstransition';
import { Sidebar } from 'primereact/sidebar';

import { SideBarPassThrough } from '@shared/styles/primereact/passThrough';

interface ILibraryParams {
  visible: boolean;
  onHide: () => void;
  position?: 'left' | 'top' | 'bottom' | 'right';
  showCloseIcon?: boolean;
  children: JSX.Element;
  maskClassName?: string;
}

const GenericSideBar: FC<ILibraryParams> = ({
  position = 'right',
  maskClassName = 'w-[500px]',
  ...rest
}) => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { sidebar: SideBarPassThrough },
      }}
    >
      <Sidebar
        transitionOptions={{ disabled: true } as CSSTransitionProps}
        position={position}
        {...rest}
        maskClassName={maskClassName}
      />
    </PrimeReactProvider>
  );
};

export default GenericSideBar;
