import React from 'react';

const Fieldset = ({ legend = '', className = null, description, children }) => {
  return (
    <fieldset className={`g-fieldset${className ? ` ${className}` : ''}`}>
      <legend className="g-legend">{legend}</legend>
      {description && <div className="g-description mb-3">{description}</div>}
      <div className="g-fields">{children}</div>
    </fieldset>
  );
};
export default Fieldset;
