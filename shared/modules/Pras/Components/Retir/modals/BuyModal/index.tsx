import { IRetirLastPurshase } from '@shared/modules/Pras/interfaces';

import { Button } from '@shared/components/Legacy/Button';
import Modal from '@shared/components/Legacy/Modal';

import './styles.scss';

type BuyModalProps = {
  open: boolean;
  onHide: () => void;
  data: IRetirLastPurshase;
  onConfirm: () => void;
};

const BuyModal = ({
  open,
  onHide,
  data,
  onConfirm,
}: BuyModalProps): JSX.Element => {
  return (
    <Modal
      showHeader={false}
      isOpen={open}
      onClose={onHide}
      className="retir-buy__modal flex justify-center items-center"
    >
      <div className="retir-buy-content flex-direction-column p-4">
        <div className="w-100">Comprar Retir </div>
        <div className="w-100 mt-3 mb-3">
          ¿Quieres realizar una nueva compra?{' '}
        </div>
        <div className="w-100">DATOS ÚLTIMA COMPRA</div>
        <div className="w-100 flex flex-direction-row justify-between mt-2 mb-4 p-3">
          {data.fechaCompra ? (
            <>
              <div>
                <span>Fecha:</span> {data.fechaCompra}
              </div>
              <div>
                <span>Usuario:</span> {data.usuario}
              </div>
            </>
          ) : (
            <span className="w-100 flex justify-center content-center items-center">
              Todavía no se ha realizado ninguna compra para esta empresa.
            </span>
          )}
        </div>
        <div className="w-100 flex flex-direction-row justify-end">
          <Button className="mr-4" label="Cancelar" link onClick={onHide} />
          <Button label="Comprar" onClick={onConfirm} />
        </div>
      </div>
    </Modal>
  );
};

export default BuyModal;
