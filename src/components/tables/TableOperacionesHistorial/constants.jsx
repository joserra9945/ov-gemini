import { nanoid } from 'nanoid';

import { EfectoVerificadoTemplate } from '@shared/templates';

import DescriptionMobileTemplate from './Templates/DescriptionMobileTemplate';
import {
  estadoBodyTemplate,
  fechaBodyTemplate,
  nominalBodyTemplate,
  numeroBodyTemplate,
  productoBodyTemplate,
} from './Templates';

export const desktopColumns = [
  {
    id: nanoid(),
    field: 'numero',
    header: 'Nº de operación',
    body: numeroBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: nanoid(),
    field: 'fechaOperacion',
    header: 'Fecha',
    body: fechaBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: nanoid(),
    field: 'producto.description',
    header: 'Producto',
    body: productoBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: nanoid(),
    field: 'importeNominal',
    header: 'Nominal',
    body: nominalBodyTemplate,
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: nanoid(),
    header: 'Cesión',
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
    body: (rowData) => (
      <EfectoVerificadoTemplate aceptado={rowData.cesionesAceptadas} />
    ),
  },
  {
    id: nanoid(),
    header: 'Verificación',
    className: 'efecto-verificado-column',
    body: (rowData) => (
      <EfectoVerificadoTemplate aceptado={rowData.efectosVerificados} />
    ),
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
  },
  {
    id: nanoid(),
    field: 'estado',
    header: 'Estado',
    style: { textAlign: 'left', flexGrow: 1, flexBasis: '14%', width: '14%' },
    body: estadoBodyTemplate,
  },
];

export const mobileDataViewColumns = [
  {
    id: nanoid(),
    header: '',
    body: DescriptionMobileTemplate,
    className: 'description-mobile-container',
  },
];

export const mobileTableColumns = [
  {
    id: nanoid(),
    header: 'Producto',
    body: productoBodyTemplate,
  },
  {
    id: nanoid(),
    header: 'Fecha',
    body: fechaBodyTemplate,
  },
];
