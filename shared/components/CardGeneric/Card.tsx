import { Card as CardPrime } from 'primereact/card';

type CardProps = {
  children: JSX.Element;
  title?: string;
  className?: string;
};
const Card = ({ children, title, className }: CardProps) => {
  return (
    <CardPrime title={title} className={className}>
      {children}
    </CardPrime>
  );
};

export default Card;
