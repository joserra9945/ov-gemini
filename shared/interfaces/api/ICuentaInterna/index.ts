import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface ICuentaInternaGet {
  codigo: string;
  cuentaContable: string;
  empresaCodigo: string;
  empresaId: string;
  empresaRazonSocial: string;
  tayaId: number;
  vinculadaAFondo: boolean;
  activa: boolean;
  entidadBancaria: {
    bic: string;
    codigo: string;
    id: string;
    nombre: string;
  };
  iban: {
    codigoPais: string;
    completo: string;
    digitoDeControl1: string;
    digitoDeControl2: string;
    entidad: string;
    numeroDeCuenta: string;
    oficina: string;
  };
  id: string;
}

interface ICuentaInternaIdGet {
  id: string;
  activa: boolean;
  codigo: string;
  cuentaContable: string;
  empresaCodigo: string;
  empresaId: string;
  empresaRazonSocial: string;
  tayaId: number;
  vinculadaAFondo: boolean;
  entidadBancaria: {
    bic: string;
    codigo: string;
    id: string;
    nombre: string;
  };
  iban: {
    codigoPais: string;
    completo: string;
    digitoDeControl1: string;
    digitoDeControl2: string;
    entidad: string;
    numeroDeCuenta: string;
    oficina: string;
  };
}

type ICuentaInternaGetG = IGenericResponse<ICuentaInternaGet>;
type ICuentaInternaGetGP = Promise<ICuentaInternaGetG>;

type ICuentaInternaIdGetG = IGenericResponse<ICuentaInternaIdGet>;
type ICuentaInternaIdGetGP = Promise<ICuentaInternaIdGetG>;
type ICuentaInternaIdGetP = Promise<ICuentaInternaIdGet>;

export type {
  ICuentaInternaGet,
  ICuentaInternaGetG,
  ICuentaInternaGetGP,
  ICuentaInternaIdGet,
  ICuentaInternaIdGetG,
  ICuentaInternaIdGetGP,
  ICuentaInternaIdGetP,
};
