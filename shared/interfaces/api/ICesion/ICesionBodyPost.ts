type ICesionBodyPost = {
  descripcion: string;
  fechaFinalizacion?: string;
  fechaInicioContrato?: string;
  importe: number;
  importePendienteDeEjecutar?: number;
  librado: {
    cif: string;
    razonSocial: string;
  };
  libradorId: string;
  numero?: string;
  tipo: number;
};

export type { ICesionBodyPost };
