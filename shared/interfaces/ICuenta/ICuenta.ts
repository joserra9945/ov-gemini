import { ICuentaTitulares } from '../ITitulares/ITitulares';
import { IEnum } from '../Legacy/IEnum';
import { IGenericResponse } from '../Legacy/IReponse/IGenericResponse';

interface IEstado {
  description: string;
  id: string;
}
export interface ICuenta {
  id: string;
  activa?: boolean;
  entidadBancaria?: {
    bic: string;
    codigo: string;
    id: string;
    nombre: string;
  };
  iban?: {
    codigoPais: string;
    completo: string;
    digitoDeControl1: string;
    digitoDeControl2: string;
    entidad: string;
    numeroDeCuenta: string;
    oficina: string;
  };
  empresaId?: string;
  empresaRazonSocial?: string;
  empresaInterna?: IEnum;
  estado: IEstado;
  fechaUltimoEstado?: string;
  motivoErrorVerificacion: string;
  titulares?: ICuentaTitulares[];
}

export type ICuentaGenericResponse = IGenericResponse<ICuenta>;
