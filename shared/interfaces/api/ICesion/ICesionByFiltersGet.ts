import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import { ILibradoLibrador } from '../IPrecio';

interface ICesionByFiltersGet {
  id: string;
  estado: IEnum;
  estadoFirma: IEnum;
  firmaNotarialId: string;
  importe: number;
  librado: ILibradoLibrador;
  tipo: IEnum;
}

type ICesionByFiltersGetG = IGenericResponse<ICesionByFiltersGet>;
type ICesionByFiltersGetGP = Promise<ICesionByFiltersGetG>;

export type {
  ICesionByFiltersGet,
  ICesionByFiltersGetG,
  ICesionByFiltersGetGP,
};
