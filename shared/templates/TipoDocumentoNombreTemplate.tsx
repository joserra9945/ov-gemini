import { Tooltip } from '@shared/components/Tooltip';
import { IEnum } from '@shared/interfaces/IEnum';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

const TipoDocumentoNombreTemplate = ({ description, id }: IEnum) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 tipo-documento-${id}`}
    >
      <div className="ellipsis">
        <Tooltip content={description}>{description || '-'}</Tooltip>
      </div>
    </div>
  );
};

export default TipoDocumentoNombreTemplate;
