export interface ITipoDocumento {
  id?: number;
  nombre?: string;
}

export interface ITipoDocumentoExtended extends ITipoDocumento {
  tieneDocumentos?: boolean;
}

export type ITipoDocumentoRequired = Required<ITipoDocumento>;

export type ITipoDocumentoExtendedRequired = Required<ITipoDocumentoExtended>;
