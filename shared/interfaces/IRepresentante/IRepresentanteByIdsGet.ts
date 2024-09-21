import { IEnum } from '../IEnum';
import { IGenericResponse } from '../IGenericResponse';

type IRepresentanteByIdsGet = {
  id: string;
  cargo: IEnum;
  estadoCargo: IEnum;
  estadoDni: IEnum;
  nombreCompleto: string;
  numeroDni: string;
};

type IRepresentanteByIdsGetG = IGenericResponse<IRepresentanteByIdsGet>;
type IRepresentanteByIdsGetGP = Promise<IRepresentanteByIdsGetG>;

export type {
  IRepresentanteByIdsGet,
  IRepresentanteByIdsGetG,
  IRepresentanteByIdsGetGP,
};
