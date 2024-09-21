export enum stepForm {
  DIRECT_LENDING,
  CESIONES,
  FIRMANTES,
  CUENTA_BANCARIA,
  RESUMEN,
  DOC_REQUERIDA,
}

export const stepTitulo = (step: number, configTitle: string) => {
  switch (step) {
    case stepForm.DIRECT_LENDING:
      return {
        titulo: 'Información de la propuesta',
        description: `Para generar la propuesta del ${configTitle} necesitamos la siguiente información:`,
      };
    case stepForm.CESIONES:
      return {
        titulo: `Cubrir ${configTitle}`,
        description: `Cesiones vinculadas al ${configTitle}:`,
      };
    case stepForm.FIRMANTES:
      return {
        titulo: 'Firmantes',
        description: 'Seleccione los firmantes:',
      };
    case stepForm.CUENTA_BANCARIA:
      return {
        titulo: 'Cuenta bancaria',
        description: 'Seleccione una cuenta bancaria:',
      };
    case stepForm.RESUMEN:
      return {
        titulo: `Resumen del ${configTitle}`,
        description: '',
      };
    case stepForm.DOC_REQUERIDA:
      return {
        titulo: ``,
        description: '',
      };
    default:
      return {
        titulo: '',
        description: ``,
      };
  }
};
