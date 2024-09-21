import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';

import { IDocumento } from '../IDocumento';

export interface IDocumentoDeEfecto extends IDocumento {
  efectoFechaVencimiento?: string;
  efectoId?: string;
  efectoImporteNominal?: number;
  efectoLibradoCif?: string;
  efectoLibradoRazonSocial?: string;
  efectoNumero?: string;
  efectoTipoDocumentoId?: number;
  efectoTipoDocumentoNombre?: string;
}

export type IDocumentoEfectoGenericResponse =
  IGenericResponse<IDocumentoDeEfecto>;
