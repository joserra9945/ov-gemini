import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

export interface IDocumentacionRequeridaOp {
  id: string;
  detalle?: string;
  documentoId?: string;
  documentoRechazadoId?: string;
  fechaRequerimiento?: string | Date;
  motivoRechazo: string;
  operacionNumero?: string | number;
  pendiente: boolean;
  representanteId?: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  efectoId?: string;
}

export type IDocumentacionRequeridaOpGenericResponse =
  IGenericResponse<IDocumentacionRequeridaOp>;
