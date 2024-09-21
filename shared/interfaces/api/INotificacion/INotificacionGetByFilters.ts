import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface INotificacionGetByFilters {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  category: string;
  creationUserId: string;
  eventTime: string;
  message: string;
  product: string;
  read: boolean;
  subtype: string;
  type: string;
}

export interface INotificationMessage {
  Title: string;
  Value: string;
  Date: string;
}

type INotificacionGetByFiltersG = IGenericResponse<INotificacionGetByFilters>;

type INotificacionGetByFiltersGP = Promise<INotificacionGetByFiltersG>;

export type {
  INotificacionGetByFilters,
  INotificacionGetByFiltersG,
  INotificacionGetByFiltersGP,
};
