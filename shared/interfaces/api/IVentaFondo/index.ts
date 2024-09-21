import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IVentaAFondoEnum {
  id: string;
  numero: number;
  estado?: IEnum;
}

interface IVentaAFondoByIdGet {
  estado: IEnum;
  fechaCreacion: string;
  fechaEstado: string;
  fondo: string;
  importeNominalTotal: number;
  numero: number;
  id: string;
  numeroEfectos: number;
}

type IVentaAFondoByIdGetG = IGenericResponse<IVentaAFondoByIdGet>;

type IVentaAFondoByIdGetGP = Promise<IVentaAFondoByIdGetG>;

export type { IVentaAFondoByIdGetG, IVentaAFondoByIdGetGP, IVentaAFondoEnum };
