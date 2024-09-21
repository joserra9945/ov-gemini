import { MouseEventHandler } from 'react';
import { Button as ButtonPrimeReact } from 'primereact/button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Tooltip';

export type ButtonProps = {
  className?: string;
  color?: string;
  disabled?: boolean;
  icon?: IconProp;
  id?: string;
  loading?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  tooltipText?: string;
  text?: string;
  type?: 'button' | 'icon-button' | 'text-button';
  maxWidth?: boolean;
};

const Button = ({
  className,
  color = 'primary',
  disabled = false,
  icon,
  id,
  loading = false,
  onClick,
  tooltipText = '',
  text = '',
  type = 'icon-button',
  maxWidth,
}: ButtonProps) => {
  const getType = (iconType: string) => {
    switch (iconType) {
      case 'button':
        return color === 'blank'
          ? `${
              maxWidth ? '!w-full' : 'min-w-32'
            } h-15 w-auto !bg-${color} rounded-md text-primary px-4 !border-primary-over hover:!bg-${color}-over hover:!border-primary-over`
          : `${
              maxWidth ? '!w-full' : 'min-w-32'
            } h-15 w-auto !bg-${color} rounded-md text-white px-4 !border-${color}-over hover:!bg-${color}-over hover:!border-${color}-over`;
      case 'icon-button':
        return `w-10 h-10 bg-transparent border-transparent text-${color} hover:!border-transparent hover:!bg-gray-300 hover:!text-${color}`;
      case 'text-button':
        return `min-w-32 h-15 w-auto bg-transparent border-transparent rounded-md !text-${color} hover:!border-transparent hover:!bg-blank-over`;
      default:
        return `w-8 h-8 bg-transparent border-transparent text-primary`;
    }
  };

  return (
    <Tooltip content={disabled ? '' : tooltipText}>
      <ButtonPrimeReact
        cy-id={id}
        className={`${
          className ?? `flex justify-center font-medium ${getType(type)}`
        }`}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
      >
        {!loading && (
          <>
            {icon && <FontAwesomeIcon icon={icon} />}
            <div className={`${icon && text ? 'ml-2' : ''}`}>{text}</div>
          </>
        )}
      </ButtonPrimeReact>
    </Tooltip>
  );
};

export default Button;
