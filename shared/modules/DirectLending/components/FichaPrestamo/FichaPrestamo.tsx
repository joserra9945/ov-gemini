import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';

import { GenericButton } from '@shared/components/GenericButton';
import { useDevice } from '@shared/components/TurboTable/hooks/useDevice';
import { useEmpresaExterna } from '@shared/hooks';
import { IEmpresaExternaActiva } from '@shared/interfaces/api/IEmpresaExterna';
import { IPrestamoIdGet } from '@shared/interfaces/IPrestamo';
import { EstadoDirectLending, InfoTemplate } from '@shared/templates';
import { formatIban } from '@shared/utils/utils';

import CuotaMensual from '../CuotaMensual';
import Detalle from '../Detalle';

import FichaPrestamoTable from './components';

const FichaPrestamo = ({ config }: { config: { [key: string]: string } }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const directLendingResumen: IPrestamoIdGet = location?.state
    ?.directLendingResumen as IPrestamoIdGet;

  const { tienePagares } = directLendingResumen;

  const [empresaActiva, setEmpresaActiva] = useState<IEmpresaExternaActiva>(
    {} as IEmpresaExternaActiva
  );
  const [showTable, setShowTable] = useState(false);

  const { device } = useDevice();
  const { getEmpresaExternaActiva } = useEmpresaExterna();

  const fetchLibrador = useCallback(async () => {
    const res = await getEmpresaExternaActiva();
    res && setEmpresaActiva(res);
  }, [getEmpresaExternaActiva]);

  const libradorRazonSocial = empresaActiva?.razonSocial;

  useEffect(() => {
    fetchLibrador();
  }, [fetchLibrador]);

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleHideTable = () => {
    if (device === 'mobile' && showTable) {
      setShowTable(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full border border-gray-100 p-4 rounded-lg">
        <GenericButton
          icon={faArrowLeft}
          buttonType="none"
          onClick={handleHideTable}
        />
        <p className="text-2xl font-semibold ml-2">
          Ficha {config.productoSingular} {directLendingResumen?.numero}
        </p>
      </div>
      {showTable && device === 'mobile' ? (
        <div className="w-full">
          {params.id && (
            <FichaPrestamoTable
              id={params.id}
              libradorRazonSocial={libradorRazonSocial}
              tienePagares={tienePagares}
            />
          )}
        </div>
      ) : (
        <>
          {!tienePagares && (
            <div>
              <InfoTemplate
                text="Este es el calendario de amortizaciones del préstamo solicitado. Debes emitir tantos pagarés como aquí se indican y llevarlos a la sesión de firma ante notario."
                type="info"
              />
            </div>
          )}

          <div className="flex w-full">
            <div className="p-4 flex flex-col lg:w-2/5 mobile:w-full">
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <div>Estado {config?.productoSingular}</div>
                  <div>
                    <EstadoDirectLending
                      id={directLendingResumen?.estado?.id}
                      description={directLendingResumen?.estado?.description}
                      descripcionEstado={
                        directLendingResumen?.descripcionEstado
                      }
                    />
                  </div>
                </div>
                <div>
                  <CuotaMensual directLendingResumen={directLendingResumen} />
                </div>
                {device === 'mobile' && (
                  <GenericButton
                    label={
                      tienePagares
                        ? 'Ver historial de pagos'
                        : 'Ver calendario de amortizaciones'
                    }
                    buttonType="primary"
                    onClick={handleShowTable}
                    className="mobile:w-full"
                    labelClassName="mobile:flex mobile:justify-center mobile:w-full"
                  />
                )}
                <Detalle directLendingResumen={directLendingResumen} />
                <div className="flex flex-col gap-3.5 mt-4">
                  <div className="flex flex-col gap-2 border-4 border-gray-100 p-4 rounded-lg">
                    <div className="flex flex-col text-base font-normal">
                      Número de cuenta
                      <span className="font-medium">
                        {formatIban(directLendingResumen.cuentaPago.iban)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {device !== 'mobile' && (
              <div className="w-full">
                {params.id && (
                  <FichaPrestamoTable
                    id={params.id}
                    libradorRazonSocial={libradorRazonSocial}
                    tienePagares={tienePagares}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FichaPrestamo;
