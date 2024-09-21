export interface IRetencion {
  efectoId?: string | null;
  fechaPago?: string | Date | null;
  importePagado?: number | null;
}

export interface IRetencionResponse {
  usuarioInternoId?: string | null;
  fechaPago?: string | Date | null;
  importePagado?: number | null;
}
