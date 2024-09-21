import { IGenericResponse } from 'interfaces/IReponse/IGenericResponse';

import { IDevolucionDePagares, IDevolucionDePagaresById } from './index';

export type IDevolucionDePagaresGenericResponse =
  IGenericResponse<IDevolucionDePagares>;

export type IDevolucionDePagaresByIdGenericResponse =
  IGenericResponse<IDevolucionDePagaresById>;
