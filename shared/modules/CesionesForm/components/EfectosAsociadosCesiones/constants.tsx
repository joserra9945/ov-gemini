import { nanoid } from 'nanoid';

import { IColumn } from '@shared/interfaces';
import {
  FechaTemplate,
  ImporteFormateadoTemplate,
  StringTemplate,
} from '@shared/templates';

import { IEfecto, IEfectoCesion } from 'interfaces/IEfectos/IEfectos';

export const columns: IColumn[] = [
  {
    key: nanoid(),
    body: ({ numero }: IEfecto) => <StringTemplate text={numero || ''} />,
    header: 'Nº de documento',
  },
  {
    key: nanoid(),
    body: ({ tipoDocumento }: IEfecto) => (
      <StringTemplate text={tipoDocumento.description || ''} />
    ),
    header: 'Tipo',
  },
  {
    key: nanoid(),
    body: ({ fechaEmision }: IEfecto) =>
      fechaEmision ? <FechaTemplate fecha={fechaEmision.toString()} /> : '-',
    header: 'Fecha de emisión',
    align: 'center',
  },
  {
    key: nanoid(),
    body: ({ fechaVencimiento }: IEfectoCesion) => (
      <FechaTemplate fecha={fechaVencimiento} />
    ),
    header: 'Fecha de vencimiento',
    align: 'center',
  },
  {
    key: nanoid(),
    body: ({ operacionNumero }: IEfecto) => (
      <StringTemplate text={operacionNumero || 'Sin Operacion'} />
    ),
    header: 'Operación',
    align: 'center',
  },
  {
    key: nanoid(),
    body: ({ estadoFinanciacion }: IEfecto) => (
      <StringTemplate text={estadoFinanciacion?.description || ''} />
    ),
    header: 'Estado',
    align: 'center',
  },
  {
    key: nanoid(),
    body: ({ importeNominal }: IEfecto) => (
      <ImporteFormateadoTemplate importe={importeNominal} />
    ),
    header: 'Importe (€)',
    align: 'right',
  },
];
