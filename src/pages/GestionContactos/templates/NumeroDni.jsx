import { Tooltip } from '@shared/components/Legacy/Tooltip';

const NumeroDni = ({ representante }) => {
  return (
    <Tooltip content={representante?.numeroDni || ''}>
      {representante?.numeroDni || ''}
    </Tooltip>
  );
};

export default NumeroDni;
