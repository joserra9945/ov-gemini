import { useContext, useMemo } from 'react';

import { formatCurrency } from '@shared/utils/formatters';

import useMultiStepForm from '../../hook/useMultiStepForm';
import NewDirectLendingContext from '../context/NewDirectLendingContext';

import InfoBlock from './InfoBlock';

const Resumen: React.FC = () => {
  const { directLendingData } = useContext(NewDirectLendingContext);
  const { config } = useMultiStepForm();

  const firmantesName = useMemo(() => {
    if (directLendingData.firmantes) {
      return directLendingData.firmantes
        .map(
          (firmante) =>
            `${firmante.persona?.nombre} ${firmante.persona?.apellidos}`
        )
        .join(' | ');
    }
    return '';
  }, [directLendingData.firmantes]);

  return (
    <div className="w-full h-full flex flex-col bg-white p-4">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row justify-between mobile:flex-col pb-8 border-b border-dotted border-gray-300">
          <InfoBlock
            title={`Datos del ${config.productoSingular}`}
            description="Concepto"
            content={`${directLendingData.concepto.description}`}
          />
          <div className="flex flex-row mobile:flex-col justify-evenly items-end mobile:items-start grow">
            <div>
              <p className="font-roboto text-base font-normal leading-5 mobile:pt-2">
                Plazo en meses
              </p>
              <p className="font-roboto text-lg font-bold leading-5">
                {directLendingData.meses.id}{' '}
                {directLendingData.meses.id === 1 ? 'mes' : 'meses'}
              </p>
            </div>
            <div>
              <p className="font-roboto text-base font-normal leading-5 mobile:pt-2">
                Importe del {config.productoSingular}
              </p>
              <p className="font-roboto text-lg font-bold">
                {formatCurrency(directLendingData.importe)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row justify-between pb-8 border-b border-dotted border-gray-300 overflow-auto">
          <InfoBlock
            title="Firmantes"
            description="Firmantes"
            content={firmantesName}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row justify-between pb-8 border-b border-dotted border-gray-300">
          <InfoBlock
            title="Cuenta bancaria"
            description="IBAN"
            content={directLendingData.cuentaBancaria?.iban}
          />
        </div>
      </div>
    </div>
  );
};

export default Resumen;
