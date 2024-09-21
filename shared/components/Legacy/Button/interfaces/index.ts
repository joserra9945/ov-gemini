import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps {
  /**
   * Button type
   */
  type?: 'button' | 'reset' | 'submit' | undefined;
  /**
   * Button color
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'light';
  customColor?: string;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Button disabled
   */
  disabled?: boolean;
  /**
   * An optional icon can be placed next to the label
   */
  icon?: IconProp;
  iconPosition?: 'right' | 'left';
  /**
   * Text that will be displayed when the user hovers over the button
   */
  tooltipText?: string;
  /**
   * rounded
   */
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Link appareance
   */
  link?: boolean;
  /**
   * Class to be added to the button
   */
  className?: string;
  /**
   * If is a loading button
   */
  loading?: boolean;
  variant?: 'contained' | 'outlined';
}
