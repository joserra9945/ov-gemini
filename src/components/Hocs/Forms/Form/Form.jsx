import React from 'react';

const Form = ({ className = '', children, onSubmit }) => {
  return (
    <form
      className={`g-form${className ? ` ${className}` : ''}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
