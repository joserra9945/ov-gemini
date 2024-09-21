import { IEnum } from '../IEnum';
import { IFormasContacto } from '../IFormasContacto';
import { IGenericResponse } from '../IGenericResponse';

export interface IPersona {
  id: string;
  lastModificationTime?: Date | string;
  apellidos: string;
  departamento: string;
  empresaId: string;
  esPuestoPublico: boolean;
  esRepresentante: boolean;
  esUsuario: boolean;
  formasDeContacto: IFormasContacto[];
  nombre: string;
  origen: number;
  puesto: string;
  representanteCargo: string;
  representanteEstado?: number;
  representanteEstadoNombre?: string;
  representanteDescripcionEstadoDni?: string;
  representanteDescripcionEstadoCargo?: string;
  representanteEstadoDni?: IEnum;
  representanteEstadoCargo?: IEnum;
  representante?: IRepresentanteByPersona;
}
interface IRepresentanteByPersona {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  cargo: IEnum;
  descripcionEstadoCargo: string;
  descripcionEstadoDni: string;
  estadoDni: IEnum;
  esPuestoPublico: boolean;
  estadoCargo: IEnum;
  fechaNacimiento: Date | string;
  numeroDni: string;
  paisNacionalidadId: number;
  paisResidenciaId: number;
}

type IPersonaResponse = IGenericResponse<IPersona>;

type IPersonaByEmpresaIdG = IGenericResponse<IPersona>;

type IPersonaByEmpresaIdGP = Promise<IPersonaByEmpresaIdG>;

export type { IPersonaByEmpresaIdG, IPersonaByEmpresaIdGP, IPersonaResponse };
