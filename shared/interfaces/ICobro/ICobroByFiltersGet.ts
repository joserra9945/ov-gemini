import { IEnum } from '../IEnum';
import { IGenericResponse } from '../IGenericResponse';

interface ICobroByFiltersGet {
  id: string;
  concepto: IEnum;
  descripcion: string;
  fechaRecepcion: string;
  efecto: Efecto;
  importe: number;
  ingreso: Ingreso | null;
  recibido: boolean;
  usuarioInternoNombreDeUsuario: string;
}
interface Efecto {
  id: string;
  fechaVencimiento: string;
  importeCobrado: number;
  importeNominal: number;
  importePendienteCobro: number;
  libradoRazonSocial: string;
  libradorRazonSocial: string;
  numero: string;
}
interface Ingreso {
  id: string;
  concepto: string;
  fecha: string;
  importe: number;
}

type ICobroByFiltersGetG = IGenericResponse<ICobroByFiltersGet>;
type ICobroByFiltersGetGP = Promise<ICobroByFiltersGetG>;

export type { ICobroByFiltersGet, ICobroByFiltersGetG, ICobroByFiltersGetGP };
