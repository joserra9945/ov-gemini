import { useCallback } from 'react';
import { isEmpty } from 'lodash';

import {
  IEmpresaExternaActiva,
  IEmpresaExternaActivaP,
  IEmpresaExternaAvalistasByDirectLendingIdGetG,
  IEmpresaExternaAvalistasByDirectLendingIdGetGP,
  IEmpresaExternaById,
  IEmpresaExternaByRazonSocialIdGetG,
  IEmpresaExternaByRazonSocialIdGetGP,
  IEmpresaExternaCuentaClienteByIdGetG,
  IEmpresaExternaCuentaClienteByIdGetGP,
  IEmpresaExternaCuentaClienteGet,
  IEmpresaExternaCuentaClienteGetP,
  IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetG,
  IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetGP,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdG,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdGP,
  IEmpresaExternaDocumentacionSinRequerirEmpresaById,
  IEmpresaExternaDocumentacionSinRequerirEmpresaByIdP,
  IEmpresaExternaFormasDeContactoById,
  IEmpresaExternaFormasDeContactoByIdG,
  IEmpresaExternaFormasDeContactoByIdGP,
  IEmpresaExternaFormasDeContactoByIdP,
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
  IEmpresaExternaIdRiesgoLibradoresGetGP,
  IEmpresaExternaKycByIdGet,
  IEmpresaExternaKycByIdGetP,
  IEmpresaExternaLibradorByCifGet,
  IEmpresaExternaLibradorByCifGetP,
  IEmpresaExternaRiesgoGetP,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
  IEmpresaExternaRiesgoVivoGet,
  IEmpresaExternaRiesgoVivoGetP,
  IEmpresaExternaValidarCifPost,
  IEmpresaExternaValidarCifPostP,
  ILibradosByOperacionesGetG,
  ILibradosByOperacionesGetGP,
} from '@shared/interfaces/api/IEmpresaExterna';
import { IEmpresaExternaIdRiesgoLibradoresGetG } from '@shared/interfaces/api/IEmpresaExterna/IEmpresaExternaIdRiesgosLibradores';
import {
  IEmpresaExternaIdRiesgoLibradosGetG,
  IEmpresaExternaIdRiesgoLibradosGetGP,
} from '@shared/interfaces/api/IEmpresaExterna/IEmpresaExternaIdRiesgosLibrados';
import {
  IEmpresaExternaResumenKycById,
  IEmpresaExternaResumenKycByIdP,
} from '@shared/interfaces/api/IEmpresaExterna/IEmpresaExternaResumenKycById';
import { IEmpresaExternaRiesgoGetG } from '@shared/interfaces/api/IEmpresaExterna/IEmpresaExternaRiesgoGet';
import { initialQueryState } from '@shared/utils/constants';
import notifications from '@shared/utils/notifications';
import { IQueryReducer } from '@shared/utils/queryReducer';
// eslint-disable-next-line import/no-cycle
import { queryFixer } from '@shared/utils/utils';

import { empresaExterna } from './endpoints';
import { useCancelToken } from './useCancelToken';
import { useFetch } from './useFetch';

