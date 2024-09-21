import { useContext, useEffect } from 'react';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LayoutContext from 'context/LayoutContext';
import { GlobalTokenSenderContext } from 'components/GlobalTokenSender/GlobalTokenSender';

import HeaderButtonGroup from './HeaderButtonGroup/HeaderButtonGroup';

const HeaderNew = () => {
  const { toggle, isMobile } = useContext(LayoutContext);
  const { clearAccountsDomainStorage } = useContext(GlobalTokenSenderContext);
  useEffect(() => {
    clearAccountsDomainStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className="h-20 flex flex-grow justify-between gap-4 items-center p-2 shadow-sm laptop:w-[300px] mobile:bg-primary">
      <button
        type="button"
        onClick={() => toggle()}
        className={`h-10 text-primary ${
          isMobile && 'text-white'
        } hover:text-secondary`}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
      {isMobile && (
        <div>
          <img
            alt="Logo de aplicación"
            src={process.env.REACT_APP_LOGO_BLANCO}
          />
        </div>
      )}
      <div
        className={`flex ${!isMobile && 'flex-grow'} flex-row-reverse h-full`}
      >
        <HeaderButtonGroup />
      </div>
    </nav>
  );
};

export default HeaderNew;
