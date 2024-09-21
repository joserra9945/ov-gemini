import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import { IEmpresaExternaByIdGet } from '../IEmpresaExterna';

type ICesionByFirmaNotarialIdGet = {
  id: string;
  estado: IEnum;
  estadoFinanciacion: IEnum;
  estadoFirma: IEnum;
  importe: number;
  librado: IEmpresaExternaByIdGet;
  tipo: IEnum;
};

type ICesionByFirmaNotarialIdGetG =
  IGenericResponse<ICesionByFirmaNotarialIdGet>;
type ICesionByFirmaNotarialIdGetGP = Promise<ICesionByFirmaNotarialIdGetG>;

export type {
  ICesionByFirmaNotarialIdGet,
  ICesionByFirmaNotarialIdGetG,
  ICesionByFirmaNotarialIdGetGP,
};
