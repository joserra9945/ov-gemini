import { useCallback } from 'react';

import { useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { IEnum, IEnumArrayP } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { enumurl } from './endpoints';

const useEnum = () => {
  const { get: getEnum, loading } = useFetch(enumurl);

  const enumEtiquetasFormaContactoGet = useCallback(async (): IEnumArrayP => {
    const query = '/etiquetas-forma-contacto';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const enumMotivosRechazoDocumentacionGet =
    useCallback(async (): IEnumArrayP => {
      const query = '/motivos-rechazo-general';
      let res;
      try {
        res = await getEnum<IEnum[]>(query);
      } catch (err) {
        notifications.unknownError(err);
        console.error(err);
      }
      return res || ([] as unknown as IEnum[]);
    }, [getEnum]);

  const enumMotivosRechazoFacturaGet = useCallback(async (): IEnumArrayP => {
    const query = '/motivos-rechazo-factura';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
      console.error(err);
    }
    return res || ([] as unknown as IEnum[]);
  }, [getEnum]);

  const enumMotivosRechazoPagareGet = useCallback(async (): IEnumArrayP => {
    const query = '/motivos-rechazo-pagare';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
      console.error(err);
    }
    return res || ([] as unknown as IEnum[]);
  }, [getEnum]);

  const enumEstadosImpagoGet = useCallback(async (): IEnumArrayP => {
    const query = '/estados-impago';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
      console.error(err);
    }
    return res || ([] as unknown as IEnum[]);
  }, [getEnum]);

  const enumTipoPagosGet = useCallback(async (): IEnumArrayP => {
    const query = '/destinos-pagos';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const codigosEmpresaInternaGet = useCallback(async (): IEnumArrayP => {
    const query = '/codigos-empresa-interna';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const delegacionesEnumGet = useCallback(async (): IEnumArrayP => {
    const query = '/delegaciones';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const enumTiposFirmaNotarial = useCallback(async (): IEnumArrayP => {
    const query = '/tipos-firma-notarial';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);
  const enumPorcentajesCobrosEnEfectivo = useCallback(async (): IEnumArrayP => {
    const query = '/porcentajes-cobro-en-efectivo';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const enumEstadosFinanciacionCesionGet =
    useCallback(async (): IEnumArrayP => {
      const query = '/estados-financiacion-cesion';
      let res;
      try {
        res = await getEnum<IEnum[]>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || [];
    }, [getEnum]);

  const enumConceptosCobroFacturaNoFinanciadaGet =
    useCallback(async (): IEnumArrayP => {
      const query = '/conceptos-cobro-factura-no-financiada';
      let res;
      try {
        res = await getEnum<IEnum[]>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || [];
    }, [getEnum]);
  const enumTiposRiesgoGet = useCallback(async (): IEnumArrayP => {
    const query = '/tipos-riesgo';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);
  const enumConceptosDirectLendingGet = useCallback(async (): IEnumArrayP => {
    const query = '/conceptos-direct-lending';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const enumDelegacionGet = useCallback(async (): IEnumArrayP => {
    const query = '/delegaciones';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);
  const enumTiposEstudioGet = useCallback(async (): IEnumArrayP => {
    const query = '/tipos-estudio';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  const enumMesesGet = useCallback(async (): IEnumArrayP => {
    const query = '/meses';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);
  const enumTiposAvalGet = useCallback(async (): IEnumArrayP => {
    const query = '/tipos-aval';
    let res;
    try {
      res = await getEnum<IEnum[]>(query);
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum]);

  return {
    loading,
    enumEtiquetasFormaContactoGet,
    enumMotivosRechazoDocumentacionGet,
    enumMotivosRechazoFacturaGet,
    enumMotivosRechazoPagareGet,
    enumEstadosImpagoGet,
    enumTipoPagosGet,
    codigosEmpresaInternaGet,
    delegacionesEnumGet,
    enumTiposFirmaNotarial,
    enumPorcentajesCobrosEnEfectivo,
    enumEstadosFinanciacionCesionGet,
    enumConceptosCobroFacturaNoFinanciadaGet,
    enumTiposRiesgoGet,
    enumConceptosDirectLendingGet,
    enumMesesGet,
    enumDelegacionGet,
    enumTiposEstudioGet,
    enumTiposAvalGet,
  };
};

export default useEnum;
