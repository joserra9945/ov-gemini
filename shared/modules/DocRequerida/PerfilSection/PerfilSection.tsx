import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { faPen } from '@fortawesome/pro-light-svg-icons';

import { Modal } from '@shared/components/Modal';
import { enumEstadoDoc } from '@shared/enum/Documento';
import { useEmpresaExterna } from '@shared/hooks';
import useModal from '@shared/hooks/useModal';
import { IUserReducer } from '@shared/modules/DirectLending/constants/IUserReducer';
import { PerfilEmpresa } from '@shared/modules/PerfilEmpresa';
import notifications from '@shared/utils/notifications';

import { itemTemplate } from '../constants';

const PerfilSection = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [perfilState, setPerfilState] = useState({
    estadoText: 'Pendiente de completar',
    estadoType: enumEstadoDoc.PENDIENTE,
  });
  const { libradorId } = useSelector((state: IUserReducer) => state.userState);

  const { getResumenKYCById } = useEmpresaExterna();

  const fetchResumenKYC = useCallback(async () => {
    try {
      const data = await getResumenKYCById(libradorId);
      if (data) {
        const type =
          data.informacionCompleta &&
          data.tieneDireccionSocial &&
          data.tieneFirmantes &&
          data.tieneSociosRespondido &&
          data.actividadCompleta &&
          data.tieneTelefonoYCorreo
            ? enumEstadoDoc.VALIDADO
            : enumEstadoDoc.PENDIENTE;
        setPerfilState({
          estadoType: type,
          estadoText:
            type === enumEstadoDoc.PENDIENTE ? 'Pendiente' : 'Completado',
        });
      }
    } catch (e) {
      notifications.unknownError(e);
    }
  }, [getResumenKYCById, libradorId]);

  useEffect(() => {
    fetchResumenKYC();
  }, [fetchResumenKYC]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="font-bold text-xl">Perfil de empresa (KYC)</h3>
        <p className="text-lg">
          Para realizar la solicitud el perfil de empresa debe de estar
          completado. Puede completarlo posteriormente.
        </p>
      </div>
      <div className="flex rounded-lg bg-white p-3 items-center">
        {itemTemplate({
          estadoText: perfilState.estadoText,
          estadoType: perfilState.estadoType,
          icon: faPen,
          label: 'Perfil de empresa (KYC)',
          onClick: () => openModal(),
        })}
      </div>
      <Modal
        onClose={closeModal}
        header="Perfil de empresa"
        open={isOpen}
        className="w-4/5"
      >
        <PerfilEmpresa
          fetchResumenKYC={fetchResumenKYC}
          vieneDeGenerarContrato={false}
          setIsOpenResumenKyc={() => closeModal()}
        />
      </Modal>
    </div>
  );
};

export default PerfilSection;
