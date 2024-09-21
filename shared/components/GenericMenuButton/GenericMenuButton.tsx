import { FC, useRef } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Menu } from 'primereact/menu';
import { faEllipsisVertical } from '@fortawesome/pro-light-svg-icons';

import { MenuPassThrough } from '@shared/styles/primereact/passThrough/MenuPt';

import { GenericButton } from '../GenericButton';

interface ILibraryParams {
  label: string;
  icon: () => JSX.Element;
  command: () => void;
  disabled?: boolean;
}
interface IILibraryParamsList {
  items: ILibraryParams[];
}

const GenericMenuButton: FC<IILibraryParamsList> = ({ items }) => {
  const menu = useRef<Menu>(null);

  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: { menu: MenuPassThrough },
      }}
    >
      <div className="flex justify-content-center">
        <Menu model={items} popup ref={menu} className="gap-4 flex" />
        <GenericButton
          icon={faEllipsisVertical}
          onClick={(e) => menu.current?.toggle(e)}
          buttonType="none"
        />
      </div>
    </PrimeReactProvider>
  );
};

export default GenericMenuButton;
