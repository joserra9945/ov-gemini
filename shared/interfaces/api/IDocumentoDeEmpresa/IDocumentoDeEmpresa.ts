import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

import { IDocumento } from '../../IDocumento/IDocumento';

export interface IDocumentoDeEmpresa extends IDocumento {
  empresaCif: string;
  empresaId: string;
  empresaRazonSocial: string;
  operacionNumero: string;
}

type IDocumentoDeEmpresaG = IGenericResponse<IDocumentoDeEmpresa>;

type IDocumentoDeEmpresaGP = Promise<IDocumentoDeEmpresaG>;

export type { IDocumentoDeEmpresaG, IDocumentoDeEmpresaGP };
