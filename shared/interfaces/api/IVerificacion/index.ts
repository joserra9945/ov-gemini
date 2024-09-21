import { ILibradoLibrador } from '@shared/interfaces/IPrecio';

import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import { IDocumentoDeComunicado } from 'interfaces/IDocumento/IDocumentoDeComunicado/IDocumentoDeComunicado';

import { IEfecto } from '../IEfecto';

import {
  IVerificacionEnviarPost,
  IVerificacionResponderPost,
} from './IVerificacionEnviarPost';

interface IVerificacionByEstudioIdGet {
  id: string;
  lastModificationTime?: string;
  creationTime: string;
  emailsDestinatarios: string[];
  documentos: IDocumentoDeComunicado[];
  efectos: IEfecto[];
  estadoNombre?: string;
  fechaEnvio?: string;
  fechaRecepcion?: string;
  isValid: boolean;
  libradoCif?: string;
  libradoId: string;
  libradoRazonSocial?: string;
  libradorCif?: string;
  libradorId: string;
  libradorRazonSocial?: string;
  operacionId: string;
  operacionNumero: number;
  referencia: number;
  tipoDeEnvio?: { description: string; id: number };
  validationErrors: IVerificacionRechazada[];
  incluyeCartaDeAceptacion: boolean;
  motivosDeError?: string;
  estadoVerificacionEfectos?: IEnum;
  librado: ILibradoLibrador;
  librador: ILibradoLibrador;
}

interface IVerificacionRechazada {
  efectoId: string;
  efectoNumero?: string;
  motivosRechazo: string[];
}

type IVerificacionByEstudioIdGetP = Promise<IVerificacionByEstudioIdGet>;

type IVerificacionByEstudioIdGetG =
  IGenericResponse<IVerificacionByEstudioIdGet>;

type IVerificacionByEstudioIdGetGP = Promise<IVerificacionByEstudioIdGetG>;

export type {
  IVerificacionByEstudioIdGet,
  IVerificacionByEstudioIdGetG,
  IVerificacionByEstudioIdGetGP,
  IVerificacionByEstudioIdGetP,
  IVerificacionEnviarPost,
  IVerificacionResponderPost,
};
