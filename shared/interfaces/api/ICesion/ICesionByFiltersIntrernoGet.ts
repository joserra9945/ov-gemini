import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

export interface ICesionByFiltersInternoGet {
  id: string;
  descripcion: string;
  empresaInterna: EmpresaInterna;
  estado: IEnum;
  estadoFirma: IEnum;
  fechaFirmaAnteNotario: Date;
  fechaFirmaDigital: Date;
  fechaUltimoEstado: Date;
  importe: number;
  importePendienteDeEjecutar: number;
  librado: Librador;
  librador: Librador;
  producto: IEnum;
  tipo: IEnum;
  estadoFinanciacion: IEnum;
}

export interface EmpresaInterna {
  id: string;
  codigo: IEnum;
}

export interface Librador {
  id: string;
  cif: string;
  razonSocial: string;
}

export type ICesionByFiltersInternoGetG =
  IGenericResponse<ICesionByFiltersInternoGet>;
export type ICesionByFiltersInternoGetGP = Promise<ICesionByFiltersInternoGetG>;
