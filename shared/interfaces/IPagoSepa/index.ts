import { IGenericResponse } from '../IGenericResponse/IGenericResponse';

export interface IPagoSepaByIdGet {
  id: string;
  nombre: string;
  xml: string;
}

export interface IPagoSepaPost {
  cuentaOrigenId: string;
  pagoIds: string[];
}

export interface IPagoSepaGet {
  id: string;
  nombre: string;
}

type IPagoSepaByIdGetG = IGenericResponse<IPagoSepaByIdGet>;

type IPagoSepaByIdGetGP = Promise<IPagoSepaByIdGetG>;
type IPagoSepaByIdGetP = Promise<IPagoSepaByIdGet>;

export type { IPagoSepaByIdGetG, IPagoSepaByIdGetGP, IPagoSepaByIdGetP };
