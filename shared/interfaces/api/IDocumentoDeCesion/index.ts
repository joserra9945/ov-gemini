import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import {
  IDocumentoDeCesionUltimoNoRechazadoGet,
  IDocumentoDeCesionUltimoNoRechazadoGetP,
} from './IDocumentoDeCesionUltimoNoRechazado';

interface IDocumentoDeCesionByCesionIdGet {
  cesionId: string;
  estadoFirma: IEnum;
  fechaFirma: string | Date;
  esFicticio: boolean;
  esRecorte: boolean;
  estadoRevisionDescripcion: string;
  estadoRevisionId: string;
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
  lastModificationTime: string | Date;
  creacionTime: string | Date;
  id: string;
}

type IDocumentoDeCesionByCesionIdGetG =
  IGenericResponse<IDocumentoDeCesionByCesionIdGet>;

type IDocumentoDeCesionByCesionIdGetGP =
  Promise<IDocumentoDeCesionByCesionIdGetG>;

interface IDocumentoDeCesionByFirmaFiltersGet {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  estadoFirma: IEnum;
  estadoRevision: IEnum;
  fechaFirma: string | Date;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  tipo: IEnum;
  libradoCif: string;
  libradoId: string;
  libradoRazonSocial: string;
}

type IDocumentoDeCesionByFirmaFiltersGetG =
  IGenericResponse<IDocumentoDeCesionByFirmaFiltersGet>;

type IDocumentoDeCesionByFirmaFiltersGetGP =
  Promise<IDocumentoDeCesionByFirmaFiltersGetG>;

export type {
  IDocumentoDeCesionByCesionIdGet,
  IDocumentoDeCesionByCesionIdGetG,
  IDocumentoDeCesionByCesionIdGetGP,
  IDocumentoDeCesionByFirmaFiltersGet,
  IDocumentoDeCesionByFirmaFiltersGetG,
  IDocumentoDeCesionByFirmaFiltersGetGP,
  IDocumentoDeCesionUltimoNoRechazadoGet,
  IDocumentoDeCesionUltimoNoRechazadoGetP,
};
