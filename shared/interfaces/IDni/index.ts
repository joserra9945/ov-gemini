import { IFileUploader } from 'interfaces/IFile';

export interface IDni {
  id: string;
  creationTime: Date;
  lastModificationTime: Date | string;
  estadoRevisionDescripcion: string;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaPrimeraRecepcion: Date;
  fechaVencimiento: Date | string;
  hasFichero: boolean | string;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  motivoDocumentoRechazado: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
  trazaId: string;
  apellidos: string;
  nombre: string;
  numero: string;
}

export interface IDniWithFile extends IDni {
  files?: IFileUploader[];
}
