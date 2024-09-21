import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRetirSociedadInterveniente } from '@shared/modules/Pras/interfaces';

import RetirSociedadesIntervinientesModal from '../../modals/SociedadesIntervinientesModal';

type RetirOwnersCardSociedadesIntervinientesProps = {
  sociedadesIntervinientes: IRetirSociedadInterveniente[];
  ownerName: string;
  company: string;
};

const RetirOwnersCardSociedadesIntervinientes = ({
  sociedadesIntervinientes,
  ownerName,
  company,
}: RetirOwnersCardSociedadesIntervinientesProps): JSX.Element => {
  const [openSociedadesModal, setOpenSociedadesModal] = useState(false);

  return (
    <>
      {sociedadesIntervinientes?.length ? (
        <div className="retir-owners-card-info flex flex-row justify-between horizontal-divider px-3 py-2">
          <div>
            Sociedades intervinientes{' '}
            <span className="sociedades-number">
              ({sociedadesIntervinientes?.length})
            </span>{' '}
          </div>
          <FontAwesomeIcon
            onClick={() => setOpenSociedadesModal(true)}
            icon={faEye as IconProp}
            color="#0069AA"
            className="pointer"
          />
        </div>
      ) : null}
      <RetirSociedadesIntervinientesModal
        open={openSociedadesModal}
        onHide={() => setOpenSociedadesModal(false)}
        ownerName={ownerName}
        company={company}
        sociedadesIntervinientes={sociedadesIntervinientes}
      />
    </>
  );
};

export default RetirOwnersCardSociedadesIntervinientes;
