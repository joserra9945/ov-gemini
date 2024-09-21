import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEfectoDocumentacionRequeridaPendienteByLibradorIdGet {
  id: string;
  detalle: string;
  documentoRechazadoId: string;
  documentoSubido: IEnumDoc;
  efecto: IEfectoDoc;
  estadoValoracion: IEnum;
  operacionNumero: number;
  pendiente: boolean;
  tieneAnotacionesValoracion: boolean;
  tipoDocumento: IEnum;
}

export interface IEnumDoc {
  id: string;
  creationTime: string;
  estadoRevision: IEnum;
}

export interface IEfectoDoc {
  id: string;
  numero: string;
  tipo: string;
}

type IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG =
  IGenericResponse<IEfectoDocumentacionRequeridaPendienteByLibradorIdGet>;
type IEfectoDocumentacionRequeridaPendienteByLibradorIdGetGP =
  Promise<IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG>;

export type {
  IEfectoDocumentacionRequeridaPendienteByLibradorIdGet,
  IEfectoDocumentacionRequeridaPendienteByLibradorIdGetG,
  IEfectoDocumentacionRequeridaPendienteByLibradorIdGetGP,
};
