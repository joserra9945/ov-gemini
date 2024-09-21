import { INotariaForForm } from 'interfaces/INotaria';
import { IApoderado } from 'interfaces/IRepresentante';

import { IEnum } from '../Legacy/IEnum';

export interface IFirmaCesion {
  fechaCancelacion?: string | Date;
  id: string;
  email: string;
  fechaPrevista: string | Date;
  notarioId: string | INotariaForForm;
  notarioLocalId: string | INotariaForForm;
  telefono: string;
  tipo: IEnum;
  representanteInternoId: string | IApoderado;
  representanteExternoIds: string[] | { id: string }[];
  fechaFirma?: string;
}
