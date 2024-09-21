import { cssValue } from './helpers/unitConverter';
import { SpinnerProps } from './interfaces';

/**
 * Primary UI component for user interaction
 */
export const Spinner: React.FC<SpinnerProps> = ({
  className = '',
  loading,
  size = 35,
  color,
  label,
}) => {
  const width = cssValue(size);
  const height = cssValue(size);

  return loading ? (
    <span
      className={[
        className,
        'g-spinner',
        `${label?.length ? '' : 'only-spinner'}`,
      ].join(' ')}
      style={{
        width,
        height,
        borderColor: color
          ? `${color} ${color} transparent`
          : 'white white transparent',
      }}
    />
  ) : null;
};
