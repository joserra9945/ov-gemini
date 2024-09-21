/* eslint-disable */
// @ts-nocheck

import {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spinner } from '../Spinner';
import { Tooltip } from '../Tooltip';

import { ButtonProps } from './interfaces';

const spinnerSizes = {
  xs: 15,
  sm: 20,
  md: 25,
  lg: 30,
  xl: 40,
};

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  color = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  backgroundColor,
  customColor,
  label,
  icon,
  iconPosition = 'left',
  tooltipText = '',
  rounded = false,
  link = false,
  loading = false,
  variant = 'contained',
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number | null>();
  const [height, setHeight] = useState<number | null>();
  const [_loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      setWidth(containerRef?.current?.clientWidth);
      setHeight(containerRef?.current?.clientHeight);
      setLoading(true);
    } else {
      setWidth(null);
      setHeight(null);
      setLoading(false);
    }
  }, [loading]);

  const styleValue = useCallback(() => {
    let styles: CSSProperties = {};
    if (height && width) {
      styles = { ...styles, width: `${width}px`, height: `${height}px` };
    }
    if (backgroundColor) {
      styles = { ...styles, backgroundColor };
    }
    if (customColor) {
      styles = { ...styles, color: customColor };
    }
    return styles;
  }, [height, width, backgroundColor, customColor]);

  const buttonTemplate = (
    <button
      ref={containerRef}
      type={type}
      className={[
        className,
        'g-button',
        `g-button-${color}-${variant}`,
        `g-button-${size}`,
        `${disabled ? 'g-button-disabled' : ''}`,
        `${label?.length ? '' : 'icon-only-button'}`,
        `${link ? 'g-button-link' : ''}`,
        `${rounded ? `g-rounded-${rounded}` : ''}`,
      ].join(' ')}
      style={styleValue()}
      onClick={(e) => {
        if (!disabled && onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {icon && iconPosition === 'left' && !_loading && (
        <FontAwesomeIcon
          style={label ? { marginRight: '0.5rem' } : {}}
          icon={icon}
        />
      )}
      <span className="g-button__label">
        {_loading ? <Spinner loading size={spinnerSizes[size]} /> : label}
      </span>
      {icon && iconPosition === 'right' && !_loading && (
        <FontAwesomeIcon
          style={label ? { marginLeft: '0.5rem' } : {}}
          icon={icon}
        />
      )}
    </button>
  );

  return tooltipText ? (
    <Tooltip content={tooltipText}>{buttonTemplate}</Tooltip>
  ) : (
    buttonTemplate
  );
};
