import { nanoid } from 'nanoid';

import EstadoFirmaCesionTemplate from '@shared/templates/EstadoFirmaCesionTemplate';

import Importe from './templates/Importe';
import RazonSocialLibrado from './templates/RazonSocialLibrado';
import Tipo from './templates/Tipo';

export const columns = [
  {
    key: nanoid(),
    body: RazonSocialLibrado,
    header: 'Razón social',
    style: { flexGrow: 1, flexBasis: '25%', width: '25%' },
  },
  {
    key: nanoid(),
    body: Tipo,
    header: 'Tipo',
    style: { flexGrow: 1, flexBasis: '16%', width: '16%' },
  },
  {
    key: nanoid(),
    body: ({ estadoFirma }) => (
      <EstadoFirmaCesionTemplate estadoFirma={estadoFirma} />
    ),
    header: 'Estado',
    textAlign: 'center',
    style: { flexGrow: 1, flexBasis: '25%', width: '25%' },
  },
];
