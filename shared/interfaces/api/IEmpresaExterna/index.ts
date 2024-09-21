import { IEmpresaExterna, IEmpresas } from '@shared/interfaces/IEmpresas';
import { ICnae, ICnaIndustria } from '@shared/modules/PerfilEmpresa/interfaces';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import {
  IEmpresaExternaActiva,
  IEmpresaExternaActivaP,
} from './IEmpresaExternaActiva';
import {
  IEmpresaExternaAvalistasByDirectLendingIdGet,
  IEmpresaExternaAvalistasByDirectLendingIdGetG,
  IEmpresaExternaAvalistasByDirectLendingIdGetGP,
} from './IEmpresaExternaAvalistasByDirectLendingIdGet';
import { IEmpresaExternaById } from './IEmpresaExternaByIdGet';
import {
  IEmpresaExternaByRazonSocialIdGet,
  IEmpresaExternaByRazonSocialIdGetG,
  IEmpresaExternaByRazonSocialIdGetGP,
} from './IEmpresaExternaByRazonSocialIdGet';
import {
  IEmpresaExternaCuentaClienteGet,
  IEmpresaExternaCuentaClienteGetP,
} from './IEmpresaExternaCuentaClienteGet';
import {
  IEmpresaExternaDocumentacionRequeridaPendienteById,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdG,
  IEmpresaExternaDocumentacionRequeridaPendienteByIdGP,
} from './IEmpresaExternaDocumentacionRequeridaPendienteById';
import {
  IEmpresaExternaIdRiesgoLibradoresGet,
  IEmpresaExternaIdRiesgoLibradoresGetG,
  IEmpresaExternaIdRiesgoLibradoresGetGP,
} from './IEmpresaExternaIdRiesgosLibradores';
import {
  IEmpresaExternaIdRiesgoLibradosGet,
  IEmpresaExternaIdRiesgoLibradosGetG,
  IEmpresaExternaIdRiesgoLibradosGetGP,
} from './IEmpresaExternaIdRiesgosLibrados';
import {
  ILibradosByOperacionesGet,
  ILibradosByOperacionesGetG,
  ILibradosByOperacionesGetGP,
} from './IEmpresaExternaLibradosByOperacionIdGet';
import { IEmpresaExternaPendientesValidarDatosSocialesGetG } from './IEmpresaExternaPendientesValidarDatosSociales';
import {
  IEmpresaExternaRiesgoGet,
  IEmpresaExternaRiesgoGetP,
} from './IEmpresaExternaRiesgoGet';
import {
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
} from './IEmpresaExternaRiesgoVivoGet';
import {
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
} from './IEmpresaGrupoRiesgoVivoGet';

interface IEmpresaExternaByIdGet extends IEmpresas, IEmpresaExterna {
  datosSocialesValidados: boolean;
  tieneTelefonoYCorreo: boolean;
}

interface IEmpresaExternaRiesgoVivoGet {
  directoVivo: number;
  directoImpagado: number;
  directoVencido: number;
  indirectoVivo: number;
  indirectoImpagado: number;
  indirectoVencido: number;
}
interface IEmpresaExternaDocumentacionRequeridaEmpresaByIdGet {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  documentoSubido: {
    id: string;
    creationTime: string | Date;
    estadoRevision: IEnum;
    fechaVencimiento: string | Date;
  };
  estadoValoracion: IEnum;
  pendiente: boolean;
  tieneAnotacionesValoracion: boolean;
  tipoDocumento: IEnum;
}

interface IEmpresaExternaKycByIdGet {
  cnae: ICnae;
  descripcionFinalidad: string;
  descripcionOrigen: string;
  empresaId: string;
  fechaConstitucion: string;
  finalidad: IEnum;
  industria: ICnaIndustria;
  origen: IEnum;
  paisesOperantes: IEnumPaises;
}

interface IEmpresaExternaCuentaClienteByIdGet {
  beneficiario: string;
  detalle: string;
  documentoId: string;
  fecha: string;
  importe: number;
  operacion: number;
  orden: number;
  saldo: number;
}

interface IEmpresaExternaDocumentacionSinRequerirEmpresaById {
  tipoDocumento: IEnum;
}

interface IEmpresaExternaLibradorByCifGet {
  id: string;
  cif: string;
  razonSocial: string;
  tipoSociedad: IEnum;
  aceptaComunicacionesAutomaticasComoLibrado: boolean;
  aceptaComunicacionesAutomaticasComoLibrador: boolean;
  aceptaTomasDeRazon: boolean;
  esPublica: boolean;
}