const useEmpresaExterna = () => {
  const {
    get: getEmpresaExterna,
    post: postEmpresaExterna,
    put: putEmpresaExterna,
    remove: deleteEmpresaExterna,
    loading,
  } = useFetch(empresaExterna);
  const { newCancelToken } = useCancelToken();
  const empresaExternaIdGet = useCallback(
    async (id: string): Promise<IEmpresaExternaById> => {
      const query = `/${id}`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaById>(query);
      } catch (e) {
        notifications.unknownError(e);
      }

      return res || ({} as IEmpresaExternaById);
    },
    [getEmpresaExterna]
  );

  const empresaExternaDocumentacionRequeridaEmpresaByIdGet = useCallback(
    async (
      id: string,
      debouncedSearchTerm?: string
    ): IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetGP => {
      const query = `/documentacion-requerida/empresa/by-id/${id}${
        debouncedSearchTerm &&
        `?tipoDocumentoDescripcion=${debouncedSearchTerm}`
      }`;
      let res;
      try {
        res =
          await getEmpresaExterna<IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (e) {
        notifications.unknownError(e);
      }
      return (
        res || ({} as IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetGP)
      );
    },
    [getEmpresaExterna, newCancelToken]
  );

  const empresaExternaRiesgoVivoGet = useCallback(
    async (
      libradoId: string,
      empresaInternaId?: string
    ): IEmpresaExternaRiesgoVivoGetP => {
      const query = `/riesgos?EmpresaExternaId=${libradoId}&EmpresaInternaIds=${
        empresaInternaId || process.env.REACT_APP_FNW_ID
      }`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaRiesgoVivoGet>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaRiesgoVivoGetP);
    },
    [getEmpresaExterna, newCancelToken]
  );

  const getResumenKYCById = useCallback(
    async (empresaId: string): IEmpresaExternaResumenKycByIdP => {
      const query = `/resumen-kyc/by-id/${empresaId}`;

      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaResumenKycById>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaResumenKycById);
    },
    [getEmpresaExterna, newCancelToken]
  );

  const empresaExternaDocumentacionSinRequerirEmpresaById = useCallback(
    async (
      libradorId: string,
      dbouncedSearchTermDocSinReq?: string
    ): IEmpresaExternaDocumentacionSinRequerirEmpresaByIdP => {
      const query = `/documentacion-sin-requerir/empresa/by-id/${libradorId}${
        dbouncedSearchTermDocSinReq &&
        `?tipoDocumentoDescripcion=${dbouncedSearchTermDocSinReq}`
      }`;
      let res;
      try {
        res = await getEmpresaExterna<
          IEmpresaExternaDocumentacionSinRequerirEmpresaById[]
        >(query, {
          cancelToken: newCancelToken(),
        });
      } catch (e) {
        notifications.unknownError(e);
      }
      return (
        res ||
        ([] as unknown as IEmpresaExternaDocumentacionSinRequerirEmpresaByIdP)
      );
    },
    [getEmpresaExterna, newCancelToken]
  );

  const empresaExternaKycByIdGet = useCallback(
    async (id: string): IEmpresaExternaKycByIdGetP => {
      const query = `/kyc/by-id/${id}`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaKycByIdGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaKycByIdGet);
    },
    [getEmpresaExterna]
  );

  const empresaExternaCuentaClienteById = useCallback(
    async (
      id: string,
      queryState: IQueryReducer
    ): IEmpresaExternaCuentaClienteByIdGetGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`cuenta-cliente/by-id/${id}`, queryState);
        let res;
        try {
          res = await getEmpresaExterna<IEmpresaExternaCuentaClienteByIdGetG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
        } catch (err) {
          notifications.unknownError(err);
        }
        return res || ({} as IEmpresaExternaCuentaClienteByIdGetGP);
      }
      return {} as IEmpresaExternaCuentaClienteByIdGetGP;
    },
    [getEmpresaExterna, newCancelToken]
  );

  const getEmpresaExternaLibradorByCif = useCallback(
    async (cif: string): IEmpresaExternaLibradorByCifGetP => {
      const query = `/librador/by-cif/${cif}`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaLibradorByCifGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaLibradorByCifGet);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaLibradorByRazonSocial = useCallback(
    async (debouncedSearchTerm: string): IEmpresaExternaLibradorByCifGetP => {
      const query = `/libradores/by-filters?RazonSocial=${debouncedSearchTerm}`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaLibradorByCifGet>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaLibradorByCifGet);
    },
    [getEmpresaExterna]
  );

  const postEmpresaExternaValidarCif = useCallback(
    async (cif: string): IEmpresaExternaValidarCifPostP => {
      const query = `/validar-cif/${cif}`;
      let res;
      try {
        res = await postEmpresaExterna<IEmpresaExternaValidarCifPost>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaValidarCifPostP);
    },
    [postEmpresaExterna]
  );

  const documentacionRequeridaPendienteByIdGet = useCallback(
    async (
      id: string
    ): IEmpresaExternaDocumentacionRequeridaPendienteByIdGP => {
      let res;
      const query = `/documentacion-requerida/pendiente/by-id/${id}`;
      try {
        res =
          await getEmpresaExterna<IEmpresaExternaDocumentacionRequeridaPendienteByIdG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (e) {
        notifications.unknownError(e);
      }
      return (
        res || ({} as IEmpresaExternaDocumentacionRequeridaPendienteByIdGP)
      );
    },
    [getEmpresaExterna, newCancelToken]
  );

  const postEmpresaExternaFormasContacto = useCallback(
    async (
      id: string,
      formaDeContacto: []
    ): IEmpresaExternaFormasDeContactoByIdP => {
      const query = `/formas-contacto`;
      let res;
      try {
        res = await postEmpresaExterna<IEmpresaExternaFormasDeContactoById>(
          query,
          {
            id,
            formasDeContacto: formaDeContacto,
          }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaFormasDeContactoByIdP);
    },
    [postEmpresaExterna]
  );

  const putEmpresaExternaFormasContacto = useCallback(
    async (
      id: string,
      formaDeContacto: []
    ): IEmpresaExternaFormasDeContactoByIdP => {
      const query = `/formas-contacto`;
      let res;
      try {
        res = await putEmpresaExterna<IEmpresaExternaFormasDeContactoById>(
          query,
          {
            id,
            formasDeContacto: formaDeContacto,
          }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaFormasDeContactoByIdP);
    },
    [putEmpresaExterna]
  );

  const modificarUsuarioMaestroValidadoPut = useCallback(
    async (id: string, validado: boolean) => {
      const query = '/usuario-maestro-validado';
      let res;
      try {
        res = await putEmpresaExterna(query, {
          id,
          validado,
          cancelToken: newCancelToken(),
        });
        res &&
          notifications.success({
            body: `Empresa ${validado ? 'validada' : 'invalidada'}`,
          });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [newCancelToken, putEmpresaExterna]
  );

  const empresaExternaContactoByIdGet = useCallback(
    async (
      queryState: IQueryReducer,
      id: string
    ): IEmpresaExternaFormasDeContactoByIdGP => {
      if (!isEmpty(queryState)) {
        const query = queryFixer(`formas-de-contacto/by-id/${id}`, queryState);
        let res;
        try {
          res = await getEmpresaExterna<IEmpresaExternaFormasDeContactoByIdG>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
        } catch (e) {
          notifications.unknownError(e);
        }
        return res || ({} as IEmpresaExternaFormasDeContactoByIdGP);
      }
      return {} as IEmpresaExternaFormasDeContactoByIdGP;
    },
    [getEmpresaExterna, newCancelToken]
  );

  const eliminarFormaContactoDelete = useCallback(
    async (empresaId: string, contactoId: string) => {
      let res;
      const query = `/${empresaId}/forma-de-contacto-id/${contactoId}`;
      try {
        res = await deleteEmpresaExterna(query);
        if (res) {
          notifications.success({ body: 'Contacto eliminado con éxito' });
        } else {
          notifications.warning({ body: 'Error al eliminar el contacto' });
        }
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [deleteEmpresaExterna]
  );

  const eliminarDireccionEmpresa = useCallback(
    async (empresaId: string, direccionId: string) => {
      let res;
      const query = `/${empresaId}/direccion-id/${direccionId}`;
      try {
        res = await deleteEmpresaExterna(query);
        if (res) {
          notifications.success({ body: 'Dirección eliminada con éxito' });
        } else {
          notifications.warning({ body: 'Error al eliminar la dirección' });
        }
      } catch (e) {
        notifications.unknownError(e);
      }
    },
    [deleteEmpresaExterna]
  );

  const empresaExternaRazonSocialPut = useCallback(
    async (empresaId: string, razonSocial: string) => {
      const query = `/razon-social`;
      let res;
      try {
        res = await putEmpresaExterna<IEmpresaExternaFormasDeContactoById>(
          query,
          {
            id: empresaId,
            razonSocial,
          }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaFormasDeContactoByIdP);
    },
    [putEmpresaExterna]
  );

  const empresaExternaCifPut = useCallback(
    async (empresaId: string, cif: string) => {
      const query = `/cif`;
      let res;
      try {
        res = await putEmpresaExterna<IEmpresaExternaFormasDeContactoById>(
          query,
          {
            id: empresaId,
            cif,
          }
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaFormasDeContactoByIdP);
    },
    [putEmpresaExterna]
  );

  const empresaExternaInternalPut = useCallback(
    async (parsedData: any) => {
      const query = `/internal`;
      let res;
      try {
        res = await putEmpresaExterna<IEmpresaExternaFormasDeContactoById>(
          query,
          parsedData
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaFormasDeContactoByIdP);
    },
    [putEmpresaExterna]
  );

  const empresaExternaValidarDatosSocialesPut = useCallback(
    async (id: string, validados: boolean) => {
      const query = `/validar-datos-sociales`;
      let res;
      try {
        res = await putEmpresaExterna(query, { id, validados });

        if (res) {
          notifications.success({
            body: 'Datos sociales de la empresa validados con éxito',
          });
        }
      } catch (err) {
        notifications.unknownError(err);
      }

      return !!res;
    },
    [putEmpresaExterna]
  );

  const libradosByOperacionIdGet = useCallback(
    async (id: string): ILibradosByOperacionesGetGP => {
      const query = `/librados/by-operacion-id/${id}`;
      let res;
      try {
        res = await getEmpresaExterna<ILibradosByOperacionesGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }

      return res || ({} as ILibradosByOperacionesGetG);
    },
    [getEmpresaExterna]
  );

  const riesgoVivoByEmpresaInternaIdByEmpresaExternaIdGet = useCallback(
    async (
      externaId: string,
      internaId: string
    ): IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP => {
      const query = `/riesgos?EmpresaExternaId=${externaId}&EmpresaInternaIds=${internaId}`;
      let res;
      try {
        res =
          await getEmpresaExterna<IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (err) {
        notifications.unknownError(err);
      }

      return (
        res ||
        ({} as IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId)
      );
    },
    [getEmpresaExterna, newCancelToken]
  );
  const grupoRiesgoVivoByEmpresaInternaIdByEmpresaExternaIdGet = useCallback(
    async (
      grupoId: string,
      internaId: string
    ): IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP => {
      const query = `/grupo/riesgos?GrupoId=${grupoId}&EmpresaInternaIds=${internaId}`;
      let res;
      try {
        res =
          await getEmpresaExterna<IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId>(
            query,
            {
              cancelToken: newCancelToken(),
            }
          );
      } catch (err) {
        notifications.unknownError(err);
      }

      return (
        res ||
        ({} as IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId)
      );
    },
    [getEmpresaExterna, newCancelToken]
  );

  const getEmpresaExternaIdRiesgosLibradores = useCallback(
    async (
      empresaExternaId: string,
      queryState: IQueryReducer,
      empresaInternaIds?: string[]
    ): IEmpresaExternaIdRiesgoLibradoresGetGP => {
      let query = queryFixer(
        `${empresaExternaId}/riesgos/libradores`,
        queryState
      );
      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&empresaInternaIds=${id}`;
        });
      }
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaIdRiesgoLibradoresGetG>(
          query
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEmpresaExternaIdRiesgoLibradoresGetGP);
    },
    [getEmpresaExterna]
  );
  const getEmpresaExternaIdRiesgosLibradoresNoFinanciados = useCallback(
    async (
      empresaExternaId: string,
      queryState: IQueryReducer,
      empresaInternaIds?: string[]
    ): IEmpresaExternaIdRiesgoLibradoresGetGP => {
      let query = queryFixer(
        `${empresaExternaId}/riesgos/no-financiados/libradores`,
        queryState
      );
      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&empresaInternaIds=${id}`;
        });
      }
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaIdRiesgoLibradoresGetG>(
          query
        );
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEmpresaExternaIdRiesgoLibradoresGetG);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaIdRiesgosLibrados = useCallback(
    async (
      empresaExternaId: string,
      queryState: IQueryReducer,
      empresaInternaIds?: string[]
    ): IEmpresaExternaIdRiesgoLibradosGetGP => {
      let query = queryFixer(
        `${empresaExternaId}/riesgos/librados`,
        queryState
      );

      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&empresaInternaIds=${id}`;
        });
      }

      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaIdRiesgoLibradosGetG>(
          query
        );
      } catch (err) {
        notifications.unknownError(err);
      }

      return res || ({} as IEmpresaExternaIdRiesgoLibradosGetGP);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaIdRiesgosLibradosNoFinanciados = useCallback(
    async (
      empresaExternaId: string,
      queryState: IQueryReducer,
      empresaInternaIds?: string[]
    ): IEmpresaExternaIdRiesgoLibradosGetGP => {
      let query = queryFixer(
        `${empresaExternaId}/riesgos/no-financiados/librados`,
        queryState
      );

      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&empresaInternaIds=${id}`;
        });
      }

      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaIdRiesgoLibradosGetG>(
          query
        );
      } catch (err) {
        notifications.unknownError(err);
      }

      return res || ({} as IEmpresaExternaIdRiesgoLibradosGetG);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaRiesgos = useCallback(
    async (
      empresaExternaId: string,
      empresaInternaIds?: string[]
    ): IEmpresaExternaRiesgoGetP => {
      let query = `/riesgos?EmpresaExternaId=${empresaExternaId}`;

      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&EmpresaInternaIds=${id}`;
        });
      }

      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaRiesgoGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }

      return res || ({} as IEmpresaExternaRiesgoGetG);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaRiesgosNoFinanciados = useCallback(
    async (
      empresaExternaId: string,
      empresaInternaIds?: string[]
    ): IEmpresaExternaRiesgoGetP => {
      let query = `/riesgos/no-financiados?EmpresaExternaId=${empresaExternaId}`;

      if (empresaInternaIds && empresaInternaIds.length > 0) {
        empresaInternaIds.forEach((id) => {
          query += `&EmpresaInternaIds=${id}`;
        });
      }

      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaRiesgoGetG>(query);
      } catch (err) {
        notifications.unknownError(err);
      }

      return res || ({} as IEmpresaExternaRiesgoGetG);
    },
    [getEmpresaExterna]
  );

  const empresaExternaPost = useCallback(
    async (body: { cif: string; razonSocial: string }) => {
      let res;
      try {
        res = await postEmpresaExterna<IEmpresaExternaValidarCifPost>('', body);
      } catch (e) {
        notifications.unknownError(e);
      }
      return !!res;
    },
    [postEmpresaExterna]
  );

  const empresaExternaCuentaClienteGet = useCallback(
    async (
      empresaInternaId: string,
      id: string
    ): IEmpresaExternaCuentaClienteGetP => {
      const query = `/cuenta-cliente?EmpresaInternaId=${empresaInternaId}&Id=${id}`;
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaCuentaClienteGet>(query);
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEmpresaExternaCuentaClienteGet);
    },
    [getEmpresaExterna]
  );

  const empresaExternaCuentaClientePut = useCallback(
    async (
      id: string,
      empresaInternaId: string,
      porcentajeRetencion: number
    ) => {
      const query = `/cuenta-cliente`;
      let res;
      try {
        res = await putEmpresaExterna(query, {
          id,
          empresaInternaId,
          porcentajeRetencion,
        });
        res &&
          notifications.success({
            body: 'Porcentaje de la retención modificado correctamente.',
          });
      } catch (err) {
        notifications.unknownError(err);
      }

      return !!res;
    },
    [putEmpresaExterna]
  );

  const getEmpresaExternaAvalistasByDirectLendingId = useCallback(
    async (
      id: string,
      qS = initialQueryState
    ): IEmpresaExternaAvalistasByDirectLendingIdGetGP => {
      const query = queryFixer(`avalistas/by-direct-lending-id/${id}`, qS);
      let res;
      try {
        res =
          await getEmpresaExterna<IEmpresaExternaAvalistasByDirectLendingIdGetG>(
            query
          );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaAvalistasByDirectLendingIdGetG);
    },
    [getEmpresaExterna]
  );
  const getEmpresaExternaByRazonSocial = useCallback(
    async (
      razonSocial: string,
      qS = initialQueryState
    ): IEmpresaExternaByRazonSocialIdGetGP => {
      const query = queryFixer(`by-razon-social/${razonSocial}`, qS);
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaByRazonSocialIdGetG>(
          query
        );
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaByRazonSocialIdGetG);
    },
    [getEmpresaExterna]
  );

  const getEmpresaExternaActiva =
    useCallback(async (): IEmpresaExternaActivaP => {
      const query = '/activa';
      let res;
      try {
        res = await getEmpresaExterna<IEmpresaExternaActiva>(query);
      } catch (e) {
        notifications.unknownError(e);
      }
      return res || ({} as IEmpresaExternaActivaP);
    }, [getEmpresaExterna]);

  return {
    empresaExternaIdGet,
    empresaExternaRiesgoVivoGet,
    empresaExternaDocumentacionRequeridaEmpresaByIdGet,
    empresaExternaDocumentacionSinRequerirEmpresaById,
    empresaExternaKycByIdGet,
    empresaExternaCuentaClienteById,
    getEmpresaExternaLibradorByCif,
    getEmpresaExternaLibradorByRazonSocial,
    postEmpresaExternaValidarCif,
    documentacionRequeridaPendienteByIdGet,
    postEmpresaExternaFormasContacto,
    putEmpresaExternaFormasContacto,
    modificarUsuarioMaestroValidadoPut,
    empresaExternaContactoByIdGet,
    eliminarFormaContactoDelete,
    eliminarDireccionEmpresa,
    empresaExternaRazonSocialPut,
    empresaExternaCifPut,
    empresaExternaInternalPut,
    empresaExternaValidarDatosSocialesPut,
    libradosByOperacionIdGet,
    riesgoVivoByEmpresaInternaIdByEmpresaExternaIdGet,
    grupoRiesgoVivoByEmpresaInternaIdByEmpresaExternaIdGet,
    getEmpresaExternaIdRiesgosLibradores,
    getEmpresaExternaIdRiesgosLibrados,
    getEmpresaExternaRiesgos,
    empresaExternaPost,
    empresaExternaCuentaClienteGet,
    getResumenKYCById,
    getEmpresaExternaIdRiesgosLibradoresNoFinanciados,
    getEmpresaExternaIdRiesgosLibradosNoFinanciados,
    getEmpresaExternaRiesgosNoFinanciados,
    empresaExternaCuentaClientePut,
    getEmpresaExternaAvalistasByDirectLendingId,
    getEmpresaExternaByRazonSocial,
    getEmpresaExternaActiva,
    loading,
  };
};

export default useEmpresaExterna;
