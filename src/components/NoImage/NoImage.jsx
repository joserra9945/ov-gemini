import React from 'react';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NoImage.scss';

const NoImage = () => {
  return (
    <div className="no-image-wrapper">
      <FontAwesomeIcon icon={faImage} size="9x" />
      <span>No hay imagen</span>
    </div>
  );
};

export default NoImage;
