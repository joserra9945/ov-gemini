interface IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId {
  directoVivo: number;
  directoImpagado: number;
  directoPropuesto: number;
  directoVencido: number;
  indirectoVivo: number;
  indirectoImpagado: number;
  indirectoPropuesto: number;
  indirectoVencido: number;
}

type IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP =
  Promise<IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId>;

export type {
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
};
