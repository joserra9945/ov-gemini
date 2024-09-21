import { IEnum } from '../IEnum';

export interface IImpago {
  descripcion: string;
  estado: IEnum;
  fecha: string;
  id: string;
  usuarioInternoId: string;
}

export interface IImpagoPut {
  id: string;
  descripcion: string;
  fecha: string;
}

export interface IImpagoPost {
  descripcion: string;
  efectoId: string;
  fecha: string;
}
