import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

export interface IDocumentoDeEmpresaPagosCertificadosByLibradorIdGet {
  id: string;
  fechaEmision: string;
  tipoDocumentoNombre: string;
}

type IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetG =
  IGenericResponse<IDocumentoDeEmpresaPagosCertificadosByLibradorIdGet>;

type IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetGP =
  Promise<IDocumentoDeEmpresaPagosCertificadosByLibradorIdGet>;

export type {
  IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetG,
  IDocumentoDeEmpresaPagosCertificadosByLibradorIdGetGP,
};
