import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEmpresaExternaByRazonSocialIdGet {
  id: string;
  cif: string;
  cnaeDescripcion: string;
  cnaeId: number;
  direcciones: Direccione[];
  fechaConstitucion: Date;
  formasContacto: FormasContacto[];
  industriaId: number;
  paisId: number;
  paisNombre: string;
  razonSocial: string;
  tieneDirecciones: boolean;
  tieneRepresentantes: boolean;
  tipoSociedad: IEnum;
  trazaId: string;
  aceptaComunicacionesAutomaticasComoLibrado: boolean;
  aceptaComunicacionesAutomaticasComoLibrador: boolean;
  aceptaTomasDeRazon: boolean;
  datosSocialesValidados: boolean;
  documentosPendientesAmount: number;
  esPublica: boolean;
  gestor: Gestor;
  riesgo: IEnum;
  tieneKycCompleto: boolean;
  tieneTelefonoYCorreo: boolean;
  urlFicha: string;
  validada: boolean;
}

export interface Direccione {
  id: number;
  calle: string;
  codigoPostal: string;
  descripcion: string;
  paisId: number;
  paisNombre: string;
  poblacionId: number;
  poblacionNombre: string;
  provinciaId: number;
  provinciaNombre: string;
  tipoDireccion: IEnum;
}

export interface FormasContacto {
  id: string;
  descripcion: string;
  etiquetas: IEnum[];
  origen: number;
  tipo: number;
  valor: string;
}

export interface Gestor {
  id: string;
  identityId: string;
  nombre: string;
  departamento: string;
  email: string;
  telefonoMovil: string;
}

type IEmpresaExternaByRazonSocialIdGetG =
  IGenericResponse<IEmpresaExternaByRazonSocialIdGet>;
type IEmpresaExternaByRazonSocialIdGetGP =
  Promise<IEmpresaExternaByRazonSocialIdGetG>;

export type {
  IEmpresaExternaByRazonSocialIdGet,
  IEmpresaExternaByRazonSocialIdGetG,
  IEmpresaExternaByRazonSocialIdGetGP,
};
