interface IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId {
  directoVivo: number;
  directoImpagado: number;
  directoPropuesto: number;
  directoVencido: number;
  indirectoVivo: number;
  indirectoImpagado: number;
  indirectoPropuesto: number;
  indirectoVencido: number;
}

type IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP =
  Promise<IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId>;

export type {
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaId,
  IEmpresaExternaGrupoRiesgoVivoByEmpresaExternaIdEmpresaInternaIdP,
};
