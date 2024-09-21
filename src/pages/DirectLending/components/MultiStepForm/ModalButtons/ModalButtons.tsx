import { faCheck, faQuestion } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GenericButton } from '@shared/components/GenericButton';

import useMultiStepForm from '../hook/useMultiStepForm';

interface ModalButtonProps {
  lastOption: boolean;
  closeModal: () => void;
  nextClick: () => void;
}
const ModalButtons = ({
  lastOption,
  closeModal,
  nextClick,
}: ModalButtonProps) => {
  const { config } = useMultiStepForm();

  return (
    <div className="flex flex-col text-center justify-center font-normal items-center">
      <div className="iconHeader flex w-full items-center justify-center">
        <div className="bg-slate-50 rounded-full p-6">
          <div className="bg-blank rounded-full p-3">
            <FontAwesomeIcon
              className={`h-10 w-10 text-${lastOption ? 'success' : 'info'}`}
              icon={lastOption ? faCheck : faQuestion}
            />
          </div>
        </div>
      </div>
      <div className="font-roboto text-lg leading-6 font-normal mb-6 mt-6">
        {lastOption
          ? `El ${config.productoSingular} se ha creado correctamente`
          : '¿Estás seguro de que quieres volver al inicio?'}
      </div>
      <div className="flex flex-col justify-center w-full ">
        <GenericButton
          className="w-full flex flex-row justify-center"
          buttonType="primary"
          label={
            lastOption
              ? `Ver ficha del ${config.productoSingular}`
              : 'Continuar aquí'
          }
          onClick={closeModal}
        />
        <GenericButton
          className="w-full flex flex-row justify-center"
          buttonType="secondary-borderless"
          label={
            lastOption
              ? `Volver a ${config.productoSingular}`
              : 'Volver al inicio'
          }
          onClick={nextClick}
        />
      </div>
    </div>
  );
};

export default ModalButtons;
