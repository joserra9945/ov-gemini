import { IRetirOwnersProps } from '@shared/modules/Pras/interfaces';

import RetirOwnersCard from '../OwnersCard';

import './styles.scss';

const RetirOwners = ({ owners, company }: IRetirOwnersProps): JSX.Element => {
  return (
    <div className="retir-owners flex flex-wrap">
      {owners.map((owner) => (
        <RetirOwnersCard owner={owner} company={company} />
      ))}
    </div>
  );
};

export default RetirOwners;
