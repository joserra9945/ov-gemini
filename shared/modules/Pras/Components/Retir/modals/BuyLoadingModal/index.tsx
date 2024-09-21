import { ProgressBar } from 'primereact/progressbar';

import Modal from '@shared/components/Legacy/Modal';

import './styles.scss';

type BuyLoadingModalProps = {
  open: boolean;
  onHide: () => void;
};

const BuyLoadingModal = ({
  open,
  onHide,
}: BuyLoadingModalProps): JSX.Element => {
  return (
    <Modal
      showHeader={false}
      isOpen={open}
      onClose={onHide}
      className="retir-buy-loading__modal flex justify-center items-center"
    >
      <div className="retir-buy-loading-content flex-direction-column justify-content-center p-2">
        <img
          src="https://mkt-gestion.com/8000/aplicativos/PRAS/realizando_compra.svg"
          height="172.3"
          width="172.3"
          alt="compra_finalizada.svgg"
        />
        <div className="mt-3 mb-2">Realizando la compra...</div>
        <ProgressBar mode="indeterminate" className="mt-2" color="#00D8AC" />
      </div>
    </Modal>
  );
};

export default BuyLoadingModal;
