import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface INotificacionesConfigurationByFilterGet {
  active: boolean;
  category: string;
  id: string;
  product: string;
  subtype: string;
  type: string;
  userId: string;
}

type INotificacionesConfigurationByFilterGetG =
  IGenericResponse<INotificacionesConfigurationByFilterGet>;

type INotificacionesConfigurationByFilterGetGP =
  Promise<INotificacionesConfigurationByFilterGetG>;

export type {
  INotificacionesConfigurationByFilterGet,
  INotificacionesConfigurationByFilterGetG,
  INotificacionesConfigurationByFilterGetGP,
};
