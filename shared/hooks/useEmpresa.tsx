import { useCallback } from 'react';

import { IGenericResponse } from '@shared/interfaces';
import { ICargos } from '@shared/interfaces/ICargo/ICargo';
import { IFormasDeContacto } from '@shared/interfaces/IFormasDeContacto/IFormasDeContacto';
import { IPersona } from '@shared/interfaces/IPersona';
import { IRepresentante } from '@shared/modules/NuevoContacto/interfaces';
import {
  ICnaIndustria,
  IDireccionToBe,
  IEmpresaExternaActiva,
  IEmpresaExternaGetG,
  IEmpresaExternaGetGP,
  IPoblacionProvincia,
  IProvincias,
  IResumenKYC,
  ISocios,
} from '@shared/modules/PerfilEmpresa/interfaces';
import { IUseFetch, useFetch } from '@shared/utils';
import notifications from '@shared/utils/notifications';

import { IDireccionesEmpresa } from '@shared/interfaces/Legacy/IDireccionesEmpresa';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { useCancelToken } from './useCancelToken';

const URL_PAISES = '/api/gefintech/Pais/unpaged';
const URL_TIPOS = '/api/gefintech/Enum/tipos-direcciones';
const URL_PROVINCIAS = '/api/gefintech/Provincia';
const URL_INDUSTRIAS = '/api/gefintech/Industria';
const URL_FINALIDADES = '/api/gefintech/Enum/finalidades-kyc';
const URL_ORIGENES = '/api/gefintech/Enum/origenes-kyc';
const URL_POBLACION = '/api/gefintech/Poblacion';
const URL_CNA = 'api/gefintech/Cnae';
const URL_EMPRESA_EXTERNA = '/api/gefintech/EmpresaExterna';
const URL_REPRESENTANTE = 'api/gefintech/Representante';
const URL_PERSONA = 'api/gefintech/Persona';
const URL_CARGOS = '/api/gefintech/Enum/tipos-cargo-representante';
const URL_FORMAS_CONTACTO = 'api/gefintech/Enum/tipos-formas-contacto';
const URL_TIPO_DOCUMENTOS = 'api/gefintech/Enum/tipos-documentos';
const URL_DOCUMENTO_DE_REPRESENTANTE = 'api/gefintech/DocumentoDeRepresentante';

