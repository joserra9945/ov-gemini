import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEfectoByIngresoIdExternoGet {
  id: string;
  fechaVencimiento: string;
  importeCobrado: number;
  importeNominal: number;
  importePendienteCobro: number;
  librado: Librado;
  librador: Librado;
  numero: string;
  operacion: Operacion;
  tipo: IEnum;
}
export interface Librado {
  id: string;
  cif: string;
  razonSocial: string;
}

export interface Operacion {
  id: string;
  numero: number;
}

type IEfectoByIngresoIdExternoGetG =
  IGenericResponse<IEfectoByIngresoIdExternoGet>;

type IEfectoByIngresoIdExternoGetGP = Promise<IEfectoByIngresoIdExternoGetG>;

export type {
  IEfectoByIngresoIdExternoGet,
  IEfectoByIngresoIdExternoGetG,
  IEfectoByIngresoIdExternoGetGP,
};
