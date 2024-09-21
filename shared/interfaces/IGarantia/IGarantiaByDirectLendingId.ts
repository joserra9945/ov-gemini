import { IEnum } from '../IEnum';
import { IGenericResponse } from '../IGenericResponse';

type IGarantiaByDirectLendingIdGet = {
  id: string;
  creationTime: Date;
  cesion: IGarantiaByDirectLendingIdCesion;
  directLendingId: string;
};

type IGarantiaByDirectLendingIdCesion = {
  id: string;
  estado: IEnum;
  estadoFinanciacion: IEnum;
  estadoFirma: IEnum;
  librado: IGarantiaByDirectLendingIdLibrado;
  tipo: IEnum;
};

type IGarantiaByDirectLendingIdLibrado = {
  id: string;
  razonSocial: string;
};
type IGarantiaByDirectLendingIdGetG =
  IGenericResponse<IGarantiaByDirectLendingIdGet>;
type IGarantiaByDirectLendingIdGetGP = Promise<IGarantiaByDirectLendingIdGetG>;

export type {
  IGarantiaByDirectLendingIdGet,
  IGarantiaByDirectLendingIdGetG,
  IGarantiaByDirectLendingIdGetGP,
};
