import { Dispatch, SetStateAction } from 'react';
import {
  faArrowRotateLeft,
  faPencil,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cuentaClienteActions from './CuentaClienteHeaderActions';

const cuentaClienteHeaderOptions = (
  porcentajeRetencion: number,
  modals: { [key: string]: boolean },
  setModals: Dispatch<SetStateAction<{ [key: string]: boolean }>>
) => {
  const {
    handleDevolucionRetencion,
    handleModificarPorcentajeRetencion,
    handleGenerarIngreso,
  } = cuentaClienteActions();

  return [
    {
      label: 'Devolver retención',
      icon: <FontAwesomeIcon className="mr-1" icon={faArrowRotateLeft} />,
      command: () => handleDevolucionRetencion(modals, setModals),
    },
    {
      label: 'Editar porcentaje de retención',
      icon: <FontAwesomeIcon className="mr-1" icon={faPencil} />,
      command: () =>
        handleModificarPorcentajeRetencion(
          porcentajeRetencion,
          modals,
          setModals
        ),
    },
    {
      label: 'Generar ingreso',
      icon: <FontAwesomeIcon className="mr-1" icon={faPlus} />,
      command: () => handleGenerarIngreso(modals, setModals),
    },
  ];
};

export default cuentaClienteHeaderOptions;
