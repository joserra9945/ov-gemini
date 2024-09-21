import { nanoid } from 'nanoid';

import { EfectoVerificadoTemplate } from '@shared/templates';

import EstadoBodyTemplate from './Template/EstadoBodyTemplate';
import FechaBodyTemplate from './Template/FechaBodyTemplate';
import NominalBodyTemplate from './Template/NominalBodyTemplate';
import NumeroBodyTemplate from './Template/NumeroBodyTemplate';
import ProductoBodyTemplate from './Template/ProductoBodyTemplate';

export const desktopColumns = [
  {
    id: nanoid(),
    header: 'Nº de operación',
    className: 'numero-operacion-column',
    body: NumeroBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
  },
  {
    id: nanoid(),
    header: 'Fecha',
    className: 'fecha-column',
    body: FechaBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
  },
  {
    id: nanoid(),
    className: 'producto-column',
    header: 'Producto',
    body: ProductoBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
  },
  {
    className: 'nominal-column',
    id: nanoid(),
    header: 'Nominal',
    body: NominalBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
  },
  {
    id: nanoid(),
    header: 'Cesión',
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
    body: (rowData) => (
      <EfectoVerificadoTemplate aceptado={rowData.cesionesAceptadas} />
    ),
  },
  {
    id: nanoid(),
    header: 'Verificación',
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
    body: (rowData) => (
      <EfectoVerificadoTemplate aceptado={rowData.efectosVerificados} />
    ),
  },
  {
    id: nanoid(),
    header: 'Estado',
    className: 'estado-column',
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '13%', width: '13%' },
    body: (e) => EstadoBodyTemplate(e),
  },
];
