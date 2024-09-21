import { FC } from 'react';

import { Button } from '@shared/components/Button';
import { Modal } from '@shared/components/Modal';
import { IFirmaNotarialIdGet } from '@shared/interfaces/api/IFirmaNotarial';
import { formatFullDateUTC } from '@shared/utils/formatters';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  onClick: (option: string) => void;
  firma: IFirmaNotarialIdGet;
}

const VincularFirmaModal: FC<IProps> = ({
  onClose,
  isOpen,
  onClick,
  firma,
}) => {
  return (
    <Modal header="Vincular a firma" onClose={onClose} open={isOpen}>
      <div className="flex flex-col">
        <div className="mb-8">
          <h2>Ya dispones de una firma notarial en curso:</h2>
          <div className="flex flex-col gap-2 rounded bg-[#F4F7FF] p-4">
            <h2 className="text-lg">
              <b>Datos de la firma</b>
            </h2>
            <p>
              <b>Fecha prevista:</b> {formatFullDateUTC(firma.fechaPrevista)}
            </p>
            <p>
              <b>Tipo:</b> {firma?.tipo?.description}
            </p>
            <p>
              <b>Notario:</b> {`${firma.notario?.nombreCompleto ?? '-'}`}
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-1 w-full">
          <Button
            onClick={() => onClick('vincular')}
            text="Vincular firma"
            type="button"
          />
          <Button
            onClick={() => onClick('cancelar')}
            text="Cancelar"
            type="text-button"
          />
        </div>
      </div>
    </Modal>
  );
};

export default VincularFirmaModal;
