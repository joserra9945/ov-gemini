import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

interface IDirectLendingByFiltersGet {
  id: string;
  concepto: IEnum;
  descripcionEstado: string;
  estado: IEnum;
  fechaDeFin: string;
  fechaValor: string;
  importeInicial: number;
  importeNominal: number;
  librador: ILibradoLibrador;
  numero: number;
  plazoEnMeses: number;
  producto: IEnum;
  tipoAval: IEnum;
}
type IDirectLendingByFiltersGetG = IGenericResponse<IDirectLendingByFiltersGet>;
type IDirectLendingByFiltersGetGP = Promise<IDirectLendingByFiltersGetG>;

export type {
  IDirectLendingByFiltersGet,
  IDirectLendingByFiltersGetG,
  IDirectLendingByFiltersGetGP,
};
