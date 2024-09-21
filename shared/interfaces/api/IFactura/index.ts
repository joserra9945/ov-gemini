import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IFacturaByPagareIdGet {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: number;
  estadoRevisionNombre: string;
  fechaVencimiento: string | Date;
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
  estadoEfectoClienteId: number;
  estadoEfectoClienteNombre: string;
  estadoVerificacion: IEnum;
  estudioId: string;
  estudioNumero: number;
  fechaEmision: string | Date;
  importeNominal: number;
  importePendienteCobro: number;
  instrumento: string;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
  numero: string;
  verificadoPorLibrado: boolean;
  confirmado: boolean;
  documentosPendientesAmount: number;
  estadoFinanciacionFecha: string | Date;
  estadoFinanciacionId: number;
  estadoFinanciacionNombre: string;
  estadoFinanciacionUsuario: string;
  estadoRevisionFecha: string | Date;
  estadoRevisionPrevio: IEnum;
  estadoRevisionUsuario: string;
  fechaExtraccionDeRemesa: string | Date;
  fechaInsercionEnRemesa: string | Date;
  motivoEstadoDeFinanciacionMensaje: string;
  nombreCompletoAnalista: string;
  operacionEstado: IEnum;
  operacionFecha: string | Date;
  operacionId: string;
  operacionNumero: number;
  scoring: string;
  tieneDevolucion: boolean;
  fechaExportadoTaya: string | Date;
  tienePagares: boolean;
}

type IFacturaByPagareIdGetG = IGenericResponse<IFacturaByPagareIdGet>;

type IFacturaByPagareIdGetGP = Promise<IFacturaByPagareIdGetG>;

export type {
  IFacturaByPagareIdGet,
  IFacturaByPagareIdGetG,
  IFacturaByPagareIdGetGP,
};
