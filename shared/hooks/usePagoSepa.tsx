import { useCallback } from 'react';

import {
  IPagoSepaByIdGet,
  IPagoSepaByIdGetP,
} from '@shared/interfaces/IPagoSepa';
import notifications from '@shared/utils/notifications';

import { pagoSepa } from './endpoints';
import { useFetch } from './useFetch';

const usePagoSepa = () => {
  const { get: getPagoSepa, post: postPagoSepa } = useFetch(pagoSepa);

  const pagoSepaByIdGet = useCallback(
    async (id: string): IPagoSepaByIdGetP => {
      const query = `/by-id/${id}`;
      let res;
      try {
        res = await getPagoSepa<IPagoSepaByIdGet>(query);
        res &&
          notifications.success({
            body: 'Documento SEPA descargado correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IPagoSepaByIdGet);
    },
    [getPagoSepa]
  );

  const pagoSepaPost = useCallback(
    async (cuentaOrigenId: string, pagoIds: string[]) => {
      let res;
      try {
        res = await postPagoSepa('', { cuentaOrigenId, pagoIds });
        res &&
          notifications.success({
            body: 'Documento SEPA creado correctamente',
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postPagoSepa]
  );

  return { pagoSepaByIdGet, pagoSepaPost };
};
export default usePagoSepa;
