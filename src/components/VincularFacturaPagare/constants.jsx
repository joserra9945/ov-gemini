import { nanoid } from 'nanoid';

import FechaEmision from 'templates/Efectos/FechaEmision';
import FechaVencimiento from 'templates/Efectos/FechaVencimiento';
import Importe from 'templates/Efectos/Importe';
import Numero from 'templates/Efectos/Numero';

export const columns = [
  {
    key: nanoid(),
    field: 'numero',
    body: Numero,
    header: 'Número',
  },
  {
    key: nanoid(),
    field: 'fechaEmision',
    body: FechaEmision,
    header: 'F. emisión',
  },
  {
    key: nanoid(),
    field: 'fechaVencimiento',
    body: FechaVencimiento,
    header: 'F. vencimiento',
  },
  {
    key: nanoid(),
    field: 'importe',
    body: Importe,
    header: 'Importe',
  },
];
