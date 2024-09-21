import { useCallback } from 'react';
import { OrganizationChartNodeData } from 'primereact/organizationchart';
import { AxiosRequestConfig } from 'axios';

import {
  IPrasAccionByLibradoCifGetP,
  IPrasBalanceGetP,
  IPrasCargosByCifP,
  IPrasCuentaResultadoGetP,
  IPrasDetalleMotivoCifGetP,
  IPrasICOByCifGetP,
  IPrasImporteProductosGetP,
  IPrasListadoMotivoGetP,
  IPrasListadoScoringGetP,
  IPrasScoringByLibradoCifGetP,
  IPrasScoringCambioBodyPost,
} from '@shared/interfaces/api/IPras';
import notifications from '@shared/utils/notifications';

import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const esProduccion = process.env.REACT_APP_API_ENV === 'PRODUCTION';

const prasConfig: AxiosRequestConfig = {
  baseURL: esProduccion ? 'https://api.pras.es' : 'https://api.prepras.app',
  responseType: 'json',
};
interface INodoGrupo extends OrganizationChartNodeData {
  data: { CIF: string; RS: string; level: number };
  groupName?: string;
}

const usePras = () => {
  const { get: getPras, post } = useFetch('', prasConfig);
  const { newCancelToken } = useCancelToken();

  const prasAccionByLibradoCifGet = useCallback(
    async (libradoCif: string): IPrasAccionByLibradoCifGetP => {
      const query = `/accion/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasAccionByLibradoCifGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasAccionByLibradoCifGetP);
    },
    [getPras, newCancelToken]
  );

  const prasScoringByLibradoCifGet = useCallback(
    async (libradoCif: string): IPrasScoringByLibradoCifGetP => {
      const query = `/scoring/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasScoringByLibradoCifGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasScoringByLibradoCifGetP);
    },
    [getPras, newCancelToken]
  );

  const prasDetalleMotivoCifGet = useCallback(
    async (libradoCif: string): IPrasDetalleMotivoCifGetP => {
      const query = `/detalle_motivo_html/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasDetalleMotivoCifGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasDetalleMotivoCifGetP);
    },
    [getPras, newCancelToken]
  );

  const prasBalanceByCifGet = useCallback(
    async (libradoCif: string): IPrasBalanceGetP => {
      const query = `/balance_html/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasBalanceGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasBalanceGetP);
    },
    [getPras, newCancelToken]
  );

  const prasImporteProductosByCifGet = useCallback(
    async (libradoCif: string): IPrasImporteProductosGetP => {
      const query = `/importe_productos2/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasImporteProductosGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasImporteProductosGetP);
    },
    [getPras, newCancelToken]
  );

  const prasCuentaResultadosByIdGet = useCallback(
    async (libradoCif: string): IPrasCuentaResultadoGetP => {
      const query = `/cuentaresultados_html/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasCuentaResultadoGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasCuentaResultadoGetP);
    },
    [getPras, newCancelToken]
  );

  const prasICOByIdGet = useCallback(
    async (libradoCif: string): IPrasICOByCifGetP => {
      const query = `/ico/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasICOByCifGetP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || [];
    },
    [getPras, newCancelToken]
  );
  const prasCargosOCargosCesesByIdGet = useCallback(
    async (libradoCif: string, inactivos?: boolean): IPrasCargosByCifP => {
      const query = `/${
        !inactivos ? 'cargos' : 'cargos_ceses'
      }/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{ data: IPrasCargosByCifP }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as IPrasCargosByCifP);
    },
    [getPras, newCancelToken]
  );
  const prasOrganigramaIdGet = useCallback(
    async (libradoCif: string): Promise<INodoGrupo> => {
      const query = `/organigrama/?cif=${libradoCif}`;
      let res;
      try {
        res = await getPras<{
          data: Promise<INodoGrupo>;
        }>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res?.data || ({} as Promise<INodoGrupo>);
    },
    [getPras, newCancelToken]
  );
  const prasListadoScoring = useCallback(async (): IPrasListadoScoringGetP => {
    const query = `/listado_scoring`;
    let res;
    try {
      res = await getPras<{ data: IPrasListadoScoringGetP }>(query, {
        cancelToken: newCancelToken(),
      });
    } catch (e) {
      notifications.unknownError(e);
    }
    return res?.data || [];
  }, [getPras, newCancelToken]);

  const prasListadoMotivos = useCallback(async (): IPrasListadoMotivoGetP => {
    const query = `/listado_motivos`;
    let res;
    try {
      res = await getPras<{ data: IPrasListadoMotivoGetP }>(query, {
        cancelToken: newCancelToken(),
      });
    } catch (e) {
      notifications.unknownError(e);
    }
    return res?.data || [];
  }, [getPras, newCancelToken]);

  const enviarScoringCambioPost = useCallback(
    async (scoringBody: IPrasScoringCambioBodyPost) => {
      const query = `post/scoring_cambio`;
      let res;
      try {
        res = await post(query, scoringBody);
      } catch (e) {
        notifications.unknownError(e);
        console.error(e);
      }
      return res;
    },
    [post]
  );

  return {
    prasAccionByLibradoCifGet,
    prasScoringByLibradoCifGet,
    prasDetalleMotivoCifGet,
    prasBalanceByCifGet,
    prasImporteProductosByCifGet,
    prasCuentaResultadosByIdGet,
    prasICOByIdGet,
    prasCargosOCargosCesesByIdGet,
    prasOrganigramaIdGet,
    prasListadoScoring,
    prasListadoMotivos,
    enviarScoringCambioPost,
  };
};

export default usePras;
