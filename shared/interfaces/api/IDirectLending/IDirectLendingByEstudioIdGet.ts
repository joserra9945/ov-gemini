import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IDirectLendingByEstudioIdGet {
  id: string;
  creationTime: string;
  analista: Analista;
  codigoEmpresaInterna: IEnum;
  concepto: IEnum;
  descripcionEstado: string;
  estado: IEnum;
  fechaAsignacionAnalista: string;
  fechaCierre: string;
  fechaDeFin: string;
  fechaValor: string;
  importeInicial: number;
  importeNominal: number;
  numero: number;
  plazoEnMeses: number;
  tipoAval: IEnum;
}
export interface Analista {
  id: string;
  identityId: string;
  nombre: string;
}
type IDirectLendingByEstudioIdGetG =
  IGenericResponse<IDirectLendingByEstudioIdGet>;
type IDirectLendingByEstudioIdGetGP = Promise<IDirectLendingByEstudioIdGetG>;

export type {
  IDirectLendingByEstudioIdGet,
  IDirectLendingByEstudioIdGetG,
  IDirectLendingByEstudioIdGetGP,
};
