import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IDocumentacionRequerida {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  fechaRequerimiento: string;
  motivoRechazo: string;
  pendiente: true;
  tipoDocumentoId: 0;
  tipoDocumentoNombre: string;
  efectoId?: string;
  representanteId: string;
  empresaExternaId: string;
  documentoId?: string;
}

export interface IAccionRequerida {
  id: string;
  creationTime: string;
  cesionId: string;
  cuentaId: string;
  descripcion: string;
  empresaExternaId: string;
  pagareId: string;
  pendiente: true;
  tipo: {
    id: number;
    description: string;
  };
  pendienteValidar?: boolean;
  documentoId?: string;
  efectoId?: string;
}

export type IDocumentacionRequeridaGenericResponse =
  IGenericResponse<IDocumentacionRequerida>;

export type IAccionRequeridaGenericResponse =
  IGenericResponse<IAccionRequerida>;
