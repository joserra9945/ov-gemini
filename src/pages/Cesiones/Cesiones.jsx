import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CesionService from 'utils/services/cesion-service';
import EmpresaService from 'utils/services/empresa-externa-service';
import { faExclamationCircle, faPlus } from '@fortawesome/pro-light-svg-icons';

import { NuevaCesionModal } from '@shared/modules/CesionesForm/components/NuevaCesionModal';
import { tipoDireccionEnum } from '@shared/utils/constants';
import notifications from '@shared/utils/notificationsOv';
import { queryFixer } from '@shared/utils/utilsOv';

import { Button } from '@shared/components/Legacy/Button';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import Messages from 'components/Messages/Messages';

import AlertFirma from '../../components/AlertFirma';

import { columns } from './constants';

import './Cesiones.scss';

const cesionService = new CesionService();
const empresaService = new EmpresaService();

const Cesiones = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState();
  const [direccionSocial, setDireccionSocial] = useState();
  const [data, setData] = useState({
    items: [],
    totalCount: 0,
    currentPage: 0,
  });
  const [isShowingDialog, setIsShowingDialog] = useState(false);
  const [isKyc, setIsKyc] = useState(true);
  const { empresaInfo } = useSelector((store) => store.apiState);
  const { libradorId, isAdUser } = useSelector((store) => store.userState);

  const handleCreateAssignament = useCallback(() => {
    if (
      ![null, undefined, 'null', 'undefined'].includes(
        direccionSocial?.provinciaId
      )
    ) {
      setIsShowingDialog(true);
    } else {
      notifications.warning({
        body: 'Para poder crear una cesión debe rellenar primero el KYC en la sección de "Mis datos -> Perfil de Empresa".',
      });
    }
  }, [direccionSocial?.provinciaId]);

  const fecthCesiones = useCallback(async () => {
    if (!queryState) return;
    try {
      setIsLoading(true);
      const query = queryFixer(queryState);

      const res = await cesionService.getCesionesByLibrador(
        libradorId,
        query,
        isAdUser
      );
      if (!res?.items?.length && isKyc) {
        handleCreateAssignament();
      }
      if (res) {
        setData(res);
      } else {
        setData({
          items: [],
          totalCount: 0,
          currentPage: 0,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setData({
        items: [],
        totalCount: 0,
        currentPage: 0,
      });
    }
  }, [handleCreateAssignament, isAdUser, isKyc, libradorId, queryState]);

  const fetchEmpresaExterna = useCallback(async () => {
    const res = await empresaService.getEmpresaById(libradorId);
    if (res) {
      setIsKyc(res?.tieneKycCompleto);
    }
  }, [libradorId]);

  const LinkKyc = (
    <Button
      onClick={() => navigate('/perfil-empresa')}
      label="Debe cumplimentar el KYC para añadir una cesión."
      link
      color="danger"
    />
  );

  const handleRowClick = (e) => {
    if (!e?.data?.id) return;
    navigate(`/cesiones/detalle/${e?.data?.id}`, {
      state: {
        cesionType: e?.data?.tipo?.id,
        cesionId: e?.data?.id,
      },
    });
  };

  useEffect(() => {
    if (direccionSocial === undefined) {
      const tmpDireccionSocial = empresaInfo?.direcciones?.find(
        (direccion) => direccion.tipoDireccion?.id === tipoDireccionEnum.SOCIAL
      );
      setDireccionSocial(tmpDireccionSocial || null);
    }
  }, [direccionSocial, empresaInfo?.direcciones]);

  useEffect(() => {
    if (isKyc !== null) {
      fecthCesiones();
    }
  }, [fecthCesiones, isKyc]);

  useEffect(() => {
    fetchEmpresaExterna();
  }, [fetchEmpresaExterna]);

  return (
    <div className="cesiones-page__container flex flex-col box-border h-full">
      {!isKyc && (
        <Messages
          icon={faExclamationCircle}
          severity="caution"
          message={LinkKyc}
        />
      )}
      <AlertFirma libradorId={libradorId} />
      <div className="grow p-4">
        <TurboTable
          tableTitle="Cesiones"
          columns={columns}
          isLoading={isLoading}
          value={data.items}
          totalRecords={data.totalCount}
          setQueryState={setQueryState}
          scrollable
          scrollHeight="flex"
          showSelectColumns={false}
          showFilter={false}
          paginator
          selectionMode="single"
          onRowClick={handleRowClick}
          HeaderCustomComponent={
            <Button
              icon={faPlus}
              label="Nueva cesión"
              onClick={handleCreateAssignament}
            />
          }
        />
        <NuevaCesionModal
          isOpen={isShowingDialog}
          onClose={() => setIsShowingDialog(false)}
        />
      </div>
    </div>
  );
};

Cesiones.propTypes = {};

export default Cesiones;
