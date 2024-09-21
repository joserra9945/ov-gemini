import { nanoid } from 'nanoid';

import Cif from '../Templates/Cif';
import RazonSocial from '../Templates/RazonSocial';

export const columns = [
  {
    key: nanoid(),
    body: Cif,
    header: 'CIF',
    field: 'cif',
    sortable: true,
    frozen: true,
  },
  {
    key: nanoid(),
    body: RazonSocial,
    header: 'Razón Social',
    field: 'razonSocial',
    sortable: true,
    frozen: true,
  },
];
