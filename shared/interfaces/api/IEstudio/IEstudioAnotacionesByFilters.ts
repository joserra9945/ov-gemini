import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface IEstudioAnotacionesByFiltersGet {
  id: string;
  anclada: boolean;
  creationTime: string;
  estudioId: string;
  estudioNumero: string;
  libradorRazonSocial: string;
  texto: string;
  usuarioInternoId: string;
  usuarioInternoNombre: string;
}

type IEstudioAnotacionesByFiltersGetG =
  IGenericResponse<IEstudioAnotacionesByFiltersGet>;
type IEstudioAnotacionesByFiltersGetGP =
  Promise<IEstudioAnotacionesByFiltersGetG>;

export type {
  IEstudioAnotacionesByFiltersGet,
  IEstudioAnotacionesByFiltersGetG,
  IEstudioAnotacionesByFiltersGetGP,
};
