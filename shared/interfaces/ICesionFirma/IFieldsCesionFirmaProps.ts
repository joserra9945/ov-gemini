import { FieldValues } from 'react-hook-form';

import { ICesion } from 'interfaces/ICesion/ICesion';

import { IFirmaCesion } from '../IFirmaCesion';
import { INotariaForForm } from '../INotaria';
import { IApoderado, IRepresentanteFirma } from '../IRepresentante';

export interface IFieldsCesionFirmaProps {
  cesion?: ICesion;
  firma?: IFirmaCesion;
  rhForm: FieldValues;
  notarios: INotariaForForm[];
  notariosLocales: INotariaForForm[];
  apoderados: IApoderado[];
  firmantes: IRepresentanteFirma[];
}
