interface IProps {
  children: JSX.Element;
  className?: string;
  onClick?: () => void;
  key?: number | string;
}

const Item = ({ children, className = '', onClick, key }: IProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      key={key}
      onClick={onClick}
      className={`flex rounded-lg bg-white p-4 items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Item;
