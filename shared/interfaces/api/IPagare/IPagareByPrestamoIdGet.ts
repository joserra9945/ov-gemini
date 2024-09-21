import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IPagareByPrestamoIdGet {
  confirmado: boolean;
  id: string;
  estadoRevision: IEnum;
  fechaEmision: string;
  fechaVencimiento: string;
  iban: string;
  importeNominal: number;
  lugarEmision: string;
  numero: string;
}

type IPagareByPrestamoIdGetG = IGenericResponse<IPagareByPrestamoIdGet>;
type IPagareByPrestamoIdGetGP = Promise<IPagareByPrestamoIdGetG>;

export type {
  IPagareByPrestamoIdGet,
  IPagareByPrestamoIdGetG,
  IPagareByPrestamoIdGetGP,
};
