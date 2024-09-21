type RetirOwnersCardSimpleItemProps = {
  title?: string;
  value?: string;
  className?: string;
};

const RetirOwnersCardSimpleItem = ({
  title,
  value,
  className = '',
}: RetirOwnersCardSimpleItemProps): JSX.Element => {
  return (
    <div className={className}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};

export default RetirOwnersCardSimpleItem;
