export const tipoStep = {
  ANYADIR_FACTURA_PAGARE: 0,
  RESUMEN_INICIAL: 1,
  CONTRATO: 2,
  VER_CONTRATO: 3,
};

export const items = [
  {
    label: 'Añadir factura/pagaré',
    id: tipoStep.ANYADIR_FACTURA_PAGARE,
    steps: [0],
    show: true,
    forStep: [tipoStep.ANYADIR_FACTURA_PAGARE],
  },
  {
    label: 'Resumen operación',
    id: tipoStep.RESUMEN_INICIAL,
    steps: [1],
    show: true,
    forStep: [tipoStep.RESUMEN_INICIAL],
  },
  {
    label: 'Generar contrato',
    id: tipoStep.CONTRATO,
    steps: [2],
    show: true,
    forStep: [tipoStep.CONTRATO],
  },
];
