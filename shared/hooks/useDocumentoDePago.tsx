import { useCallback } from 'react';

import {
  IDocumenDePagoDeudaByIdGet,
  IDocumenDePagoDeudaByIdGetP,
  IDocumentoDePagoByPagoIdGet,
  IDocumentoDePagoByPagoIdGetP,
} from '@shared/interfaces/api/IDocumentoDePago';
import notifications from '@shared/utils/notifications';

import { documentoDePago } from './endpoints';
import { useFetch } from './useFetch';

const useDocumentoDePago = () => {
  const { get, post } = useFetch(documentoDePago);

  const documentoDePagoByPagoIdGet = useCallback(
    async (pagoId: string, estadoId?: number): IDocumentoDePagoByPagoIdGetP => {
      const query = !estadoId
        ? `/by-pago-id/${pagoId}`
        : `/by-pago-id/${pagoId}?tipoDocumento=${estadoId}`;
      let res;
      try {
        res = await get<IDocumentoDePagoByPagoIdGetP>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumentoDePagoByPagoIdGet);
    },
    [get]
  );

  const justficantePagoDeudaPost = useCallback(
    async (formFiles: FormData) => {
      let res;
      try {
        res = await post(`/justificante-pago-deuda`, formFiles);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [post]
  );

  const documentoDeudaByIdGet = useCallback(
    async (pagoId: string): IDocumenDePagoDeudaByIdGetP => {
      const query = `/documento-deuda/by-pago-id/${pagoId}`;
      let res;
      try {
        res = await get<IDocumenDePagoDeudaByIdGetP>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumenDePagoDeudaByIdGet);
    },
    [get]
  );

  const justificanteDeudaByIdGet = useCallback(
    async (pagoId: string): IDocumenDePagoDeudaByIdGetP => {
      const query = `/justificante-pago-deuda/by-pago-id/${pagoId}`;
      let res;
      try {
        res = await get<IDocumenDePagoDeudaByIdGetP>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IDocumenDePagoDeudaByIdGet);
    },
    [get]
  );
  return {
    documentoDePagoByPagoIdGet,
    justficantePagoDeudaPost,
    documentoDeudaByIdGet,
    justificanteDeudaByIdGet,
  };
};

export default useDocumentoDePago;