export const useEmpresa = () => {
  const { get: getFormaContacto } = useFetch(URL_FORMAS_CONTACTO);
  const { get: getDocumentoByRepresentante } = useFetch(
    URL_DOCUMENTO_DE_REPRESENTANTE
  );
  const { get: getCargos }: IUseFetch<ICargos[]> = useFetch(URL_CARGOS);
  const { get: getTipos, loading: loadingTipos }: IUseFetch<IEnum[]> =
    useFetch(URL_TIPOS);

  const { get: getPaises, loading: loadingPaises }: IUseFetch<IEnumPaises[]> =
    useFetch(URL_PAISES);

  const {
    get: getProvincias,
    get: getProvinciasPorCp,
    loading: loadingProvincias,
  }: IUseFetch<IGenericResponse<IProvincias>> = useFetch(`${URL_PROVINCIAS}`);
  const { get: getIndustrias }: IUseFetch<IGenericResponse<IEnum>> =
    useFetch(URL_INDUSTRIAS);
  const { get: getFinalidades }: IUseFetch<IEnum[]> = useFetch(URL_FINALIDADES);
  const { get: getOrigenes }: IUseFetch<IEnum[]> = useFetch(URL_ORIGENES);
  const {
    get: getTiposDocumentos,
    loading: loadingTipoDocumentos,
  }: IUseFetch<IEnum[]> = useFetch(URL_TIPO_DOCUMENTOS);
  const {
    get: getPoblacion,
    get: getPoblacionByCp,
  }: IUseFetch<IEnumPaises[] | IEnumPaises> = useFetch(URL_POBLACION);
  const { get: getCna }: IUseFetch<IGenericResponse<ICnaIndustria>> =
    useFetch(URL_CNA);

  const {
    get: getRepresentantesByEmpresa,
    loading: loadingRepresentantes,
    get: getRepresentantesByPersona,
    loading: loadingRepresentanteByPersona,
  }: IUseFetch<any> = useFetch(URL_REPRESENTANTE);

  const { newCancelToken } = useCancelToken();

  const {
    get: getSocios,
    loading: loadingSocios,
    get: getEmpresaInfo,
    loading: loadingEmpresa,
    loading: loadingResumenKYC,
    get: getKycEmpresa,
    loading: loadingKycEmpresa,
    get: getEmpresaExternaActiva,
    get: getFormasContactoById,
    post: postFormasContactoEmpresaExterna,
    put: putFormasContactoEmpresaExterna,
    get: getResumenKYC,
    get: getDireccionesById,
    loading: loadingDireccionesId,
    post: postDirecciones,
    post: postSocio,
    put: putDirecciones,
    put: putKyc,
    put: putSocio,
    remove: deleteDireccion,
    remove: deleteSocio,
  }: IUseFetch = useFetch(URL_EMPRESA_EXTERNA);

  const {
    get: getPersonaByEmpresa,
    loading: loadingPersona,
    remove: deletePersona,
  }: IUseFetch = useFetch(URL_PERSONA);

  const fetchPaises = useCallback(async () => {
    return getPaises<IEnumPaises[]>();
  }, [getPaises]);

  const fetchTipos = useCallback(async () => {
    return getTipos<IEnum[]>();
  }, [getTipos]);

  const fetchProvincias = useCallback(async () => {
    return getProvincias<IGenericResponse<IProvincias>>('?MaxResultCount=100');
  }, [getProvincias]);

  const fetchIndustrias = useCallback(async () => {
    return getIndustrias<IGenericResponse<IEnum>>('?MaxResultCount=100');
  }, [getIndustrias]);

  const fetchFinalidades = useCallback(async () => {
    return getFinalidades<IEnum[]>();
  }, [getFinalidades]);

  const fetchOrigenes = useCallback(async () => {
    return getOrigenes<IEnum[]>();
  }, [getOrigenes]);

  const getProvinciasByCodigoPostalId = useCallback(
    async (codigoPostalId: string) => {
      const res = await getProvinciasPorCp<IProvincias>(
        `/by-codigo-postal-id/${codigoPostalId}`
      );
      return res;
    },
    [getProvinciasPorCp]
  );

  const getPoblacionesByProvinciaId = useCallback(
    async (provinciaId: string) => {
      return getPoblacion<IEnumPaises[]>(
        `/unpaged/by-provincia-id/${provinciaId}`
      );
    },
    [getPoblacion]
  );

  const getPoblacionByCodigoPostal = useCallback(
    async (cPostal: string) => {
      const res = await getPoblacionByCp<IGenericResponse<IPoblacionProvincia>>(
        `/by-codigo-postal-id/${cPostal}`
      );
      if (res?.items) {
        return res.items;
      }
    },
    [getPoblacionByCp]
  );

  const getCnaByIndustria = useCallback(
    async (industriaId: string) => {
      const respuesta = await getCna<IGenericResponse<ICnaIndustria>>(
        `/by-industria-id/${industriaId}?MaxResultCount=100`
      );
      return respuesta;
    },
    [getCna]
  );

  const fetchSocios = useCallback(
    async (libradorId: string) => {
      return getSocios<ISocios[]>(`/socios/by-id/${libradorId}`);
    },
    [getSocios]
  );

  const fetchEmpresaInfoById = useCallback(
    async (empresaId: string): IEmpresaExternaGetGP => {
      let res;
      const query = `/${empresaId}`;
      try {
        res = await getEmpresaInfo<IEmpresaExternaGetG>(query, {
          cancelToken: newCancelToken(),
        });
      } catch (err) {
        notifications.unknownError(err);
      }
      return res || ({} as IEmpresaExternaGetGP);
    },
    [getEmpresaInfo, newCancelToken]
  );

  const fetchResumenKyc = useCallback(
    async (empresaId: string) => {
      return getResumenKYC<IResumenKYC>(`/resumen-kyc/by-id/${empresaId}`);
    },
    [getResumenKYC]
  );

  const obtenerDireccionesById = useCallback(
    async (empresaId: string) => {
      return getDireccionesById<IGenericResponse<IDireccionesEmpresa>>(
        `/${empresaId}/direcciones`
      );
    },
    [getDireccionesById]
  );

  const enviarDireccionesEmpresa = useCallback(
    async (id: string, direcciones: IDireccionToBe[]) => {
      let res;
      try {
        res = await postDirecciones(`/direcciones`, {
          id,
          direcciones,
        });

        if (res) {
          notifications.success({
            title: '¡Éxito!',
            body: 'Se ha creado la dirección correctamente',
          });
        }
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [postDirecciones]
  );

  const editarDireccionesEmpresa = useCallback(
    async (id: string, direcciones: IDireccionToBe[]) => {
      let res;
      try {
        res = await putDirecciones(`/direcciones`, {
          id,
          direcciones,
        });

        if (res) {
          notifications.success({
            title: '¡Éxito!',
            body: 'Se ha editado la dirección correctamente',
          });
        }
      } catch (err) {
        notifications.unknownError(err);
      }
      return res;
    },
    [putDirecciones]
  );

  const editarKyc = async (kyc: any) => {
    return putKyc(`/kyc`, kyc);
  };

  const eliminarDireccionPorId = async (
    idEmpresa: string,
    direccionId: string
  ) => {
    return deleteDireccion(`/${idEmpresa}/direccion-id/${direccionId}`);
  };
  const crearSocio = async (socio: any) => {
    return postSocio('/socio', socio);
  };

  const modificarSocio = async (socio: any) => {
    return putSocio('/socio', socio);
  };
  const eliminarSocio = async (idEmpresa: string, idSocio: string) => {
    return deleteSocio(`/${idEmpresa}/socio-id/${idSocio}`);
  };

  const fetchKycEmpresaActiva = useCallback(async () => {
    return getKycEmpresa<IEmpresaExternaActiva>('/kyc/by-empresa-activa');
  }, [getKycEmpresa]);

  const fetchEmpresaActiva = useCallback(async () => {
    return getEmpresaExternaActiva<IEmpresaExternaActiva>('/activa');
  }, [getEmpresaExternaActiva]);
  const fetchRepresentantesByEmpresa = useCallback(
    async (empresaId: string) => {
      return getRepresentantesByEmpresa<IGenericResponse<IRepresentante>>(
        `/by-empresa-id/${empresaId}`
      );
    },
    [getRepresentantesByEmpresa]
  );

  const fetchPersonasByEmpresa = useCallback(
    async (empresaId: string) => {
      return getPersonaByEmpresa<IGenericResponse<IPersona>>(
        `/by-empresa-id/${empresaId}?MaxResultCount=100`
      );
    },
    [getPersonaByEmpresa]
  );

  const fetchCargos = useCallback(async () => {
    return getCargos<ICargos[]>();
  }, [getCargos]);

  const fetchFormasContacto = useCallback(async () => {
    return getFormaContacto();
  }, [getFormaContacto]);

  const getRepresentanteByPersonaId = useCallback(
    async (personaId: string) => {
      return getRepresentantesByPersona<IRepresentante>(
        `/by-persona-id/${personaId}`
      );
    },
    [getRepresentantesByPersona]
  );

  const fetchTipoDocumentos = useCallback(async () => {
    return getTiposDocumentos();
  }, [getTiposDocumentos]);

  const fetchDocumentosByRepresentante = useCallback(
    async (representanteId: string) => {
      return getDocumentoByRepresentante(
        `/by-representante-id/${representanteId}`
      );
    },
    [getDocumentoByRepresentante]
  );

  const fetchFormasContactoEmpresa = useCallback(
    async (empresaId: string) => {
      return getFormasContactoById(`/formas-de-contacto/by-id/${empresaId}`);
    },
    [getFormasContactoById]
  );

  const postFormasContactoEmpresa = async (
    id: string,
    formasDeContacto: IFormasDeContacto[]
  ) => {
    const body = {
      id,
      formasDeContacto,
    };
    return postFormasContactoEmpresaExterna(`/formas-contacto`, body);
  };

  const modificarFormasContactoEmpresa = async (
    id: string,
    formasDeContacto: IFormasDeContacto[]
  ) => {
    const body = {
      id,
      formasDeContacto,
    };
    return putFormasContactoEmpresaExterna(`/formas-contacto`, body);
  };

  const eliminarPersona = async (personaId: string) => {
    return deletePersona(`/${personaId}`);
  };

  return {
    getProvinciasByCodigoPostal: getProvinciasByCodigoPostalId,
    getPoblacionesByProvinciaId,
    getPoblacionByCodigoPostal,
    getCnaByIndustria,
    fetchSocios,
    fetchResumenKyc,
    enviarDireccionesEmpresa,
    fetchEmpresaInfoById,
    fetchKycEmpresaActiva,
    fetchEmpresaActiva,
    editarDireccionesEmpresa,
    editarKyc,
    eliminarDireccionPorId,
    crearSocio,
    modificarSocio,
    eliminarSocio,
    obtenerDireccionesById,
    fetchIndustrias,
    fetchPaises,
    fetchFinalidades,
    fetchOrigenes,
    fetchTipos,
    fetchProvincias,
    fetchRepresentantesByEmpresa,
    fetchPersonasByEmpresa,
    fetchCargos,
    fetchFormasContacto,
    getRepresentanteByPersonaId,
    loadingPersona,
    loadingRepresentantes,
    loadingEmpresa,
    loadingDireccionesId,
    loadingResumenKYC,
    loadingTipos,
    loadingPaises,
    loadingProvincias,
    loadingSocios,
    loadingRepresentanteByPersona,
    loadingKycEmpresa,
    fetchTipoDocumentos,
    loadingTipoDocumentos,
    fetchDocumentosByRepresentante,
    fetchFormasContactoEmpresa,
    postFormasContactoEmpresa,
    modificarFormasContactoEmpresa,
    eliminarPersona,
  };
};
