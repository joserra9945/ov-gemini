import { IEnum } from '@shared/interfaces/IEnum';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const EstadoRevisionTemplate = ({ id, description }: IEnum) => {
  return (
    <Tooltip content={description}>
      <div className={`ellipsis estado-revision-previo-${id}`}>
        {description}
      </div>
    </Tooltip>
  );
};

export default EstadoRevisionTemplate;
