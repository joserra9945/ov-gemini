import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IOperacionGetByEstudioIdG,
  IOperacionGetByEstudioIdGP,
  IOperacionGetByFiltersG,
  IOperacionGetByFiltersGP,
} from '@shared/interfaces/api';
import {
  IOperacionByIdGet,
  IOperacionByIdGetP,
  IOperacionEstadoPut,
  IOperacionGetResumenByIdGP,
  IOperacionVistaPreciosByIdP,
} from '@shared/interfaces/api/IOperacion';
import { IOperacionAprobarPrecioPut } from '@shared/interfaces/api/IOperacion/IOperacionAprobarPrecioPut';
import {
  IOperacionByLibradorIdGetG,
  IOperacionByLibradorIdGetGP,
} from '@shared/interfaces/api/IOperacion/IOperacionByLibradorIdGet';
import { IOperacionSolicitarPrecioPost } from '@shared/interfaces/api/IOperacion/IOperacionSolicitarPrecioPost';
import {
  ITarificadorConstantsGet,
  ITarificadorConstantsGetP,
} from '@shared/interfaces/api/ITarificador';
import {
  ITarificadorPreciosOperacionByImportesPost,
  ITarificadorPreciosOperacionByImportesPostResponse,
} from '@shared/interfaces/api/ITarificador/ITarificadorPreciosOperacionByImportesPostResponse';
import { useFetch } from '@shared/utils';
import Notifications from '@shared/utils/notifications';
import { queryFixer } from '@shared/utils/utils';

import { IQueryReducer } from '@shared/components/Legacy/TurboTable/helpers';

import { operacion } from './endpoints';
import { useCancelToken } from './useCancelToken';

