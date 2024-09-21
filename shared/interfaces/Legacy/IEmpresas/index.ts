import { IDireccionesEmpresa } from '../IDireccionesEmpresa';
import { IFormasContacto } from '../IFormasContacto';
import { IGenericResponse } from '../IReponse/IGenericResponse';

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
  formasDeContacto: IFormasContacto[];
  id: string;
  industriaId: number;
  kycSubido: boolean;
  lastModificationTime: string;
  paisId: number;
  paisNombre: string;
  provinciaRegistroMercantilId: number;
  provinciaRegistroMercantilNombre: string;
  razonSocial: string;
  razonsocial?: string;
  scoring: string;
  tieneDirecciones: boolean;
  tieneKycEmpresa: boolean;
  tieneRepresentantes: boolean;
  aceptaTomasDeRazon: boolean;
  trazaId: string;
}

export type IEmpresasGenericResponse = IGenericResponse<IEmpresas>;
