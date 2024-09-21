import { IDocumento } from '../IDocumento';

export interface IDocumentoDeFinanciacion extends IDocumento {
  operacionId: string;
  operacionNumero: string;
}
