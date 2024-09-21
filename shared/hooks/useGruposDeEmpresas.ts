import { useCallback } from 'react';

import {
  IEmpresaByFiltersGetG,
  IEmpresaByFiltersGetGP,
  IGrupoByFiltersGetG,
  IGrupoByFiltersGetGP,
  IGrupoPut,
} from '@shared/interfaces/api/IGrupoDeEmpresas';
import { IEnum, IEnumArrayP } from '@shared/interfaces/IEnum';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
import { queryFixer } from '@shared/utils/utils';

import { gruposDeEmpresas } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useGruposDeEmpresas = () => {
  const {
    get: getEmpresa,
    put: putEmpresa,
    loading: loadingEmpresa,
  } = useFetch(`${gruposDeEmpresas}/Empresa`);
  const {
    get: getGrupo,
    put: putGrupo,
    post: postGrupo,
    remove: removeGrupo,
    loading: loadingGrupo,
  } = useFetch(`${gruposDeEmpresas}/Grupo`);

  const { get: getEnum } = useFetch(`${gruposDeEmpresas}/Enum`);

  const { newCancelToken } = useCancelToken();

  const crearNuevoGrupo = useCallback(
    async (nombre: string) => {
      let res;
      try {
        res = await postGrupo('', { nombre });
      } catch (err) {
        notifications.unknownError(err);
      }
      notifications.success({ body: 'Grupo creado correctamente' });
      return !!res;
    },
    [postGrupo]
  );
  const editGrupo = useCallback(
    async (grupo: IGrupoPut) => {
      let res;
      try {
        res = await putGrupo('', grupo);
      } catch (err) {
        notifications.unknownError(err);
      }
      notifications.success({ body: 'Grupo modificado correctamente' });
      return !!res;
    },
    [putGrupo]
  );

  const getGrupoByFilters = useCallback(
    async (queryState: IQueryReducer): IGrupoByFiltersGetGP => {
      const query = queryFixer('by-filters', queryState);
      let res;
      try {
        res = await getGrupo<IGrupoByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IGrupoByFiltersGetG);
    },
    [getGrupo, newCancelToken]
  );

  const getEmpresaByFilters = useCallback(
    async (qS: IQueryReducer): IEmpresaByFiltersGetGP => {
      const query = queryFixer('by-filters', qS);
      let res;
      try {
        res = await getEmpresa<IEmpresaByFiltersGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEmpresaByFiltersGetG);
    },
    [getEmpresa, newCancelToken]
  );

  const putEmpresaGrupo = useCallback(
    async (body: { id: string; grupoId?: string; tipoCabecera: number }) => {
      const query = '/grupo';
      let res;
      try {
        res = await putEmpresa(query, body);
        res &&
          notifications.success({ body: 'Grupo modificado correctamente' });
      } catch (err) {
        notifications.unknownError(err);
        return false;
      }
      return !!res;
    },
    [putEmpresa]
  );

  const deleteGrupoEmpresaById = useCallback(
    async (id: string) => {
      const query = `/${id}`;
      let res;
      try {
        res = await removeGrupo(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      notifications.success({ body: 'Grupo eliminado correctamente' });
      return !!res;
    },
    [removeGrupo]
  );

  const getTiposCabeceras = useCallback(async (): IEnumArrayP => {
    const query = '/tipos-cabecera';
    let res;
    try {
      res = await getEnum<IEnum[]>(query, {
        cancelToken: newCancelToken(),
      });
    } catch (err) {
      notifications.unknownError(err);
    }
    return res || [];
  }, [getEnum, newCancelToken]);

  return {
    crearNuevoGrupo,
    editGrupo,
    getEmpresaByFilters,
    getGrupoByFilters,
    deleteGrupoEmpresaById,
    getTiposCabeceras,
    putEmpresaGrupo,
    loadingEmpresa,
    loadingGrupo,
  };
};

export default useGruposDeEmpresas;
