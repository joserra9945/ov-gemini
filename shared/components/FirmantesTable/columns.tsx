import { nanoid } from 'nanoid';

import { IColumn } from '@shared/interfaces';
import { IRepresentante } from '@shared/interfaces/IRepresentante';
import { StringTemplate } from '@shared/templates';

const columns: IColumn[] = [
  {
    key: nanoid(),
    header: 'Nombre',
    field: 'persona.nombre',
    body: ({ persona }: IRepresentante) => (
      <StringTemplate text={persona.nombre} />
    ),
  },
  {
    key: nanoid(),
    header: 'Apellidos',
    field: 'persona.apellidos',
    body: ({ persona }: IRepresentante) => (
      <StringTemplate text={persona.apellidos} />
    ),
  },
  {
    key: nanoid(),
    header: 'Cargo',
    field: 'cargo.description',
    body: ({ cargo }: IRepresentante) => (
      <StringTemplate text={cargo.description} />
    ),
  },
];

export default columns;
