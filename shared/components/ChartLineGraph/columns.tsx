import { nanoid } from 'nanoid';

import { IColumn } from '@shared/interfaces';
import { IInformeDetalleOpGetByCif } from '@shared/interfaces/api/IInforme';
import {
  FechaHoraTemplate,
  ImporteFormateadoTemplate,
  StringTemplate,
} from '@shared/templates';

const columns: IColumn[] = [
  {
    key: nanoid(),
    header: 'Fecha',
    body: ({ fecha }: IInformeDetalleOpGetByCif) => (
      <FechaHoraTemplate fechaHora={fecha} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Entidad',
    body: ({ entidad }: IInformeDetalleOpGetByCif) => (
      <StringTemplate text={entidad?.description} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Producto',
    body: ({ producto }: IInformeDetalleOpGetByCif) => (
      <StringTemplate text={producto?.description} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Naturaleza',
    body: ({ naturaleza }: IInformeDetalleOpGetByCif) => (
      <StringTemplate text={naturaleza?.description} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Situación',
    body: ({ situacion }: IInformeDetalleOpGetByCif) => (
      <StringTemplate text={situacion?.description} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Importe (€)',
    body: ({ importeTotalImpagado }: IInformeDetalleOpGetByCif) => (
      <ImporteFormateadoTemplate importe={importeTotalImpagado} />
    ),
    align: 'right',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Fecha inicio',
    body: ({ fechaInicio }: IInformeDetalleOpGetByCif) => (
      <FechaHoraTemplate fechaHora={fechaInicio} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
  {
    key: nanoid(),
    header: 'Fecha fin',
    body: ({ fechaFin }: IInformeDetalleOpGetByCif) => (
      <FechaHoraTemplate fechaHora={fechaFin} />
    ),
    align: 'left',
    style: { flexGrow: 1, flexBasis: '120px', width: '120px' },
  },
];

export default columns;
