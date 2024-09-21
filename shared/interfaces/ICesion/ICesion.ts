import { ILibradoLibrador } from '../IPrecio';
import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface ICesion {
  id: string;
  descripcion: string;
  documentosDeCesionAmount: number;
  empresaInternaCodigo: string;
  empresaInternaId: string;
  esConClausula24: boolean;
  esSinComunicar: boolean;
  esSinRecurso: boolean;
  estado: {
    description: string;
    id: number;
  };
  estadoFirma: {
    description: string;
    id: number;
  };
  fechaDeFirma: string | Date;
  importe: number;
  importePendienteDeEjecutar: number;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  porcentajeComision: number;
  porcentajeInteres: number;
  porcentajeRetencion: number;
  fechaFinalizacionContrato?: string | Date;
  fechaFinalizacion?: string | Date;
  fechaFirmaAnteNotario?: string | Date;
  fechaFirmaDigital?: string | Date;
  fechaUltimoEstado?: string | Date;
  fechaInicioContrato?: string | Date;
  fechaInicio?: string | Date;
  numero?: string;
  plazoFinalizacionId?: number;
  tipo: {
    description: string;
    id: number;
  };
  customTipo?: number;
  firmaNotarialId: string;
  validada: boolean;
  hasFirma?: boolean;
  producto: IEnum;
}

export type ICesionGenericResponse = IGenericResponse<ICesion>;
