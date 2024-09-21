import { IEnum } from '@shared/interfaces/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IDocumentoDeFinanciacionByFirmaFiltersGet {
  id: string;
  creationTime: string | Date;
  lastModificationTime: string | Date;
  estadoFirma: IEnum;
  estadoRevision: IEnum;
  fechaFirma: string | Date;
  libradorCif: string;
  libradorId: string;
  libradorRazonSocial: string;
  tipo: IEnum;
}

type IDocumentoDeFinanciacionByFirmaFiltersGetG =
  IGenericResponse<IDocumentoDeFinanciacionByFirmaFiltersGet>;

type IDocumentoDeFinanciacionByFirmaFiltersGetGP =
  Promise<IDocumentoDeFinanciacionByFirmaFiltersGetG>;

export type {
  IDocumentoDeFinanciacionByFirmaFiltersGet,
  IDocumentoDeFinanciacionByFirmaFiltersGetG,
  IDocumentoDeFinanciacionByFirmaFiltersGetGP,
};
