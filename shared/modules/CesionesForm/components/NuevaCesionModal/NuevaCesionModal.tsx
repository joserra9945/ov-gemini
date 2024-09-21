import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from '@shared/components/Modal';
import { useCesion } from '@shared/hooks';

import CesionesForm from '../../CesionesForm';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

enum typeCesiones {
  FUTUROS = 1,
  CONTRATO = 2,
}

const NuevaCesionModal: FC<IProps> = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const { cesionByIdGet } = useCesion();

  const [openModal, setOpenModal] = useState(false);
  const [tipoCesion, setTipoCesion] = useState<typeCesiones>(
    typeCesiones.FUTUROS
  );

  const handleClick = (tipoCesion: typeCesiones) => {
    if (id) {
      navigate(`/cesiones/complete/${id}`, {
        state: {
          cesionType: tipoCesion,
          cesion: data,
        },
      });
    } else {
      setTipoCesion(tipoCesion);
      setOpenModal(true);
    }
  };

  const getCesionData = useCallback(async () => {
    if (id) {
      const res = await cesionByIdGet(id);
      setData(res);
    }
  }, [cesionByIdGet, id]);

  useEffect(() => {
    if (id !== undefined) {
      getCesionData();
    }
  }, [cesionByIdGet, getCesionData, id]);

  return (
    <>
      <Modal
        className="w-1/3"
        header="Nueva cesión"
        onClose={onClose}
        open={isOpen}
      >
        <div>
          <h2 className="mb-4">¿Qué tipo de cesión desea crear?</h2>
          <div className=" flex flex-col gap-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 flex-col p-4"
              onClick={() => handleClick(typeCesiones.FUTUROS)}
            >
              <h2 className="flex justify-start font-bold">Futuros</h2>
              <p className="font-medium">No existe contrato de obra</p>
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-300 flex-col p-4"
              onClick={() => handleClick(typeCesiones.CONTRATO)}
            >
              <h2 className="flex justify-start font-bold">Contratos</h2>
              <p className="font-medium">
                Cesión de contrato de obra o servicio
              </p>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        onClose={() => {
          setOpenModal(false);
          onClose();
        }}
        open={openModal}
        contentClassName="p-0 mobile:overflow-y-auto"
        className="p-0"
        closable={false}
      >
        <CesionesForm
          libradorId={sessionStorage.getItem('libradorId') || ''}
          isAdUser={false}
          cesionType={tipoCesion}
          callBack={() => {
            setOpenModal(false);
            onClose();
          }}
        />
      </Modal>
    </>
  );
};

export default NuevaCesionModal;
