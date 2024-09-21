import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import {
  IAceptacionEnviarPost,
  IAceptacionResponderPost,
} from './IAceptacionResponderPost';

type IDocumentosAceptacion = {
  id: string;
  creationTime?: string | Date;
  lastModificationTime?: string | Date;
  aceptacionId?: string;
  tipoDocumento: IEnum;
};

interface IAceptacionByEstudioIdGet {
  id?: string;
  creationTime?: string | Date;
  emailsDestinatarios: string[];
  estado: IEnum;
  fechaEnvio?: string | Date;
  fechaRecepcion?: string | Date;
  libradoCif?: string;
  libradoId?: string;
  libradoRazonSocial?: string;
  libradorCif?: string;
  libradorId?: string;
  libradorRazonSocial?: string;
  motivosDeError: string;
  referencia?: number;
  tipoDeEnvio: IEnum;
  cesionEstado?: IEnum;
  cesionId?: string;
  cesionNumero?: string;
  documentos: IDocumentosAceptacion[];
  estadoFinanciacion: IEnum;
}

type IAceptacionByEstudioIdGetG = IGenericResponse<IAceptacionByEstudioIdGet>;

type IAceptacionByEstudioIdGetGP = Promise<IAceptacionByEstudioIdGetG>;

type IAceptacionByCesionIdGet = IAceptacionByEstudioIdGet;

type IAceptacionByCesionIdGetP = Promise<IAceptacionByCesionIdGet>;

export type {
  IAceptacionByCesionIdGet,
  IAceptacionByCesionIdGetP,
  IAceptacionByEstudioIdGet,
  IAceptacionByEstudioIdGetG,
  IAceptacionByEstudioIdGetGP,
  IAceptacionEnviarPost,
  IAceptacionResponderPost,
  IDocumentosAceptacion,
};
