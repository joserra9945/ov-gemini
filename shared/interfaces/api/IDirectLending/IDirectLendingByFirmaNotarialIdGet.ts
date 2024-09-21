import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

type IDirectLendingByFirmaNotarialIdGet = {
  id: string;
  creationTime: string;
  concepto: IEnum;
  descripcionEstado: string;
  estado: IEnum;
  fechaDeFin: string;
  importeInicial: number;
  importeNominal: number;
  numero: number;
  plazoEnMeses: number;
  tipoAval: IEnum;
};

type IDirectLendingByFirmaNotarialIdGetG =
  IGenericResponse<IDirectLendingByFirmaNotarialIdGet>;
type IDirectLendingByFirmaNotarialIdGetGP =
  Promise<IDirectLendingByFirmaNotarialIdGetG>;

export type {
  IDirectLendingByFirmaNotarialIdGet,
  IDirectLendingByFirmaNotarialIdGetG,
  IDirectLendingByFirmaNotarialIdGetGP,
};
