import React from 'react';
import { Divider } from 'primereact/divider';

import './pagareInfo.scss';

const PagareInfo = ({ pagare }) => {
  return (
    <div className="pagare-info__container">
      <div className="text-primary text-xl font-medium mb-1">
        <p>Pagaré a vincular: {pagare?.numero}</p>
      </div>
      <div className="pagare-info__company">
        <p>{`${pagare?.libradoRazonSocial} (${pagare?.libradoCif})`}</p>
      </div>
    </div>
  );
};

export default PagareInfo;
