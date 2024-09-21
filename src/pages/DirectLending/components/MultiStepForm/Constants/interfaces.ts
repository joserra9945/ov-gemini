import { ICesionByFiltersGet } from '@shared/interfaces/api/ICesion';
import { IEnum } from '@shared/interfaces/IEnum';
import { IRepresentanteGetByEmpresaId } from '@shared/interfaces/IRepresentante';

export interface IProps {
  titulo: string;
}

export interface ICuentaBancariaDirectLending {
  estado: number;
  id: string;
  iban: string;
  nombre: string;
}
export interface IDirectLendingData {
  importe: number;
  meses: IEnum;
  concepto: IEnum;
  cesiones: ICesionByFiltersGet[];
  firmantes: IRepresentanteGetByEmpresaId[];
  cuentaBancaria: ICuentaBancariaDirectLending;
}
