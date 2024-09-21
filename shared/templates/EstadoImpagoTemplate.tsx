import { faCircleInfo } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@shared/components/Legacy/Tooltip';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import '@shared/styles/app-theme/templates/estadoOperacionTemplate.scss';

const EstadoImpagoTemplate = ({
  description,
  id,
  impagoDescription,
}: IEnum & { impagoDescription: string }) => {
  return (
    <div className={`flex items-center gap-2 estado-impago-${id}`}>
      <div className="ellipsis">
        <Tooltip content={description}>{description || '-'}</Tooltip>
      </div>
      {impagoDescription ? (
        <div>
          <Tooltip content={impagoDescription}>
            <FontAwesomeIcon icon={faCircleInfo} />
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default EstadoImpagoTemplate;
