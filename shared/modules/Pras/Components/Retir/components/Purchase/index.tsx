import { useState } from 'react';

import { IRetirPurshaseProps } from '@shared/modules/Pras/interfaces';

import RetirModals from '../../modals';
import RetirPurchaseAction from '../PurchaseAction';
import RetirPurchaseInfo from '../PurchaseInfo';
import PurchaseNoData from '../PurchaseNoData';

import './styles.scss';

const RetirPurchase = ({
  lastPurshase,
  handleTitularesResponse,
  cif,
}: IRetirPurshaseProps): JSX.Element => {
  const { fechaCompra, fechaUltimaActualizacion, error } = lastPurshase;
  const [modalOpened, setModalOpened] = useState('');

  return (
    <div className="retir-purshase flex-direction-column mb-4">
      <RetirPurchaseAction onClick={() => setModalOpened('buy-retir')} />
      <RetirPurchaseInfo lastPurshase={lastPurshase} />

      {!error && fechaCompra && !fechaUltimaActualizacion && <PurchaseNoData />}

      <RetirModals
        data={lastPurshase}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        handleTitularesResponse={handleTitularesResponse}
        cif={cif}
      />
    </div>
  );
};

export default RetirPurchase;
