import { FC, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';

import LayoutContext from 'context/LayoutContext';

import { PathItem } from '../interfaces/SidebarInterfaces';

interface IProps {
  menuItem: PathItem;
  onClick: (elem: PathItem) => void;
}

export const SideBarItem: FC<IProps> = ({ menuItem, onClick }) => {
  const location = useLocation();
  const { collapsedSidebar } = useContext(LayoutContext);

  return (
    <li className="flex" key={menuItem.key}>
      <button
        type="button"
        onClick={() => onClick(menuItem)}
        key={menuItem.key}
        className={`flex cursor-pointer gap-2 hover:text-secondary w-full ${
          location.pathname === menuItem.path && 'text-secondary'
        } ${
          collapsedSidebar
            ? 'items-center w-full justify-center flex-col'
            : 'flex-row'
        }`}
      >
        {menuItem.icon && (
          <Tooltip content={menuItem.title} place="right">
            <div className="w-6 h-6 relative">
              <FontAwesomeIcon className="w-6 h-6" icon={menuItem.icon} />
              {menuItem.hasNotification && (
                <span className="position-absolute flex h-1.5 w-1.5 right-1 top-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-warning" />
                </span>
              )}
            </div>
          </Tooltip>
        )}
        {!collapsedSidebar && (
          <div className="flex items-center w-full h-full gap-2 self-center">
            <p className="flex items-center whitespace-nowrap self-center text-sm font-normal grow justify-start h-full">
              {menuItem.title}
            </p>
          </div>
        )}
      </button>
    </li>
  );
};
