import { ICuentaDestino } from '@shared/interfaces/ICuenta/ICuentaDestino';
import { ICuentaOrigen } from '@shared/interfaces/ICuenta/ICuentaOrigen';
import { IEnum } from '@shared/interfaces/IEnum/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';
import { IPagoSepaGet } from '@shared/interfaces/IPagoSepa';
import { IUsuario } from '@shared/interfaces/IUsuario/IUsuario';

interface IDevolucionByEstudioByFiltersGet {
  id: string;
  cuentaDestino: ICuentaDestino;
  cuentaOrigen: ICuentaOrigen;
  empresaInterna: {
    id: string;
    codigo: string;
  };
  estado: IEnum;
  fechaUltimoEstado: Date;
  formaPago: IEnum;
  importe: number;
  libradorId: string;
  libradorRazonSocial: string;
  pagoSepa: IPagoSepaGet;
  usuarioRiesgos: IUsuario;
  usuarioTesoreria: IUsuario;
}

type IDevolucionByEstudioByFiltersGetG =
  IGenericResponse<IDevolucionByEstudioByFiltersGet>;

type IDevolucionByEstudioByFiltersGetGP =
  Promise<IDevolucionByEstudioByFiltersGetG>;

export type {
  IDevolucionByEstudioByFiltersGet,
  IDevolucionByEstudioByFiltersGetG,
  IDevolucionByEstudioByFiltersGetGP,
};
