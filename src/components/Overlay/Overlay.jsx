import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { faArrowLeft, faCog, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './overlay.scss';

const useOutside = (ref, closeOnClickOutside, setter) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setter(false);
      }
    };
    if (closeOnClickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (closeOnClickOutside) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [closeOnClickOutside, ref, setter]);
};

const Overlay = ({
  parentRef,
  children,
  header,
  isOpen = false,
  setIsOpen,
  showCloseIcon,
  showSettingsIcon,
  settingsBody,
  className,
  closeOnClickOutside,
  onClose,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const wrapperRef = useRef(null);

  useOutside(wrapperRef, closeOnClickOutside ?? false, (e) => {
    setIsOpen(e);
    setIsSettingsOpen(e);
  });

  const renderOverlay = () => {
    if (isOpen) {
      return (
        <div
          className={`g-overlay-wrapper${className ? ` ${className}` : ''}`}
          ref={wrapperRef}
        >
          <span className="g-overlay-pointer" />
          <div className="g-overlay">
            <div className="g-overlay-header">
              {isSettingsOpen ? (
                <div className="g-overlay__settings">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="g-overlay__arrow-icon"
                    onClick={() => setIsSettingsOpen(false)}
                  />
                  <span className="overlay__title">Configuración</span>
                </div>
              ) : (
                <p className="overlay__title">{header}</p>
              )}
              <div className="g-overlay__header-icons">
                {showSettingsIcon && (
                  <FontAwesomeIcon
                    icon={faCog}
                    className="g-overlay__cog-icon action__header"
                    onClick={() => !isSettingsOpen && setIsSettingsOpen(true)}
                    color={isSettingsOpen ? '#0069aa' : undefined}
                  />
                )}
                {showCloseIcon && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="g-overlay__close-icon action__header"
                    onClick={() => {
                      onClose();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="g-overlay-body">
              {isSettingsOpen && settingsBody ? settingsBody : children}
            </div>
          </div>
        </div>
      );
    }
  };
  return parentRef.current
    ? createPortal(renderOverlay(), parentRef.current)
    : null;
};

export default Overlay;
