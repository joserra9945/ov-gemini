import { IGenericResponse } from '../IGenericResponse';

interface IPrestamoIdAmortizacionesGet {
  empresaInterna: EmpresaInterna;
  fechaEmision: string;
  fechaVencimiento: string;
  importeNominal: number;
  lugarEmision: string;
  mes: number;
}

interface EmpresaInterna {
  cif: string;
  razonSocial: string;
}

type IPrestamoIdAmortizacionesGetG =
  IGenericResponse<IPrestamoIdAmortizacionesGet>;
type IPrestamoIdAmortizacionesGetGP = Promise<IPrestamoIdAmortizacionesGetG>;

export type {
  IPrestamoIdAmortizacionesGet,
  IPrestamoIdAmortizacionesGetG,
  IPrestamoIdAmortizacionesGetGP,
};
