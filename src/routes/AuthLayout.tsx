import { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';

import LayoutContext from 'context/LayoutContext';
import HeaderNew from 'components/Header/Header';
import SideBar from 'components/SideBar';

interface IProps {
  logged: boolean;
  currentAlert: any;
  items: any;
  getCurrentAlert: () => void;
}

const AuthLayout: FC<IProps> = ({ logged }) => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggle = () => {
    setCollapsedSidebar((prev) => !prev);
  };

  const contextValues = useMemo(
    () => ({
      hiddenSidebar,
      isMobile,
      hiddenHeader,
      collapsedSidebar,
      setHiddenSidebar,
      setHiddenHeader,
      setCollapsedSidebar,
      setIsMobile,
      toggle,
    }),
    [collapsedSidebar, hiddenHeader, hiddenSidebar, isMobile]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 639);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const redirectToAccountsLogin = () => {
    window.location.replace(`${process.env.REACT_APP_MY_ACCOUNT}/login/ops`);
    return null;
  };

  return logged ? (
    <LayoutContext.Provider value={contextValues}>
      <div className="flex w-full h-full ">
        {!hiddenSidebar && (
          <div className="h-full">
            <SideBar />
          </div>
        )}
        <div className="flex flex-col flex-grow overflow-auto">
          {!hiddenHeader && (
            <div className="flex flex-shrink-0 w-full mb-0.5">
              <HeaderNew />
            </div>
          )}
          <div className="flex flex-grow overflow-auto w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  ) : (
    redirectToAccountsLogin()
  );
};

const mapStateToProps = (state: any) => ({
  logged: state.userState.logged,
});

const PrivateAuthLayout = connect(mapStateToProps)(AuthLayout);

export default PrivateAuthLayout;
