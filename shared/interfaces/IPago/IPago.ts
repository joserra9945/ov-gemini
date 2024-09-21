import { ICuentaDestino } from '../ICuenta/ICuentaDestino';
import { ICuentaOrigen } from '../ICuenta/ICuentaOrigen';
import { IEstado } from '../IEstado/IEstado';
import { IPagoSepaGet } from '../IPagoSepa';
import { IUsuario } from '../IUsuario/IUsuario';
import { IEnum } from '../Legacy/IEnum';

export interface IPago {
  id: string;
  cuentaDestino: ICuentaDestino;
  cuentaOrigen: ICuentaOrigen;
  empresaInternaCodigo: string;
  empresaInternaId: string;
  empresaInterna?: IEnum;
  destino: IEnum;
  estado: IEstado;
  fechaUltimoEstado: Date | string;
  formaPago: IEnum;
  importe: number;
  pagoSepa: IPagoSepaGet;
  usuarioRiesgos?: IUsuario;
  usuarioTesoreria?: IUsuario;
  operacionLibradorCif: string;
  operacionLibradorId?: string;
  operacionLibradorRazonSocial: string;
  operacionNumero: string;
  pagoSepaNombre?: string;
  libradorId?: string;
  libradorRazonSocial?: string;
}
