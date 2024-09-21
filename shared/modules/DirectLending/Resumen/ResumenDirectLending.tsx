import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GenericButton } from '@shared/components/GenericButton';
import { GenericSelectButton } from '@shared/components/GenericSelectButton';
import { Modal } from '@shared/components/Modal';
import { ESTADOS_DIRECTLENDING_ENUM } from '@shared/enum/enumEstadosDirectLending';
import { tipoFirmaEnum } from '@shared/enum/firmaNotarial';
import { usePrestamo } from '@shared/hooks';
import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';
import { IPrestamoIdGet } from '@shared/interfaces/IPrestamo';
import { FirmaNotarialForm } from '@shared/modules/FirmaNotarial/FirmaNotarialForm';

import { CuotaMensual, Detalle, Estado } from '../components';
import { DatosFirma } from '../components/DatosFirma';
import DirectLendingContext from '../context/DirectLendingContext';

import { CONFIG_RESUMEN } from './ResumenConfigEstados';

type ResumenProps = {
  directLending: IDirectLendingByFiltersGet;
  config: { [key: string]: string | number };
  libradorId: string;
};

type Tab = {
  value: number;
  label: string;
  component: JSX.Element;
};

const ResumenDirectLending = ({
  directLending,
  config,
  libradorId,
}: ResumenProps) => {
  const { prestamoIdGet } = usePrestamo();
  const { isAdUser } = useSelector((state: any) => state.userState);
  const navigate = useNavigate();

  const [showSolicitarFirmaModal, setShowSolicitarFirmaModal] =
    useState<boolean>(false);
  const [directLendingResumen, setDirectLendingResumen] =
    useState<IPrestamoIdGet>({} as IPrestamoIdGet);
  const [tab, setTab] = useState<Tab>();

  const estadoId = directLending?.estado?.id as keyof typeof CONFIG_RESUMEN;

  const fetchPrestamoId = useCallback(async () => {
    if (directLending?.id) {
      const res = await prestamoIdGet(directLending.id);
      res && setDirectLendingResumen(res);
    }
  }, [directLending?.id, prestamoIdGet]);

  const contextValues = useMemo(
    () => ({
      directLending,
      config,
      directLendingResumen,
      setShowSolicitarFirmaModal,
    }),
    [directLending, config, directLendingResumen, setShowSolicitarFirmaModal]
  );

  const onHandleChangeTab = (valueSelected: number | string) => {
    const value =
      typeof valueSelected === 'number'
        ? valueSelected
        : parseInt(valueSelected, 10);
    const tabSelected = CONFIG_RESUMEN[estadoId].TABS.find(
      (tabs) => tabs.value === value
    );
    if (tabSelected) {
      setTab(tabSelected);
    }
  };

  useEffect(() => {
    fetchPrestamoId();
    setTab(CONFIG_RESUMEN[estadoId].TABS[0]);
  }, [fetchPrestamoId, estadoId]);

  return (
    <DirectLendingContext.Provider value={contextValues}>
      <div className="flex flex-col w-full gap-4 p-4 h-fit lg:flex-row mobile:p-0">
        <div className="flex flex-col lg:w-2/5">
          <div className="grid gap-4 grid-rows-12">
            <div>
              <Estado />
            </div>
            {directLending?.estado?.id ===
              ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA ||
              (directLending?.estado?.id ===
                ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA && (
                <div className="w-full row-span-2">
                  <div className="w-full row-span-4 px-4">
                    <DatosFirma />
                  </div>
                </div>
              ))}
            <div
              className={`row-span-${
                directLending?.estado?.id ===
                  ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA ||
                directLending?.estado?.id ===
                  ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA
                  ? 3
                  : 5
              } w-full px-4`}
            >
              <CuotaMensual directLendingResumen={directLendingResumen} />
            </div>
            {directLendingResumen?.estado?.id ===
              ESTADOS_DIRECTLENDING_ENUM.PRECONCEDIDO && (
              <div className="flex justify-end px-4">
                <GenericButton
                  buttonType="primary"
                  label="Solicitud firma ante notario"
                  onClick={() => setShowSolicitarFirmaModal(true)}
                />
              </div>
            )}
            <div
              className={`row-span-${
                directLendingResumen?.estado?.id ===
                  ESTADOS_DIRECTLENDING_ENUM.PENDIENTE_FIRMA ||
                directLendingResumen?.estado?.id ===
                  ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA
                  ? 3
                  : 5
              } h-full px-4`}
            >
              <Detalle directLendingResumen={directLendingResumen} />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full lg:w-3/5">
          <div className="flex items-center flex-shrink-0 pb-2">
            <GenericSelectButton
              value={tab?.value}
              options={CONFIG_RESUMEN[estadoId].TABS}
              onChange={(e) => onHandleChangeTab(e)}
            />
            {directLending?.estado?.id >=
              ESTADOS_DIRECTLENDING_ENUM.FIRMA_SOLICITADA && (
              <div className="ml-auto">
                <GenericButton
                  buttonType="primary"
                  label="Ver ficha préstamo"
                  onClick={() => {
                    navigate(
                      `/prestamos/ficha-prestamo/${directLendingResumen.id}`,
                      { state: { directLendingResumen } }
                    );
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-grow">{tab?.component}</div>
        </div>
        {showSolicitarFirmaModal && (
          <Modal
            open={showSolicitarFirmaModal}
            onClose={() => setShowSolicitarFirmaModal(false)}
            className="mobile:w-full"
            headerClassName="p-0"
            contentClassName="p-0 m-0"
          >
            <FirmaNotarialForm
              callback={() => {
                setShowSolicitarFirmaModal(false);
                return fetchPrestamoId();
              }}
              empresaInternaId={directLendingResumen?.empresaInterna?.id}
              firmaNotarialId={directLendingResumen?.firmaNotarialId}
              id={directLendingResumen?.id}
              isAdUser={isAdUser}
              libradorId={libradorId}
              showTitle
              tipo={tipoFirmaEnum.PRESTAMOS}
            />
          </Modal>
        )}
      </div>
    </DirectLendingContext.Provider>
  );
};

export default ResumenDirectLending;
