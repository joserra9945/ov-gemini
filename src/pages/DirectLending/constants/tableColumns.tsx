import { Dispatch, SetStateAction } from 'react';
import { faBallotCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IColumn } from '@shared/components/TurboTable/interfaces/TurboTableType';
import { TurboTableResponsiveTemplate } from '@shared/components/TurboTable/templates/ResponsiveTemplate';
import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';
import {
  EstadoDirectLending,
  ImporteDirectLending,
  StringTemplate,
} from '@shared/templates';

import { directLendingTableResponsiveData } from '../templates/directLendingTableResposiveData';

export const tableColumns = (
  setShowResumen: Dispatch<SetStateAction<boolean>>,
  setSelected: Dispatch<SetStateAction<IDirectLendingByFiltersGet>>
) => {
  const columns: IColumn[] = [
    {
      name: '',
      body: (record: IDirectLendingByFiltersGet) =>
        TurboTableResponsiveTemplate(
          directLendingTableResponsiveData({
            prestamo: record,
            setShowResumen,
            setSelected,
          }),
          record
        ),
      devices: ['mobile', 'tablet'],
      className: 'force-col-p-0 force-hide-header',
    },
    {
      header: 'Nº préstamo',
      name: 'numero',
      body: ({ numero }: IDirectLendingByFiltersGet) => (
        <StringTemplate className="text-info" text={numero.toString()} />
      ),
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Concepto',
      body: ({ concepto }: IDirectLendingByFiltersGet) => (
        <StringTemplate text={concepto.description} />
      ),
      name: 'concepto',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Plazo (meses)',
      body: ({ plazoEnMeses }: IDirectLendingByFiltersGet) => (
        <StringTemplate text={plazoEnMeses.toString()} />
      ),
      name: 'concepto',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Estado',
      body: ({ estado, descripcionEstado }: IDirectLendingByFiltersGet) => (
        <EstadoDirectLending
          id={estado.id}
          description={estado.description}
          descripcionEstado={descripcionEstado}
        />
      ),
      name: 'estado',
      align: 'left',
      devices: ['desktop'],
    },
    {
      header: 'Importe',
      body: ({
        importeInicial,
        importeNominal,
      }: IDirectLendingByFiltersGet) => (
        <ImporteDirectLending
          importe={importeNominal}
          importeAnterior={importeInicial}
        />
      ),
      name: 'importe',
      align: 'right',
      alignHeader: 'right',
      devices: ['desktop'],
    },
    {
      body: (rowData: IDirectLendingByFiltersGet) => (
        <div className="relative">
          <FontAwesomeIcon
            icon={faBallotCheck}
            className="cursor-pointer"
            size="lg"
            onClick={() => {
              setShowResumen(true);
              setSelected(rowData);
            }}
          />
          <span className="absolute animate-ping inline-flex rounded-full bg-warning opacity-75 h-1 w-1" />
        </div>
      ),
      align: 'left',
      devices: ['desktop'],
      name: '',
    },
  ];
  return columns;
};
