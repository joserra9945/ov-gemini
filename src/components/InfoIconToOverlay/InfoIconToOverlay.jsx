import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Tooltip } from 'primereact/tooltip';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './InfoIconToOverlay.scss';

const InfoIconToOverlay = ({
  icon,
  title,
  tooltipContent,
  content,
  type,
  children,
  iconClasses = '',
  className,
}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const op = useRef(null);

  switch (type) {
    case 'modal':
      return (
        <>
          <Tooltip
            style={{ fontSize: '0.7rem', maxWidth: '30rem' }}
            target=".pointer"
            mouseTrack
            mouseTrackLeft={10}
          />
          <FontAwesomeIcon
            icon={icon || faInfoCircle}
            onClick={() => setDisplayModal(true)}
            onKeyPress={() => {}}
            role="presentation"
            className={`icontomodal pointer ${iconClasses}`}
            data-pr-tooltip={tooltipContent}
          />
          <Dialog
            header={title || ''}
            visible={displayModal}
            style={{ width: '60vw' }}
            onHide={() => setDisplayModal(false)}
            className={className}
          >
            {content}
          </Dialog>
        </>
      );
    case 'tooltip':
      return (
        <>
          <Tooltip
            style={{ fontSize: '0.7rem', maxWidth: '30rem' }}
            target=".icono"
            mouseTrack
            mouseTrackLeft={10}
          />
          <FontAwesomeIcon
            icon={icon || faInfoCircle}
            className={`pi icontomodal icono ${iconClasses}`}
            data-pr-tooltip={tooltipContent}
          />
        </>
      );
    case 'panel':
      return (
        <>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={`pi icontomodal pointer ${iconClasses}`}
            onClick={(e) => op.current.toggle(e)}
            aria-controls="overlay_panel"
            role="presentation"
          />
          <OverlayPanel ref={op} id="overlay_panel" className="panel">
            {children}
          </OverlayPanel>
        </>
      );
    default:
  }
};

export default InfoIconToOverlay;
