import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';

interface IDocumentoDeEfectoByEfectoIdByTipoGet {
  id: string;
  tipoDocumentoId: number;
  tipoDocumentoNombre: string;
}

interface IDocumentoDeEfectoDatosBasicosByEfectoIdGet {
  id: string;
  creationTime: Date;
  estadoRevision: IEnum;
  fechaVencimiento: Date;
  libradoRazonSocial: string;
  tipo: IEnum;
  usuarioValidadorNombre: string;
}

interface IDocumentoDeEfectoVistaClienteByEfectoIdGet {
  id: string;
  descripcionEstadoRevision: string;
  esFicticio: boolean;
  estadoRevision: IEnum;
  tipoDocumento: IEnum;
}

type IDocumentoDeEfectoDatosBasicosByEfectoIdGetG =
  IGenericResponse<IDocumentoDeEfectoDatosBasicosByEfectoIdGet>;

type IDocumentoDeEfectoDatosBasicosByEfectoIdGetGP =
  Promise<IDocumentoDeEfectoDatosBasicosByEfectoIdGetG>;

type IDocumentoDeEfectoVistaClienteByEfectoIdGetG =
  IGenericResponse<IDocumentoDeEfectoVistaClienteByEfectoIdGet>;

type IDocumentoDeEfectoVistaClienteByEfectoIdGetGP =
  Promise<IDocumentoDeEfectoVistaClienteByEfectoIdGetG>;

type IDocumentoDeEfectoByEfectoIdByTipoGetP =
  Promise<IDocumentoDeEfectoByEfectoIdByTipoGet>;

type IDocumentoDeEfectoByEfectoIdByTipoGetG =
  IGenericResponse<IDocumentoDeEfectoByEfectoIdByTipoGet>;

export type {
  IDocumentoDeEfectoByEfectoIdByTipoGet,
  IDocumentoDeEfectoByEfectoIdByTipoGetG,
  IDocumentoDeEfectoByEfectoIdByTipoGetP,
  IDocumentoDeEfectoDatosBasicosByEfectoIdGet,
  IDocumentoDeEfectoDatosBasicosByEfectoIdGetG,
  IDocumentoDeEfectoDatosBasicosByEfectoIdGetGP,
  IDocumentoDeEfectoVistaClienteByEfectoIdGet,
  IDocumentoDeEfectoVistaClienteByEfectoIdGetG,
  IDocumentoDeEfectoVistaClienteByEfectoIdGetGP,
};
