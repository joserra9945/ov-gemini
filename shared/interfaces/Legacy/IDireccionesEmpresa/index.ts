import { IEnum } from '../IEnum';

export interface IDireccionesEmpresa {
  id: string;
  lastModificationTime?: Date | string;
  calle: string;
  codigoPostal: string;
  descripcion: string;
  pais: { id: number; nombre: string };
  poblacion: { id: number; nombre: string };
  provincia: { id: number; nombre: string };
  tipo: IEnum;
}
