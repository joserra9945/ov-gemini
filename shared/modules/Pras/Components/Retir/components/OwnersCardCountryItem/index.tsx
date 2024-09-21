import { CircleFlag } from 'react-circle-flags';

type RetirOwnersCardCountryItemProps = {
  title: string;
  country: string;
  className: string;
};

const RetirOwnersCardCountryItem = ({
  title,
  country,
  className = '',
}: RetirOwnersCardCountryItemProps): JSX.Element => {
  return (
    <div className={className}>
      <div>{title}</div>
      <div className="flex">
        <div>{country?.toUpperCase()}</div>
        <div className="ml-2 flex items-center">
          <CircleFlag
            countryCode={country?.toLocaleLowerCase()}
            height="14"
            width="14"
          />
        </div>
      </div>
    </div>
  );
};

export default RetirOwnersCardCountryItem;
