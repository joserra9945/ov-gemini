import { IEnum } from '../IEnum';
import { ILibradoLibrador } from '../IPrecio';

interface ICuentaBancariaResumenDirectLending {
  id: string;
  iban: string;
}
type EmpresaInterna = {
  id: string;
  codigo: IEnum;
};

type IPrestamoIdGet = {
  id: string;
  concepto: IEnum;
  cuotaMensual: number;
  descripcionEstado: string;
  empresaInterna: EmpresaInterna;
  estado: IEnum;
  fechaDeFin: string;
  firmaNotarialId: string;
  importeInicial: number;
  importeNominal: number;
  importes: IPrestamoImportes;
  librador: ILibradoLibrador;
  numero: number;
  plazoEnMeses: number;
  tienePagares: boolean;
  tipoAval: IEnum;
  cuentaPago: ICuentaBancariaResumenDirectLending;
};

export interface IEmpresaInterna {
  id: string;
  codigo: IEnum;
}

type IPrestamoImportes = {
  importeComision: number;
  importeGastosDeGestion: number;
  importeInteres: number;
  importeLiquido: number;
  importeNominal: number;
  importeProvisionDeFondos: number;
  importeSolicitado: number;
  porcentajeComision: number;
  porcentajeInteres: number;
};

type IPrestamoIdGetP = Promise<IPrestamoIdGet>;
export type { IPrestamoIdGet, IPrestamoIdGetP };
