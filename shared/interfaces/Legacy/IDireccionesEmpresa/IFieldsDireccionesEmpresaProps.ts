import { FieldValues } from 'react-hook-form';

import { IDireccionesEmpresa } from '.';

export interface IFieldsDireccionesEmpresaProps {
  direccion: IDireccionesEmpresa;
  rhForm: FieldValues;
  addSocialAddress: boolean;
}
