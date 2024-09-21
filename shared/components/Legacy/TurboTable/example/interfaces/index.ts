import { Type } from 'typescript';

export interface IGenericResponse<I = Type> {
  currentPage?: number;
  items: Array<I>;
  totalCount?: number;
}

export interface IGenericTableItemResponse {
  creationTime?: string;
  importe?: number;
  estado?: number;
  estadoNombre?: string;
}

export interface IEstudioRiesgos {
  estado: number;
  estadoNombre: string;
  id: string;
  importeNominal: number;
  importeNominalAprobado: number;
  lastModificationTime: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  operacionId?: string | null;
  productoId: number;
  productoNombre: string;
  estadoFinanciacion: number;
  estadoFinanciacionNombre: string;
  empresaInternaCodigo: string;
  empresaInternaId: string;
  empresaInternaRazonSocial: string;
  fechaAsignacion: string | null;
  fechaCierre: string | null;
  fechaEstadoFinanciacion: string | null;
  libradorScoring: string;
  libradoScoring: string;
  usuarioInterno: any;
  creationTime: string;
}

export type IEstudioRiesgosGenericResponse = IGenericResponse<IEstudioRiesgos>;

export interface IOption {
  label: string;
  value: string | number;
  query?: string;
  color?: string;
  unchecked?: boolean;
}
