import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IMotivosEstadoDeFinaciacionGet {
  id: number;
  categoria: string;
  descripcion: string;
  tipo: IEnum;
}

type IMotivosEstadoDeFinaciacionGetG =
  IGenericResponse<IMotivosEstadoDeFinaciacionGet>;

type IMotivosEstadoDeFinaciacionGetGP =
  Promise<IMotivosEstadoDeFinaciacionGetG>;

export type {
  IMotivosEstadoDeFinaciacionGet,
  IMotivosEstadoDeFinaciacionGetG,
  IMotivosEstadoDeFinaciacionGetGP,
};
