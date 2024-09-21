import { IGenericResponse } from '@shared/interfaces/IGenericResponse';

interface INotarioByProvinciaIdGet {
  id: string;
  apellidos: string;
  direccion: Direccion;
  email: string;
  esCabeceraDeProvincia: boolean;
  nombre: string;
  personaContacto: string;
  telefono: string;
}
interface Direccion {
  calle: string;
  poblacion: Poblacion;
}

interface Poblacion {
  id: number;
  nombre: string;
  provincia: Provincia;
}

interface Provincia {
  id: number;
  nombre: string;
}

type INotarioByProvinciaIdGetG = IGenericResponse<INotarioByProvinciaIdGet>;

type INotarioByProvinciaIdGetGP = Promise<INotarioByProvinciaIdGetG>;

export type {
  INotarioByProvinciaIdGet,
  INotarioByProvinciaIdGetG,
  INotarioByProvinciaIdGetGP,
};
