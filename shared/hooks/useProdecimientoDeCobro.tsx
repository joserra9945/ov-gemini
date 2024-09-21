import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import {
  IProcedimientoDeCobroSinCesionAceptadaG,
  IProcedimientoDeCobroSinCesionAceptadaGP,
} from '@shared/interfaces/api/IProcedimientoDeCobro';
import notifications from '@shared/utils/notifications';

import { procedimientoDeCobro } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useProcedimientoDeCobro = () => {
  const { get: getProcedimientoDeCobro, put: putProcedimientoDeCobro } =
    useFetch(procedimientoDeCobro);
  const { newCancelToken } = useCancelToken();

  const procedimientoDeCobroSinCesionAceptadaGet = useCallback(
    async (
      libradoId: string,
      libradorId: string
    ): IProcedimientoDeCobroSinCesionAceptadaGP => {
      const query = `/sin-cesion-aceptada?LibradoId=${libradoId}&LibradorId=${libradorId}`;
      let res;
      try {
        res =
          await getProcedimientoDeCobro<IProcedimientoDeCobroSinCesionAceptadaG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IProcedimientoDeCobroSinCesionAceptadaGP);
    },
    [getProcedimientoDeCobro, newCancelToken]
  );

  const procedimientoDeCobroPut = useCallback(
    async (data: FieldValues) => {
      let res;
      const query = '';
      try {
        res = await putProcedimientoDeCobro(query, data);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res;
    },
    [putProcedimientoDeCobro]
  );
  return { procedimientoDeCobroSinCesionAceptadaGet, procedimientoDeCobroPut };
};

export default useProcedimientoDeCobro;
