import { Tooltip } from '@shared/components/Legacy/Tooltip';

const CargoDescription = ({ representante }) => {
  return (
    <Tooltip content={representante?.cargo?.description || ''}>
      {representante?.cargo?.description || ''}
    </Tooltip>
  );
};

export default CargoDescription;
