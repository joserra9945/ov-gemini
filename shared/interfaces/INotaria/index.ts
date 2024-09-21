import { IDireccionesEmpresa } from '../Legacy/IDireccionesEmpresa';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface INotaria {
  id: string;
  lastModificationTime: Date;
  apellidos: string;
  direccion: IDireccionesEmpresa;
  email: string;
  esCabeceraDeProvincia: boolean;
  nombre: string;
  personaContacto: string;
  telefono: string;
}

export interface INotariaForForm {
  id: string;
  nombre?: string;
  apellidos?: string;
  description?: string;
}

export type INotariaGenericResponse = IGenericResponse<INotaria>;

export interface INotarioForm {
  notario: INotaria | null;
  editing?: boolean;
  onNextStep: () => void;
  onBack: () => void;
}
