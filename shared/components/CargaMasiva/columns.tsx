import { nanoid } from 'nanoid';

import { IColumn } from '@shared/interfaces';
import { IFacturaDetallesByFiltersGet } from '@shared/interfaces/api/IPagare';
import {
  FechaHoraTemplate,
  ImporteFormateadoTemplate,
  PdfTemplate,
  StringTemplate,
} from '@shared/templates';

export const columnsCargaMasiva: IColumn[] = [
  {
    key: nanoid(),
    header: 'Numero',
    body: ({ numero }: IFacturaDetallesByFiltersGet) => (
      <StringTemplate text={numero} />
    ),
    align: 'center',
  },
  {
    key: nanoid(),
    header: 'Fecha Emisión',
    body: ({ fechaEmision }: IFacturaDetallesByFiltersGet) => (
      <FechaHoraTemplate fechaHora={fechaEmision} />
    ),
    align: 'center',
  },
  {
    key: nanoid(),
    header: 'Importe Nominal',

    body: ({ importeNominal }: IFacturaDetallesByFiltersGet) => (
      <ImporteFormateadoTemplate importe={importeNominal} />
    ),
    align: 'center',
  },
  {
    key: nanoid(),
    header: '',
    body: ({ idExterno }: IFacturaDetallesByFiltersGet) => (
      <PdfTemplate id={idExterno} />
    ),
    align: 'center',
  },
];
