import { useState } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ModalProps } from './interfaces';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className,
  showHeader = true,
  showCloseButton = true,
  title = '',
  showFooter = true,
  footer,
  children,
  disableAnimation = false,
  draggable = false,
  classNameTitle = '',
}) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const handleClose = (): void => {
    onClose();
  };
  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };
  const dialogContent = (
    <div
      className={`modal__container${className ? ` ${className}` : ''}${
        !disableAnimation && (isOpen ? ' --openned' : ' --closed')
      }`}
      style={{ position: 'absolute', top: '50%', left: '50%' }}
    >
      {showHeader && (
        <div className="modal__header">
          <div className={`modal__header--left ${classNameTitle}`}>{title}</div>
          <div className="modal__header--right">
            {showCloseButton && (
              <FontAwesomeIcon
                className="close-btn"
                icon={faTimes}
                onClick={handleClose}
              />
            )}
          </div>
        </div>
      )}
      <div className="modal__content">{children}</div>
      {showFooter && footer && <div className="modal__footer">{footer}</div>}
    </div>
  );

  const renderModal = () => {
    if (isOpen) {
      return (
        <>
          <div
            className={`modal__overlay${isOpen ? ' --openned' : ' --closed'}`}
          />
          {draggable ? (
            <Draggable
              positionOffset={{ x: '-50%', y: '-50%' }}
              handle=".modal__container"
              onStart={onStart}
              onStop={onStop}
            >
              {dialogContent}
            </Draggable>
          ) : (
            dialogContent
          )}
        </>
      );
    }
  };
  return ReactDOM.createPortal(renderModal(), document.body);
};

export default Modal;
