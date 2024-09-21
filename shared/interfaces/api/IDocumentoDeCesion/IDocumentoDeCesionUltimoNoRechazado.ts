import { IEnum } from '@shared/interfaces/IEnum';

type IDocumentoDeCesionUltimoNoRechazadoGet = {
  id: string;
  creationTime: Date;
  lastModificationTime: Date;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: Date;
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
  cesionId: string;
  estadoFirma: IEnum;
  fechaFirma: Date;
};

type IDocumentoDeCesionUltimoNoRechazadoGetP =
  Promise<IDocumentoDeCesionUltimoNoRechazadoGet>;

export type {
  IDocumentoDeCesionUltimoNoRechazadoGet,
  IDocumentoDeCesionUltimoNoRechazadoGetP,
};
