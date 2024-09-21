import { nanoid } from 'nanoid';

import { optionsTipoCuentaClienteEnum } from '@shared/enum/cuentaCliente';
import { IColumn } from '@shared/interfaces';
import { ICuentaClienteIdMovimientoGet } from '@shared/interfaces/api/ICuentaCliente';
import { IOption } from '@shared/interfaces/IOption/IOption';
import {
  EstadoCuentaClienteTemplate,
  FechaHoraTemplate,
  ImporteFormateadoTemplate,
  StringTemplate,
} from '@shared/templates';

import AccionesTemplate from './template/AccionesTemplate';

import '@shared/styles/app-theme/templates/detalleCuentaCliente.scss';

const columns: IColumn[] = [
  {
    key: nanoid(),
    header: 'Fecha',
    field: 'fecha',
    filter: true,
    fixedFilter: true,
    customFilter: {
      type: 'date',
      name: 'fecha',
    },
    body: ({ fecha }: ICuentaClienteIdMovimientoGet) => (
      <FechaHoraTemplate fechaHora={fecha.toString()} />
    ),
  },
  {
    key: nanoid(),
    header: 'Detalles',
    field: 'detalle',
    filter: true,
    fixedFilter: true,
    body: ({ detalle }: ICuentaClienteIdMovimientoGet) => (
      <StringTemplate text={detalle} />
    ),
  },
  {
    key: nanoid(),
    header: 'Tipo',
    field: 'tipo',
    filter: true,
    fixedFilter: true,
    body: ({ tipo }: ICuentaClienteIdMovimientoGet) => (
      <EstadoCuentaClienteTemplate
        description={tipo.description}
        id={tipo.id}
      />
    ),
    align: 'center',
    customFilter: {
      type: 'multiselect',
      options: optionsTipoCuentaClienteEnum,
      name: 'Tipos',
      itemTemplate: (option: IOption) => (
        <EstadoCuentaClienteTemplate
          id={option.value}
          description={option.label}
        />
      ),
    },
  },
  {
    key: nanoid(),
    header: 'Beneficiario',
    field: 'beneficiario',
    filter: true,
    fixedFilter: true,
    body: ({ beneficiario }: ICuentaClienteIdMovimientoGet) => (
      <StringTemplate text={beneficiario} />
    ),
  },
  {
    key: nanoid(),
    header: 'Importe',
    field: 'importe',
    filter: true,
    body: ({ importe }: ICuentaClienteIdMovimientoGet) => (
      <ImporteFormateadoTemplate
        importe={importe}
        className="flex justify-center font-medium"
        comesFromCuentaCliente
      />
    ),
    align: 'center',
    customFilter: {
      label: 'Importe',
      type: 'number',
      name: 'importe',
    },
  },
  {
    key: nanoid(),
    header: 'Saldo',
    field: 'saldo',
    body: ({ saldoReal }: ICuentaClienteIdMovimientoGet) => (
      <ImporteFormateadoTemplate
        importe={saldoReal}
        className="flex justify-center font-medium"
        comesFromCuentaCliente
      />
    ),
    align: 'center',
  },
  {
    key: nanoid(),
    header: '',
    field: 'idExterno',
    body: ({ idExterno }: ICuentaClienteIdMovimientoGet) => (
      <AccionesTemplate documentoId={idExterno} />
    ),
    align: 'right',
  },
];
export default columns;
