import { IPrestamoIdGet } from '@shared/interfaces/IPrestamo';
import { formatCurrency } from '@shared/utils/formatters';

interface CuotaMensualProps {
  directLendingResumen: IPrestamoIdGet;
}

const CuotaMensual = ({ directLendingResumen }: CuotaMensualProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-4 border-gray-100 p-4 rounded-lg">
        <div className="flex flex-row justify-between text-lg font-normal font-roboto leading-6 mb-4 whitespace-nowrap -xl:whitespace-normal @2xl:whitespace-nowrap -xl:text-lg -lg:text-base">
          <span className="xl:whitespace-nowrap lg:whitespace-nowrap @2xl:whitespace-nowrap -xl:text-lg -lg:text-base">
            Importe solicitado
          </span>
          <span className="font-bold text-right -xl:text-lg -lg:text-base">
            {formatCurrency(directLendingResumen.importeInicial ?? '- -- €')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between text-sm font-normal font-roboto leading-6 -lg:text-xs">
            Interés préstamo
            <span className="font-bold">
              {formatCurrency(
                directLendingResumen.importes?.importeInteres ?? '- -- €'
              )}
            </span>
          </div>
          <div className="flex flex-row justify-between text-sm font-normal font-roboto leading-6 -lg:text-xs">
            Comisiones apertura
            <span className="font-bold">
              {formatCurrency(
                directLendingResumen.importes?.importeComision ?? '- -- €'
              )}
            </span>
          </div>
          <div className="flex flex-row justify-between text-sm font-normal font-roboto leading-6 -lg:text-xs">
            Gastos de gestión
            <span className="font-bold">
              {formatCurrency(
                directLendingResumen.importes?.importeGastosDeGestion ??
                  '- -- €'
              )}
            </span>
          </div>
          <div className="flex flex-row justify-between text-sm font-normal font-roboto leading-6 -lg:text-xs">
            Provisión de fondos
            <span className="font-bold">
              {formatCurrency(
                directLendingResumen.importes?.importeProvisionDeFondos ??
                  '- -- €'
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between font-bold text-lg font-roboto leading-6 py-2 border-b border-gray-200 mt-4 -xl:text-lg -lg:text-base">
          Líquido
          <span className="font-bold text-right -xl:text-lg -lg:text-base">
            {formatCurrency(
              directLendingResumen.importes?.importeLiquido ?? '- -- €'
            )}
          </span>
        </div>
        <div className="flex flex-row justify-between font-normal font-roboto leading-6 py-2 -xl:whitespace-normal @2xl:whitespace-nowrap -xl:text-base -lg:text-sm">
          Cuota mensual
          <span className="font-bold text-right -xl:text-base -lg:text-sm">
            {formatCurrency(directLendingResumen.cuotaMensual ?? '- -- €')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CuotaMensual;
