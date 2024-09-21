const Card = ({ children, className, style }) => {
  return (
    <div style={style} className={`g-card ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;
