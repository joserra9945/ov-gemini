import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IDireccionesEmpresa {
  id?: string;
  lastModificationTime?: Date | string;
  calle?: string;
  codigoPostal?: string;
  descripcion?: string;
  notificacionesActivas?: boolean;
  pais?: string;
  paisId?: number;
  paisNombre?: string;
  poblacionId?: number;
  poblacion?: string;
  poblacionNombre?: string;
  provinciaId?: number;
  provincia?: string;
  provinciaNombre?: string;
  tipoDireccion?: IEnum;
}

export type IDireccionesEmpresaGenericResponse =
  IGenericResponse<IDireccionesEmpresa>;
