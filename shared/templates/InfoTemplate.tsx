import { MouseEventHandler } from 'react';
import {
  faInfoCircle,
  faOctagonExclamation,
  faTriangleExclamation,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';

const InfoTemplate = ({
  text,
  clickableText,
  type = 'info',
  onClick,
  tooltipText,
}: {
  text?: string;
  clickableText?: string;
  type?: 'info' | 'warning' | 'danger' | '';
  onClick?: MouseEventHandler<HTMLSpanElement>;
  tooltipText?: string | JSX.Element;
  className?: string;
}) => {
  let icon;
  let color;
  let borderColor;
  let textColor;

  switch (type) {
    case 'danger':
      icon = faOctagonExclamation;
      color = '#c50000';
      borderColor = 'bg-[#c50000] bg-opacity-10 border border-[#c50000]';
      textColor = 'text-[#c50000]';
      break;
    case 'warning':
      icon = faTriangleExclamation;
      color = '#ffb200';
      borderColor = 'bg-[#ffb200] bg-opacity-10 border border-[#ffb200]';
      textColor = 'text-[#ffb200]';
      break;
    default:
      icon = faInfoCircle;
      color = '#2667FF';
      borderColor = 'bg-info bg-opacity-10 border border-info';
      textColor = 'text-info';
      break;
  }

  return (
    <div className={`flex ${borderColor} p-2`}>
      <span className="ml-2 flex gap-1 align-middle items-center">
        <FontAwesomeIcon icon={icon} color={color} />
        <p className={`items-center justify-center gap-1 ${textColor}`}>
          {text}{' '}
          {clickableText && !tooltipText ? (
            <div
              role="button"
              tabIndex={0}
              onClick={onClick}
              className="underline cursor-pointer font-bold inline-block"
            >
              <span className="font-medium inline-block"> {clickableText}</span>
            </div>
          ) : (
            tooltipText && (
              <div className="underline cursor-pointer inline-block">
                <span className="font-medium inline-block">
                  <Tooltip content={tooltipText}>{clickableText}</Tooltip>
                </span>
              </div>
            )
          )}
        </p>
      </span>
    </div>
  );
};

export default InfoTemplate;
