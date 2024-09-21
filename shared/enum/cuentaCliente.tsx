import { IOption } from '@shared/interfaces/IOption';

export const tipoCuentaCliente = {
  NOMINCAL_SIN_RETENCION: 0,
  RETENCION: 1,
  GASTOS: 2,
  COMISION: 3,
  INTERES: 4,
  TRANSFERENCIA: 5,
  HACIENDA_SEGURIDAD_SOCIAL: 6,
  COMPENSACION_POR_IMPAGO: 7,
  IMPAGO: 8,
  RECOBRO: 9,
  PAGO_DE_RETENCION: 10,
  COMISION_POR_IMPAGO: 11,
  INTERES_POR_EXTENSION_DE_PAGO: 12,
  COBRO_DE_RETENCION: 13,
};

export const optionsTipoCuentaClienteEnum: IOption[] = [
  {
    label: 'Nominal (sin retención)',
    value: tipoCuentaCliente.NOMINCAL_SIN_RETENCION,
  },
  {
    label: 'Retención',
    value: tipoCuentaCliente.RETENCION,
  },
  {
    label: 'Gastos',
    value: tipoCuentaCliente.GASTOS,
  },
  {
    label: 'Comisión',
    value: tipoCuentaCliente.COMISION,
  },
  {
    label: 'Interés',
    value: tipoCuentaCliente.INTERES,
  },
  {
    label: 'Transferencia',
    value: tipoCuentaCliente.TRANSFERENCIA,
  },
  {
    label: 'Hacienda/Seguridad social',
    value: tipoCuentaCliente.HACIENDA_SEGURIDAD_SOCIAL,
  },
  {
    label: 'Compensación por impago',
    value: tipoCuentaCliente.COMPENSACION_POR_IMPAGO,
  },
  {
    label: 'Impago',
    value: tipoCuentaCliente.IMPAGO,
  },
  {
    label: 'Recobro',
    value: tipoCuentaCliente.RECOBRO,
  },
  {
    label: 'Pago de retención',
    value: tipoCuentaCliente.PAGO_DE_RETENCION,
  },
  {
    label: 'Comisión por impago',
    value: tipoCuentaCliente.COMISION_POR_IMPAGO,
  },
  {
    label: 'Interés por extensión de pago',
    value: tipoCuentaCliente.INTERES_POR_EXTENSION_DE_PAGO,
  },
  {
    label: 'Cobro de retención',
    value: tipoCuentaCliente.COBRO_DE_RETENCION,
  },
];
