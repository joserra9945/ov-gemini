import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import { IAlertasUltimaByIdExternoGet } from './IAlertasPrasUltimaByIdExternoGet';

interface IAlertasPrasByFiltersGet {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  acciones: {
    id: string;
    detalle: string;
    orden: number;
    realizada: boolean;
  };
  clase: IEnum;
  codigo: string;
  detalle: string;
  estado: IEnum;
  orden: number;
  revisada: boolean;
  tipo: IEnum;
  valor: string;
  valoracion: string;
}

export interface IAlertaPrasRevisarPutData {
  codigos: string[];
  idExterno: string;
  userIdentityId: string;
}

export interface IAlertaPrasRealizadaPutData {
  id: string;
  accionPrasId: string;
  realizada: boolean;
}

type IAlertasPrasByFiltersGetG = IGenericResponse<IAlertasPrasByFiltersGet>;

type IAlertasPrasByFiltersGetGP = Promise<IAlertasPrasByFiltersGetG>;

export type {
  IAlertasPrasByFiltersGet,
  IAlertasPrasByFiltersGetG,
  IAlertasPrasByFiltersGetGP,
  IAlertasUltimaByIdExternoGet,
};