type IEmpresaExternaValidarCifPost = {
  errorMessage: string;
  isValid: boolean;
  nifType: number;
  societyType: number;
};

interface IEmpresaExternaFormasDeContactoById {
  descripcion: string;
  etiquetas: number[];
  tipo: number;
  valor: string;
  id: string;
  origen: number;
}

type IEmpresaExternaValidarCifPostP = Promise<IEmpresaExternaValidarCifPost>;

type IEmpresaExternaDocumentacionSinRequerirEmpresaByIdP = Promise<
  IEmpresaExternaDocumentacionSinRequerirEmpresaById[]
>;

type IEmpresaExternaRiesgoVivoGetP = Promise<IEmpresaExternaRiesgoVivoGet>;

type IEmpresaExternaByIdGetP = Promise<IEmpresaExternaByIdGet>;

type IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetG =
  IGenericResponse<IEmpresaExternaDocumentacionRequeridaEmpresaByIdGet>;

type IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetGP =
  Promise<IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetG>;

type IEmpresaExternaKycByIdGetP = Promise<IEmpresaExternaKycByIdGet>;

type IEmpresaExternaCuentaClienteByIdGetG =
  IGenericResponse<IEmpresaExternaCuentaClienteByIdGet>;

type IEmpresaExternaCuentaClienteByIdGetGP =
  Promise<IEmpresaExternaCuentaClienteByIdGetG>;
type IEmpresaExternaLibradorByCifGetP =
  Promise<IEmpresaExternaLibradorByCifGet>;

type IEmpresaExternaFormasDeContactoByIdG =
  IGenericResponse<IEmpresaExternaFormasDeContactoById>;

type IEmpresaExternaFormasDeContactoByIdP =
  Promise<IEmpresaExternaFormasDeContactoById>;

type IEmpresaExternaFormasDeContactoByIdGP =
  Promise<IEmpresaExternaFormasDeContactoByIdG>;

export type {
  IEmpresaExternaActiva,
  IEmpresaExternaActivaP,
  IEmpresaExternaAvalistasByDirectLendingIdGet,
  IEmpresaExternaAvalistasByDirectLendingIdGetG,
  IEmpresaExternaAvalistasByDirectLendingIdGetGP,
  IEmpresaExternaById,
  IEmpresaExternaByIdGet,
  IEmpresaExternaByIdGetP,
  IEmpresaExternaByRazonSocialIdGet,
  IEmpresaExternaByRazonSocialIdGetG,
  IEmpresaExternaByRazonSocialIdGetGP,
  IEmpresaExternaCuentaClienteByIdGet,
  IEmpresaExternaCuentaClienteByIdGetG,
  IEmpresaExternaCuentaClienteByIdGetGP,
  IEmpresaExternaCuentaClienteGet,
  IEmpresaExternaCuentaClienteGetP,
  IEmpresaExternaDocumentacionRequeridaEmpresaByIdGet,
  IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetG,
  IEmpresaExternaDocumentacionRequeridaEmpresaByIdGetGP,
  IEmpresaExternaDocumentacionRequeridaPendienteById,
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
  IEmpresaExternaIdRiesgoLibradoresGet,
  IEmpresaExternaIdRiesgoLibradoresGetG,
  IEmpresaExternaIdRiesgoLibradoresGetGP,
  IEmpresaExternaIdRiesgoLibradosGet,
  IEmpresaExternaIdRiesgoLibradosGetG,
  IEmpresaExternaIdRiesgoLibradosGetGP,
  IEmpresaExternaKycByIdGet,
  IEmpresaExternaKycByIdGetP,
  IEmpresaExternaLibradorByCifGet,
  IEmpresaExternaLibradorByCifGetP,
  IEmpresaExternaPendientesValidarDatosSocialesGetG,
  IEmpresaExternaRiesgoGet,
  IEmpresaExternaRiesgoGetP,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
  IEmpresaExternaRiesgoVivoGet,
  IEmpresaExternaRiesgoVivoGetP,
  IEmpresaExternaValidarCifPost,
  IEmpresaExternaValidarCifPostP,
  ILibradosByOperacionesGet,
  ILibradosByOperacionesGetG,
  ILibradosByOperacionesGetGP,
};
