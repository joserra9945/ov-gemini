import React from 'react';

import { Tooltip } from '@shared/components/Legacy/Tooltip';

const Numero = ({ numero }) => {
  return (
    <div className="numero-efecto__container">
      <Tooltip content={numero || '(Sin numero)'}>
        <span className="numero-efecto ellipsis">
          {numero || '(Sin numero)'}
        </span>
      </Tooltip>
    </div>
  );
};

export default Numero;
