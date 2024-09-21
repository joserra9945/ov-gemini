import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IPoblacion {
  id: number;
  nombre: string;
  provincia: IEnum;
}

export type IPoblacionGenericResponse = IGenericResponse<IPoblacion>;
