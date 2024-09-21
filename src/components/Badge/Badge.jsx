import React from 'react';

const Badge = ({ controlled, value, className }) => {
  return (
    <span className={controlled ? `${className}` : 'g-badge'}>{value}</span>
  );
};

Badge.defaultProps = {
  controlled: false,
  value: '',
  className: 'g-badge',
};

export default Badge;
