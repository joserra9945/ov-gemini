import { nanoid } from 'nanoid';
import { faUser } from '@fortawesome/pro-solid-svg-icons';

import { IColumn } from '@shared/interfaces';

import { IOption } from '../interfaces';

import {
  optionsEstadoHistorial,
  optionsEstadoPendientes,
  optionsType,
} from './optionsEstado';

export const columns = (activo = true): IColumn[] => [
  {
    key: nanoid(),
    header: 'FECHA',
    textAlign: 'center',
    field: 'lastModificationTime',
    filter: false,
    customFilter: {
      type: 'date',
      name: 'lastModificationTime',
    },
    fixedFilter: true,
    filterOrder: 2,
  },
  {
    key: nanoid(),
    header: 'LIBRADO',
    sortable: true,
    field: 'libradoRazonSocial',
    filter: false,
    filterIconName: faUser,
  },
  {
    key: nanoid(),
    header: 'LIBRADOR',
    sortable: true,
    field: 'libradorRazonSocial',
    filter: true,
    customFilter: {
      type: 'input',
      name: 'libradorRazonSocial',
      label: 'Librador',
    },
    filterIconName: faUser,
    fixedFilter: true,
    filterOrder: 0,
  },
  {
    key: nanoid(),
    header: 'PRODUCTO',
    sortable: true,
    field: 'productoNombre',
    filter: false,
    fixedFilter: true,
    filterOrder: 3,
    customFilter: {
      type: 'select',
      options: optionsType,
      name: 'productoNombre',
      itemTemplate: (option: IOption) => <span>{option.label}</span>,
    },
  },
  {
    key: nanoid(),
    header: 'IMPORTE NOMINAL',
    sortable: true,
    field: 'importeNominal',
    filter: false,
    customFilter: {
      type: 'number',
      name: 'importeNominal',
    },
    fixedFilter: true,
    filterOrder: 1,
  },
  {
    key: nanoid(),
    header: 'Pagaré Recogido',
    sortable: true,
    field: 'switch',
    filter: false,
    customFilter: {
      type: 'switch',
      name: 'switch',
    },
  },
  {
    key: nanoid(),
    header: 'ESTADO',
    field: 'estadoNombre',
    headerStyle: { width: '150px' },
    sortable: true,
    filter: true,
    customFilter: {
      type: 'multiselect',
      options: activo ? optionsEstadoPendientes : optionsEstadoHistorial,
      name: 'estados',
      itemTemplate: (option: IOption) => (
        <span
          style={{
            backgroundColor: option.color,
            color: 'white',
            padding: '5px',
            borderRadius: '3px',
            width: '90%',
          }}
        >
          {option.label}
        </span>
      ),
    },
  },
  {
    key: nanoid(),
    header: 'USUARIO INTERNO',
    field: 'usuarioInterno.nombre',
  },
];

export const columnsDenegados = (activo = true): IColumn[] => [
  {
    key: nanoid(),
    header: 'LIBRADO',
    sortable: true,
    field: 'libradoRazonSocial',
    filter: false,
    filterIconName: faUser,
  },
  {
    key: nanoid(),
    header: 'LIBRADOR',
    sortable: true,
    field: 'libradorRazonSocial',
    filter: true,
    customFilter: {
      type: 'input',
      name: 'libradorRazonSocial',
      label: 'Librador',
    },
    filterIconName: faUser,
    fixedFilter: true,
    filterOrder: 1,
  },
  {
    key: nanoid(),
    header: 'PRODUCTO',
    sortable: true,
    field: 'productoNombre',
    filter: false,
    fixedFilter: true,
    filterOrder: 3,
    customFilter: {
      type: 'select',
      options: optionsType,
      name: 'productoNombre',
      itemTemplate: (option: IOption) => <span>{option.label}</span>,
    },
  },
  {
    key: nanoid(),
    header: 'IMPORTE NOMINAL',
    sortable: true,
    field: 'importeNominal',
    filter: false,
    customFilter: {
      type: 'number',
      name: 'importeNominal',
      label: 'Importe',
    },
    fixedFilter: true,
    filterOrder: 1,
  },
  {
    key: nanoid(),
    header: 'ESTADO',
    field: 'estadoNombre',
    headerStyle: { width: '150px' },
    sortable: true,
    filter: true,
    customFilter: {
      type: 'multiselect',
      options: activo ? optionsEstadoPendientes : optionsEstadoHistorial,
      name: 'estados',
      itemTemplate: (option: IOption) => (
        <span
          style={{
            backgroundColor: option.color,
            color: 'white',
            padding: '5px',
            borderRadius: '3px',
            width: '90%',
          }}
        >
          {option.label}
        </span>
      ),
    },
  },
  {
    key: nanoid(),
    header: 'USUARIO INTERNO',
    field: 'usuarioInterno.nombre',
  },
];
