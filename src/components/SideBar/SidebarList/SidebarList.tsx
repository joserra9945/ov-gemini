import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LayoutContext from 'context/LayoutContext';

import { PathItem } from '../interfaces/SidebarInterfaces';
import { SideBarItem } from '../SidebarItem/SideBarItem';

interface IProps {
  itemsList: PathItem[];
}

export const SidebarList: FC<IProps> = ({ itemsList }) => {
  const { collapsedSidebar } = useContext(LayoutContext);
  const navigate = useNavigate();

  const handleClick = (item: PathItem) => {
    if (item.path) {
      navigate(item.path, { replace: true });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {itemsList.map((item) => (
        <div className="mt-5" key={item.key}>
          {!collapsedSidebar && (
            <h3 className="uppercase text-secondary font-medium text-sm pl-4 text-left">
              {item.title}
            </h3>
          )}
          {item.children && (
            <ul
              className={`flex flex-col gap-6 pt-4 ${
                collapsedSidebar ? '' : 'pl-8 pr-2'
              }`}
            >
              {item.children.map((children) => {
                return (
                  <SideBarItem
                    key={children.key}
                    menuItem={children}
                    onClick={handleClick}
                  />
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
