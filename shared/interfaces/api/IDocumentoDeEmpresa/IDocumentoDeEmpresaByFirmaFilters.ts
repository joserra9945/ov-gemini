import { IEnum } from '@shared/interfaces/IEnum';

export interface IDocumentoDeEmpresaByFirmaFilters {
  id: string;
  creationTime: Date;
  lastModificationTime: Date;
  estadoFirma: IEnum;
  estadoRevision: IEnum;
  fechaFirma: Date;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  tipo: IEnum;
}
