export interface IPrasScoringByLibradoCifGet {
  CIF: string;
  fecha: string;
  scoring: string;
  tipo: string;
  fechaValidacion?: string;
}

type IPrasScoringByLibradoCifGetP = Promise<IPrasScoringByLibradoCifGet>;

export interface IPrasAccionByLibradoCifGet {
  CIF: string;
  accion: string;
}
type IPrasAccionByLibradoCifGetP = Promise<IPrasAccionByLibradoCifGet>;

export interface IPrasDetalleMotivoCifGet {
  CIF: string;
  detalle_motivo: string;
}

type IPrasDetalleMotivoCifGetP = Promise<IPrasDetalleMotivoCifGet>;
export interface IPrasBalanceGet {
  Balance: string;
  CIF: string;
}

type IPrasBalanceGetP = Promise<IPrasBalanceGet>;

export interface IPrasCuentaResultadoGet {
  CIF: string;
  CuentaResultados: string;
}
type IPrasCuentaResultadoGetP = Promise<IPrasCuentaResultadoGet>;

export interface IPrasImporteProductosGet {
  CIF: string;
  importe_productos: string;
}
type IPrasImporteProductosGetP = Promise<IPrasImporteProductosGet>;

export interface IPrasICOByCifGet {
  Administración: string;
  Departamento: string;
  FechaConcesion: string;
  FechaExtraccion: string;
  ISC_Importe: number;
  Instrumento: string;
  ind: number;
  Órgano: string;
}
type IPrasICOByCifGetP = Promise<IPrasICOByCifGet[]>;

export interface IPrasCargosByCif {
  CIF: string;
  cargos: IPrasCargos;
}
export interface IPrasCargos {
  Administrador?: ITipoCargo[];
  Apoderado?: ITipoCargo[];
  Auditor?: ITipoCargo[];
  Consejo?: ITipoCargo[];
  Otro?: ITipoCargo[];
}
export interface ITipoCargo {
  Cargo: string;
  CargosImportantes: number;
  FechaAltaEmpresa: string;
  FechaNombramiento: string;
  NombreCompleto: string;
  NombreSeguido: string;
  NumVinculaciones: number;
  Orden: number;
  TieneIncidencias: number;
  TipoCargo: string;
  TipoFirma: string | null;
  ind: number;
}

type IPrasCargosByCifP = Promise<IPrasCargosByCif>;

export interface IPrasListadoScoringGet {
  label: string;
  value: number;
  ModificaScoring?: string;
}
type IPrasListadoScoringGetP = Promise<IPrasListadoScoringGet[]>;

export interface IPrasListadoMotivoGet {
  ModificaScoring: number;
  label: string;
}
type IPrasListadoMotivoGetP = Promise<IPrasListadoMotivoGet[]>;

export interface IPrasScoringCambioBodyPost {
  PRAS: string;
  cif: string;
  motivo: number;
  nombre_usuario: string;
  razonsocial: string;
  scoring: string;
  usuario: string;
}

export type {
  IPrasAccionByLibradoCifGetP,
  IPrasBalanceGetP,
  IPrasCargosByCifP,
  IPrasCuentaResultadoGetP,
  IPrasDetalleMotivoCifGetP,
  IPrasICOByCifGetP,
  IPrasImporteProductosGetP,
  IPrasListadoMotivoGetP,
  IPrasListadoScoringGetP,
  IPrasScoringByLibradoCifGetP,
};
