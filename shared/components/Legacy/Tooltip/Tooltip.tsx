import {
  cloneElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';

import { calculatePosition } from './helpers/position';
import usePortal from './helpers/usePortal';
import useResizeObserver from './helpers/useResizeObserver';
import { TooltipProps } from './interfaces';

const Tooltip: React.FC<TooltipProps> = ({
  rootId = 'portal-root',
  className,
  classNameTrigger,
  content,
  place = 'top',
  theme = 'dark',
  offset = 10,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [arrowCoords, setArrowCords] = useState({ top: 0, left: 0 });
  const [placeTooltip, setPlaceTooltip] = useState(place);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<JSX.Element>(null);
  const target = usePortal(rootId);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const {
        top,
        left,
        arrowTop,
        arrowLeft,
        place: newPlace,
      } = calculatePosition(triggerRef, tooltipRef, arrowRef, place, offset);
      setCoords({ top, left });
      setArrowCords({ top: arrowTop, left: arrowLeft });
      setPlaceTooltip(newPlace);
    }
  }, [place, offset, triggerRef]);

  useResizeObserver(document.body, updatePosition);

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      updatePosition();
    }
  }, [showTooltip, updatePosition]);

  return (
    <>
      {cloneElement(<div>{children as JSX.Element}</div>, {
        onMouseEnter: () => {
          setShowTooltip(true);
        },
        onMouseLeave: () => {
          setShowTooltip(false);
        },
        'data-testid': 'g-tooltip_trigger',
        className: `g-tooltip_trigger${
          classNameTrigger ? ` ${classNameTrigger}` : ''
        }`,
        ref: triggerRef,
      })}
      {showTooltip &&
        content &&
        ReactDOM.createPortal(
          <div className={`g-tooltip ${theme} ${className || ''}`}>
            <div
              ref={tooltipRef}
              className={`g-tooltip__container g-tooltip__container--${placeTooltip}`}
              style={{ ...coords }}
            >
              <div className="g-tooltip__inner">{content}</div>
            </div>
            <div
              ref={arrowRef}
              className={`g-tooltip__arrow g-tooltip__arrow--${placeTooltip}`}
              style={{ ...arrowCoords }}
            />
            <div
              className={`g-tooltip__arrow g-tooltip__arrow-border g-tooltip__arrow--${placeTooltip}`}
              style={{ ...arrowCoords }}
            />
          </div>,
          target
        )}
    </>
  );
};

export default Tooltip;
