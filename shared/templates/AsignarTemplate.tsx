import { faUserPlus } from '@fortawesome/pro-light-svg-icons';

import { Button } from '@shared/components/Button';
import { Tooltip } from '@shared/components/Tooltip';

const AsignarTemplate = ({ name, onClick }: any) => {
  return (
    <Tooltip content={name ?? ''}>
      <div className="flex items-center justify-center">
        <Button
          color="success"
          type="icon-button"
          icon={faUserPlus}
          onClick={onClick}
        />
        <span className="ellipsis">{name ?? 'Sin asignar'}</span>
      </div>
    </Tooltip>
  );
};

export default AsignarTemplate;
