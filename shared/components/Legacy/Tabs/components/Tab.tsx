import { ITabProps } from '../interfaces';

const Tab: React.FC<ITabProps> = ({ children, className }) => {
  return <div className={`g-tabview-panels ${className}`}>{children}</div>;
};

export default Tab;
