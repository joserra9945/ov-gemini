import { nanoid } from 'nanoid';

import { CargaMasivaTemplate } from '@shared/templates';

import ActionsTemplate from './Template/ActionsTemplate';
import EstadoBodyTemplate from './Template/EstadoBodyTemplate';
import FechaBodyTemplate from './Template/FechaBodyTemplate';
import FechaEmisionTemplate from './Template/FechaEmisionTemplate';
import LibradorBodyTemplate from './Template/LibradorBodyTemplate';
import NominalBodyTemplate from './Template/NominalBodyTemplate';
import NumeroBodyTemplate from './Template/NumeroBodyTemplate';
import TipoBodyTemplate from './Template/TipoBodyTemplate';

export const desktopColumns = (efectoCargaMasiva) => [
  {
    id: nanoid(),
    header: 'Deudor',
    className: 'deudor-column',
    body: LibradorBodyTemplate,
    style: { flexGrow: 1, flexBasis: '18%', width: '18%' },
  },
  {
    id: nanoid(),
    header: 'Nº documento',
    className: 'numero-documento-column',
    body: (efecto) =>
      efecto.tieneDetalles ? (
        <CargaMasivaTemplate
          efecto={efecto}
          efectoCargaMasiva={efectoCargaMasiva}
        />
      ) : (
        <NumeroBodyTemplate efecto={efecto} />
      ),
    style: { flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
  {
    id: nanoid(),
    header: 'Tipo',
    className: 'tipo-column',
    body: TipoBodyTemplate,
    style: { flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
  {
    id: nanoid(),
    className: 'emision-column',
    header: 'Emisión',
    body: FechaEmisionTemplate,
    style: { flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
  {
    id: nanoid(),
    className: 'vencimiento-column',
    header: 'Vencimiento',
    body: FechaBodyTemplate,
    style: { flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
  {
    id: nanoid(),
    className: 'nominal-column',
    header: 'Nominal',
    body: NominalBodyTemplate,
    style: { flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
  {
    id: nanoid(),
    className: 'estado-column',
    header: 'Estado',
    body: EstadoBodyTemplate,
    style: { textAlign: 'center', flexGrow: 1, flexBasis: '11%', width: '11%' },
  },
];

export const mobileTableColumns = (goToDetalle) => [
  {
    id: nanoid(),
    header: 'Tipo',
    className: 'tipo-column',
    body: TipoBodyTemplate,
  },
  {
    id: nanoid(),
    header: 'Nº documento',
    className: 'numero-documento-column',
    body: (efecto) => <NumeroBodyTemplate efecto={efecto} />,
  },
  {
    id: nanoid(),
    className: 'emision-column',
    header: 'Emisión',
    body: FechaEmisionTemplate,
  },
  {
    id: nanoid(),
    header: 'Vencimiento',
    className: 'vencimiento-column',
    body: FechaBodyTemplate,
  },
  {
    id: nanoid(),
    header: '',
    className: 'action-column',
    body: (e) => ActionsTemplate(e, goToDetalle),
    isFunctionComponent: true,
  },
];
