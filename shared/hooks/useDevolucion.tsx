import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import {
  IDevolucionByEstudioByFiltersGetG,
  IDevolucionByEstudioByFiltersGetGP,
} from '@shared/interfaces/api/IDevolucion';
import notifications from '@shared/utils/notifications';

import { devolucion } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useDevolucion = () => {
  const {
    get: getDevolucion,
    put: putDevolucion,
    post: postDevolucion,
    loading,
  } = useFetch(devolucion);
  const { newCancelToken } = useCancelToken();

  const devolucionByFiltersGet = useCallback(
    async (params: string): IDevolucionByEstudioByFiltersGetGP => {
      const query = `/by-filters${params}`;
      let res;
      try {
        res = await getDevolucion<IDevolucionByEstudioByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IDevolucionByEstudioByFiltersGetG);
    },
    [getDevolucion, newCancelToken]
  );

  const devolucionEstadoByIdsPut = useCallback(
    async (estado: string, id: string[]) => {
      const query = `/estado/by-ids?estado=${estado}`;
      let res;
      try {
        res = await putDevolucion(query, id);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [putDevolucion]
  );

  const devolucionCuentaOrigenByIdPut = useCallback(
    async (params: string) => {
      const query = `/cuenta-origen/by-id/${params}`;
      let res;
      try {
        res = await putDevolucion(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putDevolucion]
  );

  const devolucionFormaPagoByIdPut = useCallback(
    async (params: string) => {
      const query = `/forma-pago/by-id/${params}`;
      let res;
      try {
        res = await putDevolucion(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putDevolucion]
  );

  const devolucionOperacionFraccionarByIdPost = useCallback(
    async (id: string, formData: FieldValues[]) => {
      const query = `/fraccionar/by-id/${id}`;
      let res;
      try {
        res = await postDevolucion(query, formData);
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [postDevolucion]
  );

  const devolucionOperacionFraccionarByImporteMaximoByIdPost = useCallback(
    async (importeMaximo: string, id: string) => {
      const query = `/fraccionar/by-importe-maximo/${importeMaximo}/by-id/${id}`;
      let res;
      try {
        res = await postDevolucion(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, postDevolucion]
  );

  const devolucionRetencionPost = useCallback(
    async (empresaInternaId: string, data: FieldValues) => {
      const query = `/retencion`;
      let res;
      try {
        res = await postDevolucion(query, {
          empresaInternaId,
          ...data,
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [postDevolucion]
  );

  return {
    devolucionByFiltersGet,
    devolucionEstadoByIdsPut,
    devolucionCuentaOrigenByIdPut,
    devolucionFormaPagoByIdPut,
    devolucionOperacionFraccionarByIdPost,
    devolucionOperacionFraccionarByImporteMaximoByIdPost,
    devolucionRetencionPost,
    loading,
  };
};

export default useDevolucion;
