import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { ILibradoLibrador } from '@shared/interfaces/Legacy/ILibradoLibrador';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IDevolucionDePagaresGetByFilters {
  id: string;
  creationTime: string | Date;
  descripcionEstadoRevision: string;
  estado: IEnum;
  estadoRevision: IEnum;
  librador: ILibradoLibrador;
}

type IDevolucionDePagaresGetByFiltersG =
  IGenericResponse<IDevolucionDePagaresGetByFilters>;

type IDevolucionDePagaresGetByFiltersGP =
  Promise<IDevolucionDePagaresGetByFiltersG>;

export type {
  IDevolucionDePagaresGetByFilters,
  IDevolucionDePagaresGetByFiltersG,
  IDevolucionDePagaresGetByFiltersGP,
};
