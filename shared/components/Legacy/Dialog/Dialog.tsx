/* eslint-disable */
// @ts-nocheck

import { useState } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import { Button } from '../Button';

import { DialogProps } from './interfaces';

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  className = '',
  close,
  footer,
  header = '',
  children,
  canMaximize,
  closeButtonColor,
  clickOutsideToClose = true,
  closeButtonLinkAppareance = true,
  showHeader = true,
  showFooter = true,
  draggable = false,
  position,
  disableAnimation,
  tailWindClass = '',
  tailWindHeader = '',
  customHeight = '',
}) => {
  const [isInContent, setIsInContent] = useState(false);
  const [maximize, setMaximize] = useState(false);
  const [activeDrags, setActiveDrags] = useState(0);

  const closeDialog = (): void => {
    setMaximize(false);
    close();
  };

  const renderMaximizeButton = () => {
    if (!maximize)
      return (
        <Button
          link
          icon={faExpandArrowsAlt}
          onClick={() => setMaximize(true)}
        />
      );

    return (
      <Button
        link
        icon={faCompressArrowsAlt}
        onClick={() => setMaximize(false)}
      />
    );
  };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const dialogContent = (
    <div
      className={
        !tailWindClass
          ? `dialog_content ${customHeight} ${
              maximize ? `dialog_maximize` : ''
            }${isOpen && `dialog_openned`}${
              disableAnimation ? ' no-animation' : ''
            }`
          : tailWindClass
      }
      onMouseEnter={() => setIsInContent(true)}
      onMouseLeave={() => setIsInContent(false)}
    >
      {showHeader && (
        <div
          className={
            !tailWindHeader
              ? `dialog_header ${draggable && ' dialog_draggable '}`
              : tailWindHeader
          }
        >
          <div
            className={!tailWindHeader ? 'header_left' : 'text-2xl font-medium'}
          >
            {header}
          </div>
          <div className="header_right">
            {canMaximize && renderMaximizeButton()}
            <Button
              icon={faTimes}
              onClick={closeDialog}
              color={closeButtonColor}
              link={closeButtonLinkAppareance}
            />
          </div>
        </div>
      )}
      {children}
      {showFooter ? footer : null}
    </div>
  );

  const renderDialog = () => {
    if (isOpen) {
      return (
        <div
          className={`dialog_background-container${
            className && ` ${className} `
          }${position ? ` --${position} ` : ''}`}
          onClick={() => !isInContent && clickOutsideToClose && closeDialog()}
        >
          {draggable ? (
            <Draggable
              handle=".dialog_header"
              onStart={onStart}
              onStop={onStop}
            >
              {dialogContent}
            </Draggable>
          ) : (
            dialogContent
          )}
        </div>
      );
    }
  };
  return ReactDOM.createPortal(renderDialog(), document.body);
};

export default Dialog;
