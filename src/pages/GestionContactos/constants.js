import { nanoid } from 'nanoid';

import Apellidos from './templates/Apellidos';
import EstadoDescription from './templates/CargoDescription';
import Nombre from './templates/Nombre';

export const columns = [
  {
    key: nanoid(),
    body: Nombre,
    header: 'Nombre',
    field: 'nombre',
    style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
  },
  {
    key: nanoid(),
    body: Apellidos,
    header: 'Apellidos',
    field: 'apellidos',
    style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
  },
  {
    key: nanoid(),
    body: EstadoDescription,
    header: 'Cargo',
    field: 'cargoDescription',
    style: { flexGrow: 1, flexBasis: '15%', width: '15%' },
  },
];
