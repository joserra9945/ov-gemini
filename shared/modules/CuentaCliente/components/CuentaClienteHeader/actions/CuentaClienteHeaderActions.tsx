import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

const CuentaClienteHeaderActions = () => {
  const rhForm = useForm({ mode: 'onChange' });

  const handleDevolucionRetencion = (
    modals: { [key: string]: boolean },
    setModals: Dispatch<SetStateAction<{ [key: string]: boolean }>>
  ) => {
    setModals({ ...modals, devolucionRetencion: true });
  };

  const handleModificarPorcentajeRetencion = (
    porcentajeRetencion: number,
    modals: { [key: string]: boolean },
    setModals: Dispatch<SetStateAction<{ [key: string]: boolean }>>
  ) => {
    setModals({ ...modals, modificarPorcentajeRetencion: true });
    rhForm.setValue('porcentajeRetencion', porcentajeRetencion);
  };

  const handleGenerarIngreso = (
    modals: { [key: string]: boolean },
    setModals: Dispatch<SetStateAction<{ [key: string]: boolean }>>
  ) => {
    setModals({ ...modals, generarIngreso: true });
  };

  return {
    handleDevolucionRetencion,
    handleModificarPorcentajeRetencion,
    handleGenerarIngreso,
  };
};

export default CuentaClienteHeaderActions;
