import { IGenericResponse } from '@shared/interfaces';

export interface IEmpresaExternaPendientesValidarDatosSocialesGet {
  id: string;
  cif: string;
  direccion: IDireccionPendientesValidarDatosSociales;
  razonSocial: string;
}

export interface IDireccionPendientesValidarDatosSociales {
  calle: string;
  codigoPostal: string;
  pais: string;
  poblacion: string;
  provincia: string;
}

type IEmpresaExternaPendientesValidarDatosSocialesGetG =
  IGenericResponse<IEmpresaExternaPendientesValidarDatosSocialesGet>;

export type { IEmpresaExternaPendientesValidarDatosSocialesGetG };