const useOperacion = () => {
  const {
    get: getOperacion,
    post: postOperacion,
    put: putOperacion,
    remove: deleteOperacion,
    loading,
  } = useFetch(operacion);

  const { newCancelToken } = useCancelToken();

  const operacionByIdGet = useCallback(
    async (operacionId: string): IOperacionByIdGetP => {
      const query = `/${operacionId}`;
      let res;
      try {
        res = await getOperacion<IOperacionByIdGet>(query);
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionByIdGet);
    },
    [getOperacion]
  );

  const operacionByFiltersGet = useCallback(
    async (queryState: IQueryReducer): IOperacionGetByFiltersGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer('by-filters', queryState);
        let res;
        try {
          res = await getOperacion<IOperacionGetByFiltersG>(query, {
            cancelToken: newCancelToken(),
          });
        } catch (e) {
          Notifications.unknownError(e);
        }

        return res || ({} as IOperacionGetByFiltersGP);
      }
      return {} as IOperacionGetByFiltersGP;
    },
    [getOperacion, newCancelToken]
  );

  const operacionSolicitarFirmaByIdPost = useCallback(
    async (id: string) => {
      let res;
      const query = `/solicitar-firma/${id}`;
      try {
        res = await postOperacion(query);
        res &&
          Notifications.success({
            body: 'La solicitud del envío del contrato se ha realizado correctamente',
          });
      } catch (e) {
        Notifications.unknownError(e);
      }
    },
    [postOperacion]
  );

  const operacionIdDelete = useCallback(
    async (id: string) => {
      let res;
      const query = `/${id}`;
      try {
        res = await deleteOperacion(query);
        res &&
          Notifications.success({ body: 'Operación eliminada correctamente' });
      } catch (err) {
        Notifications.unknownError(err);
      }
    },
    [deleteOperacion]
  );

  const operacionByEstudioIdGet = useCallback(
    async (estudioId: string): IOperacionGetByEstudioIdGP => {
      const query = `/by-estudio-id/${estudioId}?MaxResultCount=100`;
      let res;
      try {
        res = await getOperacion<IOperacionGetByEstudioIdG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionGetByEstudioIdGP);
    },
    [getOperacion, newCancelToken]
  );

  const operacionModificarEstadoPut = useCallback(
    async (body: IOperacionEstadoPut) => {
      let res;
      const query = `/estado`;
      try {
        res = await putOperacion(query, body);
      } catch (err) {
        Notifications.unknownError(err);
      }
      return !!res;
    },
    [putOperacion]
  );

  const operacionVistaPreciosByIdGet = useCallback(
    async (id: string): IOperacionVistaPreciosByIdP => {
      let res;
      const query = `/vista-precios/by-id/${id}`;
      try {
        res = await getOperacion<IOperacionVistaPreciosByIdP>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionVistaPreciosByIdP);
    },
    [getOperacion, newCancelToken]
  );

  const operacionResumenByIdGet = useCallback(
    async (id: string): IOperacionGetResumenByIdGP => {
      let res;
      const query = `/resumen/by-id/${id}`;
      try {
        res = await getOperacion<IOperacionGetResumenByIdGP>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionGetResumenByIdGP);
    },
    [getOperacion, newCancelToken]
  );

  const operacionG = useCallback(
    async (id: string): IOperacionByIdGetP => {
      let res;
      try {
        res = await getOperacion<IOperacionByIdGet>(`/${id}`, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionByIdGet);
    },
    [getOperacion, newCancelToken]
  );

  const operacionSolicitarPrecioPost = useCallback(
    async (operacionBody: IOperacionSolicitarPrecioPost) => {
      try {
        const res = await postOperacion('/solicitar-precio', operacionBody);
        res &&
          Notifications.success({ body: 'Precio solicitado correctamente' });
        return res;
      } catch (e) {
        Notifications.unknownError(e);
      }
    },
    [postOperacion]
  );

  const operacionAprobarPrecioPut = useCallback(
    async (operacionBody: IOperacionAprobarPrecioPut) => {
      try {
        const res = await putOperacion('/aprobar-precio', operacionBody);
        res && Notifications.success({ body: 'Precio aprobado correctamente' });
        return res;
      } catch (e) {
        Notifications.unknownError(e);
      }
    },
    [putOperacion]
  );

  const operacionSolicitarFirmaInvalidadaPost = useCallback(
    async (libradorId: string) => {
      try {
        const res = await postOperacion('/solicitar-firma-invalidadas', {
          libradorId,
        });
        return res;
      } catch (err) {
        Notifications.unknownError(err);
      }
    },
    [postOperacion]
  );

  const operacionByLibradorIdGet = useCallback(
    async (
      id: string,
      queryState: IQueryReducer
    ): IOperacionByLibradorIdGetGP => {
      let res;
      const query = queryFixer(`by-librador-id/${id}`, queryState);
      try {
        res = await getOperacion<IOperacionByLibradorIdGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        Notifications.unknownError(e);
      }
      return res || ({} as IOperacionByLibradorIdGetG);
    },
    [getOperacion, newCancelToken]
  );

  const operacionEmpresaInternaPut = useCallback(
    async (operacionId: string, empresaInternaId: string) => {
      try {
        const res = await putOperacion('/empresa-interna', {
          empresaInternaId,
          operacionId,
        });
        res &&
          Notifications.success({
            body: 'Se ha modificado la empresa interna de la operación correctamente',
          });
        return res;
      } catch (e) {
        Notifications.unknownError(e);
      }
    },
    [putOperacion]
  );

  const tarificadorConstantsGet =
    useCallback(async (): ITarificadorConstantsGetP => {
      try {
        const res = await getOperacion<ITarificadorConstantsGet>('/constantes');
        if (res) return res;
      } catch (e) {
        Notifications.unknownError(e);
      }
      return {} as ITarificadorConstantsGet;
    }, [getOperacion]);

  const preciosOperacionByImportesPost = useCallback(
    async (body: ITarificadorPreciosOperacionByImportesPost) => {
      try {
        const res =
          await postOperacion<ITarificadorPreciosOperacionByImportesPostResponse>(
            '/precios-by-importes',
            body
          );
        if (res) {
          Notifications.success({
            body: 'Operación actualizada correctamente',
          });
          return res;
        }
      } catch (e) {
        Notifications.unknownError(e);
      }
      return {} as ITarificadorPreciosOperacionByImportesPostResponse;
    },
    [postOperacion]
  );

  return {
    operacionByIdGet,
    operacionByFiltersGet,
    operacionSolicitarFirmaByIdPost,
    operacionIdDelete,
    operacionByEstudioIdGet,
    operacionModificarEstadoPut,
    operacionVistaPreciosByIdGet,
    operacionG,
    operacionSolicitarPrecioPost,
    operacionAprobarPrecioPut,
    operacionResumenByIdGet,
    operacionSolicitarFirmaInvalidadaPost,
    operacionByLibradorIdGet,
    operacionEmpresaInternaPut,
    tarificadorConstantsGet,
    preciosOperacionByImportesPost,
    loading,
  };
};

export { useOperacion };
