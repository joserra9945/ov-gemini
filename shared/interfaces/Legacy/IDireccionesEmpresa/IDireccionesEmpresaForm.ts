import { FieldValues } from 'react-hook-form';

import { IDireccionesEmpresa } from '.';

export interface IDireccionesEmpresaForm {
  direccion: IDireccionesEmpresa;
  empresaId: string;
  editing?: boolean;
  nextStep: () => void;
  addSocialAddress: boolean;
}

export interface IDireccionFieldForm {
  direccion?: IDireccionesEmpresa | null;
  rhForm: FieldValues;
  addSocialAddress?: boolean;
}
