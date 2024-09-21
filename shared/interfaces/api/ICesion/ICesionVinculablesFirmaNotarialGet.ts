import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';
import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

type ICesionVinculablesFirmaNotarialGet = {
  id: string;
  estado: IEnum;
  estadoFinanciacion: IEnum;
  estadoFirma: IEnum;
  importe: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
};
type ICesionVinculablesFirmaNotarialGetG =
  IGenericResponse<ICesionVinculablesFirmaNotarialGet>;
type ICesionVinculablesFirmaNotarialGetGP =
  Promise<ICesionVinculablesFirmaNotarialGetG>;

export type {
  ICesionVinculablesFirmaNotarialGet,
  ICesionVinculablesFirmaNotarialGetG,
  ICesionVinculablesFirmaNotarialGetGP,
};
