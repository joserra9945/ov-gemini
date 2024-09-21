/* eslint-disable */
// @ts-nocheck

interface IBadge {
  value?: React.ReactNode | string | number;
  className?: string;
}

const Badge = ({ value, className }: IBadge): JSX.Element => {
  return (
    <span className={`g-badge${className ? ` ${className}` : ''}`}>
      <span className="g-badge__value">{value}</span>
    </span>
  );
};

Badge.defaultProps = {
  controlled: false,
  value: '',
  className: 'g-badge',
};

export default Badge;
