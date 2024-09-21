import { Button } from '@shared/components/Legacy/Button';
import Modal from '@shared/components/Legacy/Modal';

import { formatRetirDates } from '../../constants/index';

import './styles.scss';

type BuySuccessModalProps = {
  open: boolean;
  onHide: () => void;
  fechaUltimaActualizacion: string;
  dataHasChanged: boolean;
};

const BuySuccessModal = ({
  open,
  onHide,
  fechaUltimaActualizacion,
  dataHasChanged,
}: BuySuccessModalProps): JSX.Element => {
  return (
    <Modal
      showHeader={false}
      isOpen={open}
      onClose={onHide}
      className="retir-buy-success__modal flex content-center items-center"
    >
      <div className="retir-purshase-success-content flex-direction-column justify-content-center p-2">
        <img
          src="https://mkt-gestion.com/8000/aplicativos/PRAS/compra_finalizada.svg"
          height="172.3"
          width="172.3"
          alt="compra_finalizada.svgg"
        />
        <div className="mt-3 mb-2">Compra finalizada</div>
        {!fechaUltimaActualizacion && <div>No hay datos en el retir.</div>}
        {fechaUltimaActualizacion && !dataHasChanged && (
          <div>La fecha de actualización de los datos no ha cambiado.</div>
        )}
        {fechaUltimaActualizacion && dataHasChanged && (
          <>
            <div>Los datos se han actualizado correctamente.</div>
            <div>
              Nueva fecha de actualización es:{' '}
              {formatRetirDates(fechaUltimaActualizacion)}.
            </div>
          </>
        )}
        <Button
          className={`retir-purshase-status-dialog-${
            fechaUltimaActualizacion && dataHasChanged ? 'update' : 'close'
          } mt-4`}
          label={
            fechaUltimaActualizacion && dataHasChanged ? 'Actualizar' : 'Cerrar'
          }
          onClick={onHide}
        />
      </div>
    </Modal>
  );
};

export default BuySuccessModal;
