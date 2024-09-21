import { IOption } from '../interfaces';

const colorsEstado = {
  PENDIENTE: '#f5b44d',
  CERRADO: '#3cad3c',
};

export const optionsEstado: IOption[] = [
  {
    label: 'Pendiente',
    value: 1,
    query: '&estados=1',
    color: colorsEstado.PENDIENTE,
  },
  {
    label: 'En Estudio',
    value: 2,
    query: '&estados=2',
    color: colorsEstado.PENDIENTE,
  },
  {
    label: 'Cerrado',
    value: 3,
    color: colorsEstado.CERRADO,
    query: '&estados=3',
    unchecked: true,
  },
  {
    label: 'Inventado',
    value: 4,
    color: colorsEstado.CERRADO,
    query: '&estados=4',
    unchecked: true,
  },
];

export const optionsEstadoPendientes: IOption[] = [
  {
    label: 'Pendiente',
    value: 1,
    query: '&estados=1',
    color: colorsEstado.PENDIENTE,
  },
  {
    label: 'En Estudio',
    value: 2,
    query: '&estados=2',
    color: colorsEstado.PENDIENTE,
  },
];

export const optionsEstadoHistorial: IOption[] = [
  {
    label: 'Cerrado',
    value: 3,
    color: colorsEstado.CERRADO,
    query: '&estados=3',
    unchecked: true,
  },
  {
    label: 'Inventado',
    value: 4,
    color: colorsEstado.CERRADO,
    query: '&estados=4',
    unchecked: true,
  },
];

export const optionsType: IOption[] = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Descuento de pagarés',
    value: 'Descuento de pagarés',
  },
  {
    label: 'Factoring',
    value: 'Factoring',
  },
];
