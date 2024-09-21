import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRetirSociedadInterveniente } from '@shared/modules/Pras/interfaces';

import Modal from '@shared/components/Legacy/Modal';
import { Table } from '@shared/components/Legacy/Table';

import { sociedadesIntervinientesColumns } from '../../constants';

import './styles.scss';

type RetirSociedadesIntervinientesModalProps = {
  open: boolean;
  onHide: () => void;
  company: string;
  ownerName: string;
  sociedadesIntervinientes: IRetirSociedadInterveniente[];
};

const RetirSociedadesIntervinientesModal = ({
  open,
  onHide,
  sociedadesIntervinientes,
  company,
  ownerName,
}: RetirSociedadesIntervinientesModalProps): JSX.Element => {
  return (
    <Modal
      showHeader={false}
      isOpen={open}
      onClose={onHide}
      className="retir-sociedades__modal flex content-center items-center"
    >
      <div className="retir-sociedades__container pb-5">
        <div className="retir-sociedades__container__header flex flex-row justify-between px-4 py-3">
          <div>Sociedades intervinientes</div>
          <FontAwesomeIcon
            onClick={onHide}
            icon={faClose as IconProp}
            color="#555555"
            className="pointer"
          />
        </div>
        <div className="retir-sociedades__container__titular px-4 py-3 mb-1">
          <span>{ownerName}</span> ({company})
        </div>
        <Table
          columns={sociedadesIntervinientesColumns}
          value={sociedadesIntervinientes}
          scrollable
          scrollHeight="500px"
          fixedColumns={false}
        />
      </div>
    </Modal>
  );
};

export default RetirSociedadesIntervinientesModal;
