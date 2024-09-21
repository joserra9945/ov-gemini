import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

interface IEfectoNoFinanciadosByFiltersGet {
  id: string;
  estadoFinanciacion: IEnum;
  fechaEmision: string;
  fechaVencimiento: string;
  impago: IImpago;
  importeNominal: number;
  importePendienteCobro: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  numero: string;
}

interface IImpago {
  id: string;
  descripcion: string;
  estado: IEnum;
  fecha: string;
}

type IEfectoNoFinanciadosByFiltersGetG =
  IGenericResponse<IEfectoNoFinanciadosByFiltersGet>;

type IEfectoNoFinanciadosByFiltersGetGP =
  Promise<IEfectoNoFinanciadosByFiltersGetG>;

export type {
  IEfectoNoFinanciadosByFiltersGet,
  IEfectoNoFinanciadosByFiltersGetG,
  IEfectoNoFinanciadosByFiltersGetGP,
};
