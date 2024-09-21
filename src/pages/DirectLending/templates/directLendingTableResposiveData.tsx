import { Dispatch, SetStateAction } from 'react';

import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';
import {
  EstadoDirectLending,
  ImporteDirectLending,
  StringTemplate,
} from '@shared/templates';

import { ShowResumenTemplate } from './showResumenButton';

interface DirectLendingTableResponsiveDataProps {
  prestamo: IDirectLendingByFiltersGet;
  setShowResumen: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<IDirectLendingByFiltersGet>>;
}

export const directLendingTableResponsiveData = ({
  prestamo,
  setShowResumen,
  setSelected,
}: DirectLendingTableResponsiveDataProps) => {
  const {
    numero,
    concepto,
    plazoEnMeses,
    estado,
    importeInicial,
    importeNominal,
  } = prestamo;
  return {
    header: {
      left: <StringTemplate text={numero.toString()} />,
      right: (
        <ShowResumenTemplate
          prestamo={prestamo}
          setShowResumen={setShowResumen}
          setSelected={setSelected}
        />
      ),
    },
    content: [
      {
        label: 'Concepto',
        value: <StringTemplate text={concepto.description} />,
      },
      {
        label: 'Plazo (meses)',
        value: <StringTemplate text={plazoEnMeses.toString()} />,
      },
      {
        label: 'Estado',
        value: (
          <EstadoDirectLending
            id={estado.id}
            description={estado.description}
          />
        ),
      },
      {
        label: 'Importe',
        value: (
          <ImporteDirectLending
            importe={importeNominal}
            importeAnterior={importeInicial}
          />
        ),
      },
    ],
  };
};
