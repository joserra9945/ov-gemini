import { IPrestamoIdGet } from '@shared/interfaces/IPrestamo';
import { ImporteDirectLending } from '@shared/templates';

interface DetalleProps {
  directLendingResumen: IPrestamoIdGet;
}

const Detalle = ({ directLendingResumen }: DetalleProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2 border-4 border-gray-100 p-4 rounded-lg">
        <div className="flex flex-row justify-between text-base font-normal font-roboto leading-6">
          Concepto
          <span className="font-medium text-right">
            {directLendingResumen?.concepto?.description ?? '-'}
          </span>
        </div>
        <div className="flex flex-row justify-between text-base font-normal font-roboto leading-6">
          Duración
          <span className="font-medium">
            {directLendingResumen?.plazoEnMeses
              ? `${directLendingResumen.plazoEnMeses} meses`
              : '-'}
          </span>
        </div>
        <div className="flex flex-row justify-between text-base font-normal font-roboto leading-6">
          Importe
          <span className="font-medium">
            <ImporteDirectLending
              importe={directLendingResumen.importeNominal}
              importeAnterior={directLendingResumen.importeInicial}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
