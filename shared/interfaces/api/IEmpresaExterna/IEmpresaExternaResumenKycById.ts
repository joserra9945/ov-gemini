interface IEmpresaExternaResumenKycById {
  actividadCompleta: boolean;
  informacionCompleta: boolean;
  tieneDireccionSocial: boolean;
  tieneFirmantes: boolean;
  tieneSociosRespondido: boolean;
  tieneTelefonoYCorreo: boolean;
}

type IEmpresaExternaResumenKycByIdP = Promise<IEmpresaExternaResumenKycById>;

export type { IEmpresaExternaResumenKycById, IEmpresaExternaResumenKycByIdP };
