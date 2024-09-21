import { IEnum } from 'interfaces/IEnum';

export interface IDocumentoAceptacion {
  id?: string;
  creationTime?: string;
  lastModificationTime?: string;
  comunicadoId?: string;
  tipoDocumentoId?: number;
  tipoDocumentoNombre?: string;
  tipoDocumento?: IEnum;
}
