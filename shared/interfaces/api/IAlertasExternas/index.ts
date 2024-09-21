import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IAlertasExternasByFilters {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  codigo: string;
  detalle: string;
  estado: IEnum;
  orden: number;
}

type IIAlertasExternasGetByFiltersG =
  IGenericResponse<IAlertasExternasByFilters>;

type IIAlertasExternasGetByFiltersGP = Promise<IIAlertasExternasGetByFiltersG>;

export type {
  IAlertasExternasByFilters,
  IIAlertasExternasGetByFiltersG,
  IIAlertasExternasGetByFiltersGP,
};
