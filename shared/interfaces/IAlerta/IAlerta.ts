import { IEnum } from 'interfaces/IEnum';

export interface IAccion {
  id: string;
  detalle: string;
  orden: number;
  realizada: boolean;
}

export interface IAlerta {
  id: string;
  creationTime: Date;
  lastModificationTime: Date;
  acciones: IAccion[];
  clase: IEnum;
  detalle: string;
  estado: IEnum;
  libradoCif: string;
  libradorCif: string;
  revisada: true;
  tipo: number;
  valor: string;
  valoracion: string;
  codigo: string;
  orden?: number;
}
