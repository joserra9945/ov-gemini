import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import notifications from '@shared/utils/notifications';

import { ingreso } from './endpoints';
import { useFetch } from './useFetch';

const useIngreso = () => {
  const {
    post: postIngreso,
    remove: removeIngreso,
    loading,
  } = useFetch(ingreso);

  const ingresoPost = useCallback(
    async (data: FieldValues) => {
      try {
        const res = await postIngreso('', data);
        res && notifications.success({ body: 'Ingreso creado correctamente' });
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postIngreso]
  );

  const deleteIngreso = useCallback(
    async (id: string) => {
      try {
        const res = await removeIngreso(`/${id}`);
        return res;
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [removeIngreso]
  );

  const origenRetencionIngresoPost = useCallback(
    async (empresaInternaId: string, importe: number, libradorId: string) => {
      let res;
      try {
        res = await postIngreso('/origen-retencion', {
          empresaInternaId,
          importe,
          libradorId,
        });
        res && notifications.success({ body: 'Ingreso creado correctamente' });
        return res;
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [postIngreso]
  );

  return { ingresoPost, deleteIngreso, origenRetencionIngresoPost, loading };
};

export default useIngreso;
