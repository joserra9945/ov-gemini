import { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  faChevronDown,
  faChevronUp,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Notifications from '@shared/utils/notificationsOv';

import LayoutContext from 'context/LayoutContext';
import UserMenu from 'components/UserMenu/UserMenu';

const UserInfoHeader: FC = () => {
  const [show, setShow] = useState(false);
  const { userName, cif, razonSocial, lastName } = useSelector(
    (state: any) => state.userState
  );

  const { isMobile } = useContext(LayoutContext);
  const handleClick = () => {
    setShow(!show);
  };

  const copyToClipboard = () => {
    if (cif) {
      navigator.clipboard.writeText(cif);
      Notifications.info({ body: '¡Copiado!' });
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="flex gap-2 items-center"
      >
        {isMobile ? (
          <div>
            <FontAwesomeIcon className="w-6 h-6 text-white" icon={faUser} />
          </div>
        ) : (
          <>
            {razonSocial && (
              <div className="h-8 w-8 rounded-full bg-primary flex justify-center items-center hover:bg-secondary">
                <p className="text-white text-sm hover:text-secondary">
                  {razonSocial.toString().substring(0, 2)}
                </p>
              </div>
            )}
            <div className="flex flex-col ">
              <h3 className="uppercase max-w-72 text-sm font-medium truncate justify-start">
                {`${razonSocial || ''}`}
              </h3>
              <p className="text-xs truncate justify-start">
                {userName} {lastName}
              </p>
              {cif && (
                <p className="cursor-pointer hover:text-secondary justify-start">
                  <small
                    onClick={copyToClipboard}
                    role="textbox"
                    tabIndex={-1}
                    title="Copiar cif"
                  >
                    ({cif})
                  </small>
                </p>
              )}
            </div>
            <div>
              <FontAwesomeIcon
                className="w-6 h-6"
                icon={!show ? faChevronDown : faChevronUp}
              />
            </div>
          </>
        )}
      </button>
      <UserMenu showCambiarEmpresa={show} setShowCambiarEmpresa={setShow} />
    </div>
  );
};

export default UserInfoHeader;
