import { IEnum } from '@shared/interfaces/Legacy/IEnum';

export interface IPersona {
  id: string;
  lastModificationTime?: Date | string;
  apellidos: string;
  departamento?: string;
  empresaId: string;
  esPuestoPublico?: boolean;
  esRepresentante?: boolean;
  esUsuario?: boolean;
  formasDeContacto: IFormasContacto[];
  nombre?: string;
  origen?: number;
  puesto?: string;
  representanteCargo?: string;
  representanteEstado?: number;
  representanteEstadoNombre?: string;
  representanteDescripcionEstadoDni?: string;
  representanteDescripcionEstadoCargo?: string;
  representanteEstadoDni?: IEnum;
  representanteEstadoCargo?: IEnum;
  representante?: IRepresentante;
}

export interface IFormasContacto {
  id?: string;
  lastModificationTime?: Date | string;
  tipo?: number;
  valor?: string;
  aceptaNotificaciones?: boolean;
  detalle?: string;
  descripcion?: string;
  etiquetas?: IEnum[];
  origen?: number;
  isNewValue?: boolean;
}
export interface IRepresentante {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  cargo: IEnum;
  descripcionEstadoCargo: string;
  descripcionEstadoDni: string;
  esPuestoPublico: boolean;
  estadoCargo: IEnum;
  fechaNacimiento: Date | string;
  numeroDni: string;
  paisNacionalidadId: number;
  paisResidenciaId: number;
  persona?: IPersona;
}

export interface IDocumentoRepresentante {
  estadoRevision?: {
    description: string;
    id: number;
  };
  fechaVencimiento: Date;
  representanteId: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  id: string;
}

export interface IFieldsWildCard {
  id: string;
  className: string;
  type?: number;
  config: {
    inputName: string;
    inputLabel: string;
    required: boolean;
    pattern?: {
      value: RegExp | string;
      message: string;
    };
  };
}
