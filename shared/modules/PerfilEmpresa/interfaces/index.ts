import { Dispatch, SetStateAction } from 'react';
import { CancelTokenSource } from 'axios';

import { IGenericResponse } from '@shared/interfaces';
import { IEmpresaExternaById } from '@shared/interfaces/api/IEmpresaExterna';
import { IQueryReducer } from '@shared/utils/queryReducer';

import { IOption } from '@shared/components/Legacy/CustomInputs/ElkSearchIndustriaCnae/interfaces';
import { IDireccionesEmpresa } from '@shared/interfaces/Legacy/IDireccionesEmpresa';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

export interface IEmpresa {
  aceptaComunicacionesAutomaticasComoLibrado: boolean;
  aceptaComunicacionesAutomaticasComoLibrador: boolean;
  aceptaTomasDeRazon: boolean;
  cif: string;
  cnaeDescripcion?: string;
  cnaeId?: number;
  datosSocialesValidados: boolean;
  direcciones: IDireccionesEmpresa[];
  documentosPendientesAmount: number;
  esPublica: boolean;
  fechaConstitucion?: string | any;
  formasContacto: IFormasContacto[];
  gestor: IGestor;
  id: string;
  industriaId: number;
  paisId: number;
  paisNombre: string;
  plataforma: IEnum;
  razonSocial: string;
  tieneDirecciones: boolean;
  tieneKycCompleto: boolean;
  tieneRepresentantes: boolean;
  tieneTelefonoYCorreo: boolean;
  tipoSociedad: IEnum;
  trazaId: string;
  urlFicha?: string;
  validada: boolean;
}

export interface IGestor {
  id: string;
  identityId: string;
  nombre: string;
  departamento?: string;
  email?: string;
  telefonoMovil?: string;
}

export interface IResumenKYC {
  actividadCompleta: boolean;
  informacionCompleta: boolean;
  tieneDireccionSocial: boolean;
  tieneFirmantes: boolean;
  tieneSociosRespondido: boolean;
  tieneTelefonoYCorreo: boolean;
}
export type EmpresaInfoProps = {
  libradorId: string;
};

export type AccordionTituloProps = {
  direccion: IDireccionesEmpresa;
  direcciones: IDireccionesEmpresa[];
  numero: number;
  setDireccionesLocal: any;
  isEditOpen: any;
  setIsEditOpen: any;
};

export type DireccionProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  indice?: number;
  editarDireccion?: IDireccionesEmpresa;
  empresaGi?: IEmpresaExternaById;
  comesFromGi?: boolean;
  fetchDirecciones?: (
    source: CancelTokenSource | undefined,
    qState: IQueryReducer
  ) => Promise<void>;
};

export type DireccionesTituloProps = {
  direccion: IDireccionesEmpresa;
  indice: number;
};

export type ParticipacionPersonaProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  indice?: number;
  editarPersona?: ISocios;
};
export type ParticipacionPersonaTituloProps = {
  persona: ISocios;
  indice: number;
};
type IEnumNombre = {
  id: number;
  nombre: string;
};
export interface ISocios {
  id: string;
  esPuestoPublico: true;
  fechaNacimiento: string;
  dni: string;
  nombreCompleto: string;
  paisNacionalidad: IEnumNombre;
  paisResidencia: IEnumNombre;
  porcentajeParticipacion: number;
}

export interface IProvincias {
  id: number;
  nombre: string;
  paisId: number;
  paisNombre: string;
}

export interface IPoblacionProvincia {
  id: number;
  nombre: string;
  provinciaId: number;
  provinciaNombre: string;
}

export interface ICnaIndustria {
  codigo: string;
  descripcion: string;
  id: number;
  industriaDescripcion: string;
  industriaId: number;
}

export interface ICnae {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface IEmpresaExternaActiva {
  cnae: ICnae;
  cnaeSecundario: ICnae;
  empresaId: string;
  fechaConstitucion: string;
  finalidad: IEnum;
  industria: IOption;
  industriaSecundaria: IOption;
  origen: IEnum;
  paisesOperantes: { id: number; nombre: string }[];
  porcentajeDeCobroEnEfectivo: IEnum;
}

export interface IKycForm {
  id: string;
  actividadPrincipal: IOption;
  actividadSecundaria: IOption;
  CNAE: IOption;
  cnaeSecundario: IOption;
  paisesOperantes: IEnumPaises[];
  finalidad: IEnum;
  origen: IEnum;
  descripcionFinalidad?: string;
  descripcionOrigen?: string;
  porcentajeDeCobroEnEfectivo: IEnum;
}

export interface IDireccionToBe {
  calle: string;
  codigoPostal: string;
  empresaId: string;
  notificacionesActivas: boolean;
  poblacionId: string;
  tipoDireccion: string;
  id?: string;
}

export interface IFormaContacto {
  id: string;
  description: string;
  etiquetas: IEnum[];
  origen: number;
  tipo: number;
  valor: string;
}

// export interface Ipersona {
//   id: string;
//   creationTime: string;
//   lastModificationTime: string;
//   apellidos: string;
//   departamento: string;
//   empresaId: string;
//   esRepresentante: true;
//   esUsuario: true;
//   formasDeContacto: IFormaContacto[];
//   nombre: string;
//   origen: 1;
//   puesto: string;
//   representante: IRepresentante;
// }

// export interface IRepresentante {
//   id: string;
//   lastModificationTime: Date | string;
//   cargo: IEnum;
//   cargoNombre: string;
//   dni: IDni;
//   persona: IPersona;
//   porcentajeParticipacion: number;
//   verificado: boolean;
//   descripcionEstadoCargo?: string;
//   descripcionEstadoDni?: string;
//   estadoCargo?: IEnum;
//   estadoDni?: IEnum;
//   numeroDni?: string;
// }

export interface IDni {
  id: string;
  creationTime: Date;
  lastModificationTime: Date | string;
  estadoRevisionDescripcion: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaPrimeraRecepcion: Date;
  fechaVencimiento: Date | string;
  hasFichero: boolean | string;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  motivoDocumentoRechazado: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  apellidos: string;
  nombre: string;
  numero: string;
}

export interface IPersona {
  id: string;
  lastModificationTime?: Date | string;
  apellidos: string;
  departamento: string;
  empresaId: string;
  esPuestoPublico: boolean;
  esRepresentante: boolean;
  esUsuario: boolean;
  formasDeContacto: IFormasContacto[];
  nombre: string;
  origen: number;
  puesto: string;
  representanteCargo: string;
  representanteEstado?: number;
  representanteEstadoNombre?: string;
  representanteDescripcionEstadoDni?: string;
  representanteDescripcionEstadoCargo?: string;
  representanteEstadoDni?: IEnum;
  representanteEstadoCargo?: IEnum;
  representante?: IRepresentanteByPersona;
}

export interface IFormasContacto {
  id?: string;
  lastModificationTime?: Date | string;
  tipo?: number;
  valor?: string;
  aceptaNotificaciones?: boolean;
  detalle?: string;
  descripcion?: string;
  etiquetas?: IEnum[];
  origen?: number;
  isNewValue?: boolean;
}
export interface IRepresentanteByPersona {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  cargo: IEnum;
  descripcionEstadoCargo: string;
  descripcionEstadoDni: string;
  estadoCargo: IEnum;
  estadoDni: IEnum;
  numeroDni: string;
}

type IEmpresaExternaGetG = IGenericResponse<IEmpresa>;

type IEmpresaExternaGetGP = Promise<IEmpresaExternaGetG>;

export type { IEmpresaExternaGetG, IEmpresaExternaGetGP };
