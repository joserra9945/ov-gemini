import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IDocumentoDeFinanciacionByFinanciacionIdGet {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string;
  hasFichero: boolean;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  empresaInternaCodigo: string;
  financiacionId: string;
  financiacionNumero: string;
}
type IDocumentoDeFinanciacionByFinanciacionIdGetG =
  IGenericResponse<IDocumentoDeFinanciacionByFinanciacionIdGet>;
type IDocumentoDeFinanciacionByFinanciacionIdGetGP =
  Promise<IDocumentoDeFinanciacionByFinanciacionIdGetG>;
export type {
  IDocumentoDeFinanciacionByFinanciacionIdGet,
  IDocumentoDeFinanciacionByFinanciacionIdGetG,
  IDocumentoDeFinanciacionByFinanciacionIdGetGP,
};
