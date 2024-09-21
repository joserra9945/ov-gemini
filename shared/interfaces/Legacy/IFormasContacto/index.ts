import { IGenericResponse } from '../IReponse/IGenericResponse';

interface IEtiqueta {
  description: string;
  id: number;
}

export interface IFormasContacto {
  id?: string | number;
  lastModificationTime?: Date | string;
  tipo?: number;
  valor?: string;
  aceptaNotificaciones?: boolean;
  detalle?: string;
  descripcion?: string;
  etiquetas?: IEtiqueta[];
  origen?: number;
  isNewValue?: boolean;
}

export type IFormasContactoResponse = IGenericResponse<IFormasContacto>;
