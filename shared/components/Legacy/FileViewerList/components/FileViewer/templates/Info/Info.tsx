import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFileAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatBytes } from '../../helpers';

import { IInfo } from './Interface';

const Info = ({ file }: IInfo): JSX.Element => {
  return (
    <div className="g-flex g-flex--items-center g-flex--space-between file-viewer__left">
      <FontAwesomeIcon
        icon={faFileAlt as IconProp}
        className="file-viewer__info-icon"
      />
      <div className="file-viewer__info-main">
        <div className="file-viewer__info-title">
          {file?.basename || file?.name}
        </div>
        <div className="file-viewer__info-size">{formatBytes(file?.size)}</div>
      </div>
    </div>
  );
};

export default Info;
