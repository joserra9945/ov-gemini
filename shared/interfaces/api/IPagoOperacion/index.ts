import { ICuentaDestino } from '@shared/interfaces/ICuenta/ICuentaDestino';
import { ICuentaOrigen } from '@shared/interfaces/ICuenta/ICuentaOrigen';
import { IEnum, IEnumPaises } from '@shared/interfaces/IEnum/IEnum';
import { IGenericResponse } from '@shared/interfaces/IGenericResponse/IGenericResponse';
import { IUsuario } from '@shared/interfaces/IUsuario/IUsuario';

interface IPagoOperacionByEstudioIdGet {
  id: string;
  cuentaDestino: ICuentaDestino;
  cuentaOrigen: ICuentaOrigen;
  empresaInternaCodigo: string;
  empresaInternaId: string;
  empresaInterna: IEnum;
  destino: IEnum;
  estado: IEnum;
  fechaUltimoEstado: Date | string;
  formaPago: IEnum;
  importe: number;
  pagoSepa: IEnumPaises;
  usuarioRiesgos: IUsuario;
  usuarioTesoreria: IUsuario;
  operacionLibradorCif: string;
  operacionLibradorId: string;
  operacionLibradorRazonSocial: string;
  operacionNumero: string;
  libradorId: string;
  libradorRazonSocial?: string;
  libradoRazonSocial?: string;
}

interface IPagoOperacionByEstudioByFiltersGet {
  id: string;
  cuentaDestino: ICuentaDestino;
  cuentaOrigen: ICuentaOrigen;
  destino: IEnum;
  empresaInterna: {
    id: string;
    codigo: string;
  };
  estado: IEnum;
  fechaUltimoEstado: Date;
  formaPago: IEnum;
  importe: number;
  pagoSepa: {
    id: string;
    nombre: string;
  };
  usuarioRiesgos: IUsuario;
  usuarioTesoreria: IUsuario;
  operacionLibradorCif: string;
  operacionLibradorId: string;
  operacionLibradorRazonSocial: string;
  operacionNumero: string;
}

type IPagoOperacionByEstudioIdGetG =
  IGenericResponse<IPagoOperacionByEstudioIdGet>;

type IPagoOperacionByEstudioIdGetGP = Promise<IPagoOperacionByEstudioIdGetG>;

type IPagoOperacionByEstudioByFiltersGetG =
  IGenericResponse<IPagoOperacionByEstudioByFiltersGet>;

type IPagoOperacionByEstudioByFiltersGetGP =
  Promise<IPagoOperacionByEstudioByFiltersGetG>;

export type {
  IPagoOperacionByEstudioByFiltersGet,
  IPagoOperacionByEstudioByFiltersGetG,
  IPagoOperacionByEstudioByFiltersGetGP,
  IPagoOperacionByEstudioIdGet,
  IPagoOperacionByEstudioIdGetG,
  IPagoOperacionByEstudioIdGetGP,
};
