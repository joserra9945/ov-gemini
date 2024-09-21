import { IEnum } from '@shared/interfaces/Legacy/IEnum';

export interface IDocumentoDeComunicado {
  creationTime?: string;
  esFicticio?: boolean;
  esRecorte?: boolean;
  estadoRevisionDescripcion?: string;
  estadoRevisionId?: number;
  estadoRevisionNombre?: string;
  fechaVencimiento?: string | Date;
  hasFichero?: boolean;
  id?: string;
  incluyeCartaDeAceptacion?: boolean;
  lastModificationTime?: string;
  libradorCif?: string;
  libradorId?: string;
  libradorRazonSocial?: string;
  motivoDocumentoRechazado?: string;
  numero?: string;
  origen?: number;
  pdfFicheroId?: string;
  tieneSolicitudCambioImagen?: boolean;
  tipoDocumentoId?: number;
  tipoDocumentoNombre?: string;
  trazaId?: string;
  usuarioValidadorId?: string;
  usuarioValidadorNombre?: string;
  comunicadoId?: string;
  tipoDocumento?: IEnum;
}
