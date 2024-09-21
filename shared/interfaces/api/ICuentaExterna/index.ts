import { IEnum } from '@shared/interfaces/Legacy/IEnum';
import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

import {
  ICuentaExternaByEmpresaIdGet,
  ICuentaExternaByEmpresaIdGetG,
  ICuentaExternaByEmpresaIdGetGP,
} from './ICuentaExternaByEmpresaIdGet';
import {
  ICuentaExternaByFiltersGet,
  ICuentaExternaByFiltersGetG,
  ICuentaExternaByFiltersGetGP,
} from './ICuentaExternaByFiltersGet';

interface ICuentaExternaGet {
  id: string;
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
  empresaId: string;
  empresaRazonSocial: string;
  estado: IEnum;
  fechaUltimoEstado: string;
  motivoErrorVerificacion: string;
  titulares: [
    {
      id: string;
      cif: string;
      nombre: string;
    }
  ];
}

type ICuentaExternaGetG = IGenericResponse<ICuentaExternaGet>;

type ICuentaExternaGetGP = Promise<ICuentaExternaGetG>;

export type {
  ICuentaExternaByEmpresaIdGet,
  ICuentaExternaByEmpresaIdGetG,
  ICuentaExternaByEmpresaIdGetGP,
  ICuentaExternaByFiltersGet,
  ICuentaExternaByFiltersGetG,
  ICuentaExternaByFiltersGetGP,
  ICuentaExternaGet,
  ICuentaExternaGetG,
  ICuentaExternaGetGP,
};
