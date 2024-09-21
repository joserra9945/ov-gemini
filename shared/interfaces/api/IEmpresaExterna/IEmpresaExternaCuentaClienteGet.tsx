type IEmpresaExternaCuentaClienteGet = {
  id: string;
  importeMaximoDevolucion: number;
  importeMaximoIngreso: number;
  porcentajeRetencion: number;
  riesgoIndirectoPosibleImpago: number;
  riesgoIndirectoVivo: number;
  fechaModificacionPorcentajeRetencion: string;
  usuarioModificacionPorcentajeRetencionNombreCompleto: string;
};
type IEmpresaExternaCuentaClienteGetP =
  Promise<IEmpresaExternaCuentaClienteGet>;

export type {
  IEmpresaExternaCuentaClienteGet,
  IEmpresaExternaCuentaClienteGetP,
};
