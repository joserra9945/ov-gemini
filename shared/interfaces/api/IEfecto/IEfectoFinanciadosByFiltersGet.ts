import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

interface IEfectoFinanciadosByFiltersGet {
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

type IEfectoFinanciadosByFiltersGetG =
  IGenericResponse<IEfectoFinanciadosByFiltersGet>;

type IEfectoFinanciadosByFiltersGetGP =
  Promise<IEfectoFinanciadosByFiltersGetG>;

export type {
  IEfectoFinanciadosByFiltersGet,
  IEfectoFinanciadosByFiltersGetG,
  IEfectoFinanciadosByFiltersGetGP,
};
