import { IEmpresa } from '@shared/interfaces/common';
import { IEnum } from '@shared/interfaces/IEnum';

import { IGenericResponse } from '@shared/interfaces/Legacy/IReponse/IGenericResponse';

interface IOperacionGetByFilters {
  id: string;
  confirmada: boolean;
  efectosConfirmadosProximosAVencimiento: boolean;
  estado: IEnum;
  estadoVerificacionCliente: IEnum;
  fechaCierre: string;
  fechaFirma: string;
  fechaValor: string;
  gestorNombre: string;
  importeNominal: number;
  librador: IEmpresa;
  numero: number;
  producto: IEnum;
}

type IOperacionGetByFiltersG = IGenericResponse<IOperacionGetByFilters>;

type IOperacionGetByFiltersGP = Promise<IOperacionGetByFiltersG>;

export type {
  IOperacionGetByFilters,
  IOperacionGetByFiltersG,
  IOperacionGetByFiltersGP,
};
