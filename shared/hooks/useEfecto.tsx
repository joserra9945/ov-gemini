import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IEfectoByGestionFiltersGetG,
  IEfectoByGestionFiltersGetGP,
  IEfectoById,
  IEfectoByIdP,
  IEfectoByIngresoIdExternoGetG,
  IEfectoByIngresoIdExternoGetGP,
  IEfectoByOperacionIdGetG,
  IEfectoByOperacionIdGetGP,
  IEfectoDocumentacionRequeridaByEstudioIdGetG,
  IEfectoDocumentacionRequeridaByEstudioIdGetGP,
  IEfectoDocumentacionRequeridaPendienteByOperacionIdG,
  IEfectoDocumentacionRequeridaPendienteByOperacionIdGP,
  IEfectoEstadoFinanciacionPut,
  IEfectoPrecioByOperacionGetG,
  IEfectoPrecioByOperacionGetGP,
  IEfectoRevisablesByEstudioIdGetG,
  IEfectoRevisablesByEstudioIdGetGP,
  IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetG,
  IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetGP,
  IEstadosVerificacionByEstudioId,
  IEstadosVerificacionByEstudioIdP,
  IEstadosVerificacionByOperacionId,
  IEstadosVerificacionByOperacionIdP,
} from '@shared/interfaces/api/IEfecto';
import {
  IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG,
  IEfectoDocumentacionRequeridaPendienteByLibradorIdGetGP,
} from '@shared/interfaces/api/IEfecto/IEfectoDocumentacionRequeridaPendienteByLibradorIdGet';
import {
  IEfectoFinanciadosByFiltersGetG,
  IEfectoFinanciadosByFiltersGetGP,
} from '@shared/interfaces/api/IEfecto/IEfectoFinanciadosByFiltersGet';
import {
  IEfectoNoFinanciadosByFiltersGetG,
  IEfectoNoFinanciadosByFiltersGetGP,
} from '@shared/interfaces/api/IEfecto/IEfectoNoFinanciadosByFiltersGet';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { efecto } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useEfecto = () => {
  const { get: getEfecto, put: putEfecto, loading } = useFetch(efecto);
  const { newCancelToken } = useCancelToken();

  const efectoDocumentacionRequeridaByOperacionIdGet = useCallback(
    async (id: string): IEfectoDocumentacionRequeridaByEstudioIdGetGP => {
      let res;
      const query = `/documentacion-requerida/by-operacion-id/${id}`;
      try {
        res = await getEfecto<IEfectoDocumentacionRequeridaByEstudioIdGetG>(
          query
          // {
          //   cancelToken: newCancelToken(),
          // }
        );
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return res || ({} as IEfectoDocumentacionRequeridaByEstudioIdGetGP);
    },
    [
      getEfecto,
      // newCancelToken
    ]
  );

  const efectoRevisableByEstudioId = useCallback(
    async (id: string): IEfectoRevisablesByEstudioIdGetGP => {
      let res;
      const query = `/revisables/by-estudio-id/${id}?MaxResultCount=100`;
      try {
        res = await getEfecto<IEfectoRevisablesByEstudioIdGetG>(
          query
          //   , {
          //   cancelToken: newCancelToken(),
          // }
        );
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return res || ({} as IEfectoRevisablesByEstudioIdGetGP);
    },
    [
      getEfecto,
      // newCancelToken
    ]
  );

  const efectoEstadoFinaciacionPut = useCallback(
    async (obj: IEfectoEstadoFinanciacionPut) => {
      let res;
      const query = `/estado-financiacion`;
      try {
        res = await putEfecto(query, obj);

        if (res) {
          notifications.success({
            title: '¡Éxito!',
            body: 'Se ha modificado el estado correctamente',
          });
        }
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return res;
    },
    [putEfecto]
  );

  const efectoSinOperacionDocumentacionRequeridaByEstudioIdGet = useCallback(
    async (
      estudioId: string
    ): IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetGP => {
      let res;
      const query = `/sin-operacion/documentacion-requerida/by-estudio-id/${estudioId}`;
      try {
        res =
          await getEfecto<IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetG>(
            query,
            { cancelToken: newCancelToken() }
          );
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return (
        res || ({} as IEfectoSinOperacionDocumentacionRequeridaByEstudioIdGetGP)
      );
    },
    [getEfecto, newCancelToken]
  );

  const efectoByOperacionIdGet = useCallback(
    async (
      operacionId: string,
      queryState: IQueryReducer
    ): IEfectoByOperacionIdGetGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`by-operacion-id/${operacionId}`, queryState);
        let res;
        try {
          res = await getEfecto<IEfectoByOperacionIdGetG>(
            `${
              query.includes('esFictio=')
                ? `${query}`
                : `${query}&esFictio=false`
            }`,
            {
              cancelToken: newCancelToken(),
            }
          );
        } catch (err) {
          notifications.unknownError(err);
        }
        return res || ({} as IEfectoByOperacionIdGetGP);
      }
      return {} as IEfectoByOperacionIdGetGP;
    },
    [getEfecto, newCancelToken]
  );

  const efectoVistaPreciosByOperacionIdGet = async (
    id: string,
    params?: IQueryReducer
  ): IEfectoPrecioByOperacionGetGP => {
    const query = params
      ? queryFixer(`/vista-precios/by-operacion-id/${id}`, params)
      : `/vista-precios/by-operacion-id/${id}`;

    const res = await getEfecto<IEfectoPrecioByOperacionGetG>(query, {
      cancelToken: newCancelToken(),
    });
    return res || ({} as IEfectoPrecioByOperacionGetGP);
  };

  const documentacionRequeridaPendienteByOperacionIdGet = useCallback(
    async (
      id: string
    ): IEfectoDocumentacionRequeridaPendienteByOperacionIdGP => {
      let res;
      const query = `/documentacion-requerida/pendiente/by-operacion-id/${id}`;
      try {
        res =
          await getEfecto<IEfectoDocumentacionRequeridaPendienteByOperacionIdG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return (
        res || ({} as IEfectoDocumentacionRequeridaPendienteByOperacionIdGP)
      );
    },
    [getEfecto, newCancelToken]
  );

  const efectoByIdGet = useCallback(
    async (id: string): IEfectoByIdP => {
      let res;
      const query = `/${id}`;
      try {
        res = await getEfecto<IEfectoById>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        console.error(e);
        notifications.unknownError(e);
      }
      return res || ({} as IEfectoById);
    },
    [getEfecto, newCancelToken]
  );

  const efectoByGestionFiltersGet = useCallback(
    async (params: IQueryReducer): IEfectoByGestionFiltersGetGP => {
      const query = queryFixer('by-gestion-filters', params);
      let res;

      try {
        res = await getEfecto<IEfectoByGestionFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEfectoByGestionFiltersGetG);
    },
    [getEfecto, newCancelToken]
  );

  const estadosVerificacionByEstudioId = useCallback(
    async (estudioId: string): IEstadosVerificacionByEstudioIdP => {
      const query = `/estados-verificacion/by-estudio-id/${estudioId}`;
      let res;
      try {
        res = await getEfecto<IEstadosVerificacionByEstudioId[]>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ([] as IEstadosVerificacionByEstudioId[]);
    },
    [getEfecto]
  );
  const estadosVerificacionByOperacionId = useCallback(
    async (operacionId: string): IEstadosVerificacionByOperacionIdP => {
      const query = `/estados-verificacion/by-operacion-id/${operacionId}`;
      let res;
      try {
        res = await getEfecto<IEstadosVerificacionByOperacionId[]>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ([] as IEstadosVerificacionByOperacionId[]);
    },
    [getEfecto]
  );
  const efectoByIngresoIdExternoById = useCallback(
    async (id: string): IEfectoByIngresoIdExternoGetGP => {
      const query = `/by-ingreso-id-externo/${id}`;
      let res;
      try {
        res = await getEfecto<IEfectoByIngresoIdExternoGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEfectoByIngresoIdExternoGetG);
    },
    [getEfecto]
  );

  const efectosNoFinanciadosByFiltersGet = useCallback(
    async (qS: IQueryReducer): IEfectoNoFinanciadosByFiltersGetGP => {
      const query = queryFixer('no-financiados/by-filters', qS);
      let res;
      try {
        res = await getEfecto<IEfectoNoFinanciadosByFiltersGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEfectoNoFinanciadosByFiltersGetG);
    },
    [getEfecto]
  );

  const efectosFinanciadosByFiltersGet = useCallback(
    async (qS: IQueryReducer): IEfectoFinanciadosByFiltersGetGP => {
      const query = queryFixer('financiados/by-filters', qS);
      let res;
      try {
        res = await getEfecto<IEfectoFinanciadosByFiltersGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEfectoFinanciadosByFiltersGetG);
    },
    [getEfecto]
  );
  const efectoDocumentacionRequeridaPendienteByLibradorIdGet = useCallback(
    async (
      libradoId: string,
      qS: IQueryReducer
    ): IEfectoDocumentacionRequeridaPendienteByLibradorIdGetGP => {
      const query = queryFixer(
        `documentacion-requerida/pendiente/by-librador-id/${libradoId}`,
        qS
      );
      let res;
      try {
        res =
          await getEfecto<IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG>(
            query
          );
      } catch (err) {
        notifications.unknownError(err);
      }
      return (
        res || ({} as IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG)
      );
    },
    [getEfecto]
  );

  return {
    loading,
    efectoDocumentacionRequeridaByOperacionIdGet,
    efectoRevisableByEstudioId,
    efectoEstadoFinaciacionPut,
    efectoSinOperacionDocumentacionRequeridaByEstudioIdGet,
    efectoByOperacionIdGet,
    efectoVistaPreciosByOperacionIdG: efectoVistaPreciosByOperacionIdGet,
    documentacionRequeridaPendienteByOperacionIdGet,
    efectoByIdGet,
    efectoByGestionFiltersGet,
    estadosVerificacionByEstudioId,
    estadosVerificacionByOperacionId,
    efectoByIngresoIdExternoById,
    efectosNoFinanciadosByFiltersGet,
    efectosFinanciadosByFiltersGet,
    efectoDocumentacionRequeridaPendienteByLibradorIdGet,
  };
};

export { useEfecto };
