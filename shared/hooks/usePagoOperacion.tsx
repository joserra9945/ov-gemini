import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import {
  IPagoOperacionByEstudioByFiltersGetG,
  IPagoOperacionByEstudioByFiltersGetGP,
  IPagoOperacionByEstudioIdGetG,
  IPagoOperacionByEstudioIdGetGP,
} from '@shared/interfaces/api/IPagoOperacion';
import notifications from '@shared/utils/notifications';

import { pagoOperacion } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const usePagoOperacion = () => {
  const {
    get: getPagoOperacion,
    put: putPagoOperacion,
    post: postPagoOperacion,
    loading,
  } = useFetch(pagoOperacion);
  const { newCancelToken } = useCancelToken();

  const pagoOperacionByEstudioIdGet = useCallback(
    async (id: string): IPagoOperacionByEstudioIdGetGP => {
      const query = `/by-estudio-id/${id}`;
      let res;
      try {
        res = await getPagoOperacion<IPagoOperacionByEstudioIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagoOperacionByEstudioIdGetGP);
    },
    [getPagoOperacion, newCancelToken]
  );

  const pagoOperacionByFiltersGet = useCallback(
    async (params: string): IPagoOperacionByEstudioByFiltersGetGP => {
      const query = `/by-filters${params}`;
      let res;
      try {
        res = await getPagoOperacion<IPagoOperacionByEstudioByFiltersGetG>(
          query,
          {
            cancelToken: newCancelToken(),
          }
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagoOperacionByEstudioByFiltersGetG);
    },
    [getPagoOperacion, newCancelToken]
  );

  const pagoOperacionEstadoByIdsPut = useCallback(
    async (estado: string, id: string[]) => {
      const query = `/estado/by-ids?estado=${estado}`;
      let res;
      try {
        res = await putPagoOperacion(query, id);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [putPagoOperacion]
  );

  const pagoOperacionCuentaOrigenByIdPut = useCallback(
    async (params: string) => {
      const query = `/cuenta-origen/by-id/${params}`;
      let res;
      try {
        res = await putPagoOperacion(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putPagoOperacion]
  );

  const pagoOperacionFormaPagoByIdPut = useCallback(
    async (params: string) => {
      const query = `/forma-pago/by-id/${params}`;
      let res;
      try {
        res = await putPagoOperacion(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putPagoOperacion]
  );

  const pagoOperacionFraccionarByIdPost = useCallback(
    async (id: string, formData: FieldValues[]) => {
      const query = `/fraccionar/by-id/${id}`;
      let res;
      try {
        res = await postPagoOperacion(query, formData);
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [postPagoOperacion]
  );

  const pagoOperacionFraccionarByImporteMaximoByIdPost = useCallback(
    async (importeMaximo: string, id: string) => {
      const query = `/fraccionar/by-importe-maximo/${importeMaximo}/by-id/${id}`;
      let res;
      try {
        res = await postPagoOperacion(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return !!res;
    },
    [postPagoOperacion]
  );
  const pagoOperacionPreviewDivisionGet = useCallback(
    async (importe: string, importeMaximo: string): Promise<number[]> => {
      const query = `/preview-division/${importe}/${importeMaximo}`;
      let res;
      try {
        res = await getPagoOperacion<number[]>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.warning({
          body: 'No se ha podido calcular la división de pagos',
        });
      }
      return res || [];
    },
    [newCancelToken, getPagoOperacion]
  );

  return {
    pagoOperacionByEstudioIdGet,
    pagoOperacionByFiltersGet,
    pagoOperacionEstadoByIdsPut,
    pagoOperacionCuentaOrigenByIdPut,
    pagoOperacionFormaPagoByIdPut,
    pagoOperacionFraccionarByIdPost,
    pagoOperacionFraccionarByImporteMaximoByIdPost,
    pagoOperacionPreviewDivisionGet,
    loading,
  };
};

export default usePagoOperacion;
