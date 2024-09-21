import React, { useState } from 'react';
import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  IconDefinition,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { alertType, getAlertClass } from './utils';

interface AlertProps {
  type?: string;
  onIcon?: IconDefinition;
  message: string | JSX.Element;
  canHide?: boolean;
  linkLabel?: string;
  linkFunction?: () => void;
  dialogToShow?: (
    isOpen: boolean,
    toggle: () => void,
    nextStep: () => void
  ) => React.ReactNode;
  onClose?: () => void;
  onClear?: (id?: string) => void;
  id?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = 'alert-info',
  onIcon = null,
  message,
  canHide = false,
  linkLabel,
  linkFunction,
  dialogToShow,
  onClose = () => console.error('close'),
  onClear,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const nextStep = () => {
    if (onClear && id) {
      onClear(id);
    }
  };

  const handleOnClick = () => {
    toggle();
    linkFunction?.();
  };

  const getIcon = () => {
    switch (type) {
      case alertType.WARNING:
        return faExclamationTriangle;
      case alertType.ERROR:
        return faExclamationCircle;
      case alertType.SIMPLE:
        return onIcon || faExclamationCircle;
      default:
        return faExclamationCircle;
    }
  };

  return (
    <>
      <div
        className={`w-full flex items-center justify-between self-center ${getAlertClass(
          type
        )}`}
      >
        <div className="flex items-center">
          {((alertType.SIMPLE === type && onIcon) ||
            (alertType.SIMPLE !== type && !onIcon)) && (
            <span className="mr-4 text-secondary">
              <FontAwesomeIcon icon={getIcon()} />
            </span>
          )}
          <span>
            {message}{' '}
            {linkLabel && (
              <span
                aria-hidden="true"
                className="cursor-pointer underline font-bold"
                onClick={() => handleOnClick()}
              >
                {linkLabel}
              </span>
            )}
          </span>
        </div>
        <div
          aria-hidden
          onClick={onClose}
          tabIndex={0}
          role="button"
          className="flex items-center"
        >
          {canHide && (
            <span className="ml-4 cursor-pointer text-danger">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          )}
        </div>
      </div>
      {dialogToShow && dialogToShow(isOpen, toggle, nextStep)}
    </>
  );
};

export default Alert;
