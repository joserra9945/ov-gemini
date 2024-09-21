import { Dispatch, FC, SetStateAction } from 'react';
import { faBallotCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDirectLendingByFiltersGet } from '@shared/interfaces/api/IDirectLending';

interface ShowResumenTemplateProps {
  prestamo: IDirectLendingByFiltersGet;
  setShowResumen: Dispatch<SetStateAction<boolean>>;
  setSelected: Dispatch<SetStateAction<IDirectLendingByFiltersGet>>;
}
export const ShowResumenTemplate: FC<ShowResumenTemplateProps> = ({
  prestamo,
  setShowResumen,
  setSelected,
}) => {
  const {
    numero,
    concepto,
    plazoEnMeses,
    estado,
    importeInicial,
    importeNominal,
    id,
    fechaDeFin,
    tipoAval,
    fechaValor,
    librador,
    producto,
  } = prestamo;
  const showResumenHandler = () => {
    setShowResumen(true);
    setSelected({
      numero,
      concepto,
      plazoEnMeses,
      estado,
      importeInicial,
      importeNominal,
      id,
      fechaDeFin,
      tipoAval,
      descripcionEstado: '',
      fechaValor,
      librador,
      producto,
    });
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faBallotCheck}
        className="cursor-pointer"
        size="lg"
        onClick={showResumenHandler}
      />
      <span className="absolute animate-ping inline-flex rounded-full bg-warning opacity-75 h-1 w-1" />
    </div>
  );
};
