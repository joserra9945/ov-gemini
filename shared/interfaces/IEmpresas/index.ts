import { IDireccionesEmpresa } from '../IDireccionesEmpresa';
import { IFormasContacto } from '../IFormasContacto';
import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IEmpresaLite {
  cif: string;
  id: string;
  razonSocial: string;
  scoring: string;
}

export interface IEmpresas {
  accionesRequeridasAmount: number;
  cif: string;
  cnaeId: number;
  cnaeDescripcion: string;
  comercialId?: string;
  comercialNombre?: string;
  direccion?: IDireccionesEmpresa;
  direcciones: IDireccionesEmpresa[];
  documentosPendientesAmount: number;
  fechaConstitucion: Date;
  formaJuridicaId: number;
  formaJuridicaNombre: string;
  formasContacto: IFormasContacto[];
  gestor: IGestor;
  gestorId?: string;
  gestorNombre?: string;
  id: string;
  industriaId: number;
  kycSubido: boolean;
  lastModificationTime: string;
  paisId: number;
  paisNombre: string;
  razonSocial: string;
  razonsocial?: string;
  scoring: string;
  tieneDirecciones: boolean;
  tieneKycCompleto: boolean;
  tieneRepresentantes: boolean;
  tipoSociedad: IEnum;
  aceptaTomasDeRazon?: boolean;
  esPublica?: boolean;
  plataforma?: IEnum;
  aceptaComunicacionesAutomaticasComoLibrador?: boolean;
  aceptaComunicacionesAutomaticasComoLibrado?: boolean;
  trazaId: string;
  validada?: boolean;
  urlFicha?: string;
  librado?: string;
}

interface IGestor {
  departamento: string;
  email: string;
  id: string;
  identityID: string;
  nombre: string;
  telefonoMovil: string;
  nombreCompleto: string;
}
export interface IEmpresaSearch {
  cif: string;
  razonSocial: string;
}
export interface IEmpresaExterna extends IEmpresas {
  cuentaBancariaValidada?: boolean;
  importe?: number;
  efectosPendientesNumero?: number;
  efectosPendientesImporte?: number;
  operacionesPendientesNumero?: number;
  operacionesPendientesImporte?: number;
  operacionesValidadasNumero?: number;
  operacionesValidadasImporte?: number;
  operacionesInvalidadasNumero?: number;
  operacionesInvalidadasImporte?: number;
  operacionesPagadasNumero?: number;
  operacionesPagadasImporte?: number;
  usuarioMaestroEstado?: number;
  usuarioMaestroNombre?: string;
  usuarioMaestroApellidos?: string;
  usuarioMaestroEmail?: string;
  usuarioMaestroTelefono?: string;
  validada?: boolean;
  gestorId?: string;
  plataforma?: IEnum;
  gestorNombre?: string;
  cif: string;
  razonSocial: string;
  id: string;
  provinciaNombre?: string;
  provinciaId?: number;
}

export interface IEmpresaValidada {
  fechaValidacion: string;
  usuarioInternoId: string;
  usuarioInternoNombreCompleto: string;
  validados: boolean;
}
export interface IEmpresaRiesgoVivo {
  directoVivo: number;
  directoImpagado: number;
  directoVencido: number;
  directoVencidoNoCobrado: number;
  directoPropuesto: number;
  indirectoVivo: number;
  indirectoImpagado: number;
  indirectoVencido: number;
  razonSocial?: string;
}

export type IEmpresasGenericResponse = IGenericResponse<IEmpresas>;
