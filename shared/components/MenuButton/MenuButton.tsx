import { useRef } from 'react';
import { Button, ButtonProps } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { IconType } from 'primereact/utils';
import { faEllipsisVertical } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

export interface IItems {
  label: string;
  icon: string | IconType<ButtonProps>;
  command: () => void;
  disabled?: boolean;
}

interface IItemsList {
  items: IItems[];
}

const MenuButton = ({ items }: IItemsList) => {
  const menu = useRef<Menu>(null);
  return (
    <div className="flex justify-content-center">
      <Menu model={items} popup ref={menu} className="gap-4 flex" />
      <Button
        icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
        onClick={(e) => menu.current?.toggle(e)}
        className="p-button-text"
        style={{ color: 'black' }}
      />
    </div>
  );
};

export default MenuButton;
