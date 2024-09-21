import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface INotarioGet {
  id: string;
  apellidos: string;
  nombre: string;
}

type INotarioGetG = IGenericResponse<INotarioGet>;

type INotarioGetGP = Promise<INotarioGetG>;

export type { INotarioGet, INotarioGetG, INotarioGetGP };
