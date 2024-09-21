import { estadosOperaciones } from '@shared/utils/constants';

import DocRequerida from '../../components/DocRequeridaEnFichaDetalle';

import Contrato from './Contrato';
import Efectos from './Efectos';

export const tabIndexMenuFichaOperacion = {
  Contrato: 2,
};
export const tabMenuItems = [
  { label: 'Documentacion requerida', id: 0, element: DocRequerida },
  { label: 'Efectos', id: 2, element: Efectos },
  {
    label: 'Contrato',
    id: 3,
    element: Contrato,
    disabledStates: [
      estadosOperaciones.GENERANDO_CONTRATO,
      estadosOperaciones.PERDIDA,
    ],
  },
];
