import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface ITomaDeRazonByEfectoEstudioIdGet {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  hasFichero: boolean;
  pdfFicheroId: string;
  tipoDodcumentoId: number;
  tipoDocumentoNombre: string;
  efectoFechaEmision: string | Date;
  efectoFechaVencimiento: string | Date;
  efectoHasFichero: boolean;
  efectoId: string;
  efectoImporteNominal: number;
  efectoNumero: string;
  efectoPdfFicheroId: string;
  efectoTipoDocumentoId: number;
  efectoTipoDocumentoNombre: string;
  estado: number;
  estadoNombre: string;
  numeroOriginal: number;
}

interface ITomaDeRazonByIdGet {
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
  libradorRazonSocial: string;
  pdfFicheroId: string;
  tieneSolicitudCambioImagen: boolean;
  tipoDocumentoId: number;
  tieneDocumentoNombre: string;
  trazaId: string;
  usuarioValidadorId: string;
  usuarioValidadorNombre: string;
  efectoFechaVencimiento: string | Date;
  efectoId: string;
  efectoImporteNominal: number;
  efectoLibradoCif: string;
  efectoLibradoRazonSocial: string;
  efectoNumero: string;
  efectoTipoDocumentoId: number;
}

type ITomaDeRazonByIdGetP = Promise<ITomaDeRazonByIdGet>;

type ITomaDeRazonByEfectoEstudioIdGetG =
  IGenericResponse<ITomaDeRazonByEfectoEstudioIdGet>;

type ITomaDeRazonByEfectoEstudioIdGetGP =
  Promise<ITomaDeRazonByEfectoEstudioIdGetG>;

export type {
  ITomaDeRazonByEfectoEstudioIdGet,
  ITomaDeRazonByEfectoEstudioIdGetG,
  ITomaDeRazonByEfectoEstudioIdGetGP,
  ITomaDeRazonByIdGet,
  ITomaDeRazonByIdGetP,
};
