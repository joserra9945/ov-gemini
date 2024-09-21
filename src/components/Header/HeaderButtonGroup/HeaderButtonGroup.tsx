import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ProgressBar } from 'primereact/progressbar';
import {
  faArrowRightFromBracket,
  faBell,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Notificaciones from '@shared/components/Notificaciones';

import { TokenSender } from '@shared/components/Legacy/TokenManager';

import LayoutContext from 'context/LayoutContext';
import { resetAlerts } from 'store/actions/actions-alert';
import { logout } from 'store/actions/actions-api';

import UserInfoHeader from '../UserInfoHeader/UserInfoHeader';

const HeaderButtonGroup: FC = () => {
  const dispatch = useDispatch();
  const op = useRef<any>(null);
  const [message, setMessage] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const { isMobile } = useContext(LayoutContext);

  const { token, refreshToken, cif } = useSelector(
    (store: any) => store.userState
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAlerts());
  };

  useEffect(() => {
    if (progressValue >= 100) {
      setMessage(
        JSON.stringify({
          token,
          refreshToken,
          dataKey: 'tokens',
          time: Date.now(),
          action: 'set',
          empresaNif: cif,
        })
      );
      setTimeout(() => {
        window.location.href = `${process.env.REACT_APP_ERP_URL}/shared-entry-point`;
      }, 500);
      setShowLoader(false);
    }
  }, [cif, progressValue, refreshToken, token]);

  useEffect(() => {
    if (showLoader) {
      const intervalId = setInterval(() => {
        setProgressValue((prevProgressValue) => {
          let val = prevProgressValue + 10;
          if (val >= 100) {
            val = 100;
            clearInterval(intervalId);
          }
          return val;
        });
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [showLoader]);

  return (
    <div className="flex items-center gap-2">
      <button
        className="mobile:hidden"
        type="button"
        tabIndex={0}
        onClick={() => {
          setShowLoader(true);
        }}
      >
        <img
          src={process.env.REACT_APP_ERP_ICON}
          alt="erp"
          className="min-w-16"
        />
      </button>

      <div className="border-r border-gray-300 mobile:border-white h-4/5" />

      <div className="relative block justify-content-center">
        <button
          type="button"
          onClick={(e) => {
            if (op && op.current && op.current.toggle) {
              op.current.toggle(e);
            }
          }}
          className="hover:text-secondary"
        >
          <FontAwesomeIcon
            icon={faBell}
            className="w-6 h-6 p-0.5 mobile:text-white"
          />
        </button>
        <OverlayPanel
          ref={op}
          showCloseIcon={false}
          pt={{ root: { className: 'mi-clase-custom-en-root' } }}
        >
          <Notificaciones />
        </OverlayPanel>
      </div>

      <div className="border-r border-gray-300 mobile:border-white h-4/5" />

      <UserInfoHeader />

      {!isMobile && (
        <>
          <div className="border-r border-gray-300 mobile:border-white h-4/5" />
          <div className="flex items-center justify-center p-2">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={() => handleLogout()}
              name="exit-outline"
              className="text-xl cursor-pointer hover:text-secondary"
            />
          </div>
        </>
      )}

      <TokenSender
        message={message}
        targetUrl={process.env.REACT_APP_ACCOUNTS || ''}
      />

      <Dialog
        visible={showLoader}
        closeOnEscape={false}
        className="buzon-empresas-loader"
        maskClassName="buzon-empresas-dialog__mask"
        closable={false}
        onHide={() => {}}
      >
        <div className="buzon-empresas-dialog__content-header">
          <img
            className="w-100"
            src={process.env.REACT_APP_ERP_LOGO}
            alt="Logo"
          />
        </div>
        <ProgressBar value={progressValue} showValue={false} />
      </Dialog>
    </div>
  );
};

export default HeaderButtonGroup;
