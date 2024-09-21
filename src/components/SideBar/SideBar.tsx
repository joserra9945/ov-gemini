import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faArrowRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LayoutContext from 'context/LayoutContext';
import { resetAlerts } from 'store/actions/actions-alert';
import { logout } from 'store/actions/actions-api';

import Paths, { restructuredArray } from './constants/paths';
import { SidebarList } from './SidebarList/SidebarList';

export const SideBar = () => {
  const [menuItems, setMenuItems] = useState(Paths.filter((item) => !item.ad));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { collapsedSidebar, isMobile } = useContext(LayoutContext);
  const hayLibrador = useSelector(
    (store: any) => store.userState.cif !== undefined
  );
  const { isAdUser, libradorId } = useSelector((store: any) => store.userState);

  const filterByAd = useCallback((adValue: boolean) => {
    return restructuredArray
      .filter((item) => item.ad === adValue)
      .map((elem) => {
        return {
          ...elem,
          children: elem.children?.filter((e) => e.ad === adValue),
        };
      });
  }, []);

  useEffect(() => {
    if (isAdUser) {
      if (libradorId) {
        setMenuItems(restructuredArray);
      } else {
        setMenuItems(filterByAd(true));
      }
    } else {
      setMenuItems(filterByAd(false));
    }
  }, [filterByAd, hayLibrador, isAdUser, libradorId]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAlerts());
  };

  return (
    <div
      className={`z-10 h-full ${
        collapsedSidebar
          ? 'w-[100px]  mobile:hidden'
          : 'w-[260px]  mobile:absolute mobile:top-20 rounded-sm'
      } ${
        isMobile && 'max-h-[calc(100%-80px)]'
      } transition-all ease-in-out duration-300`}
    >
      <div className="flex flex-col bg-primary text-white h-full w-full min-w-[100px]">
        <div
          role="button"
          tabIndex={0}
          className="mobile:hidden h-20 flex flex-wrap px-4 pt-4 justify-center"
          onClick={() => navigate('/', { replace: true })}
        >
          <img
            alt="Logo de aplicación"
            src={
              collapsedSidebar
                ? process.env.REACT_APP_LOGO_BLANCO_SMALL
                : process.env.REACT_APP_LOGO_BLANCO
            }
          />
        </div>
        <div className="grow">
          <SidebarList itemsList={menuItems} />
        </div>
        {isMobile && (
          <button
            type="button"
            className="flex cursor-pointer gap-2 text-white hover:text-secondary w-full h-8 mb-16 items-center pl-8"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={() => handleLogout()}
              name="exit-outline"
              className="text-xl cursor-pointer"
            />
            <p className="flex items-center whitespace-nowrap self-center text-sm font-normal grow justify-start h-full">
              Cerrar sesión
            </p>
          </button>
        )}
      </div>
    </div>
  );
};
