import { INotariaForForm } from 'interfaces/INotaria';
import { IApoderado, IRepresentanteFirma } from 'interfaces/IRepresentante';
import { ITipoCesion } from 'interfaces/ITipoCesion';
import { ITiposFirma } from 'interfaces/ITiposFirma';

export interface ICesionFirma {
  tipoServicio: number;
  modeloCesion: ITipoCesion;
  sinRecurso: boolean;
  esSinComunicar: boolean;
  clausula24: boolean;
  numeroCesion: string;
  fechaContrato: Date;
  fechaFinalizacion: Date | string;
  fechaInicioContrato: string | Date;
  descripcion: string;
  porcentajeInteres: number;
  porcentajeComision: number;
  porcentajeRetencion: number;
  tiposFirma: ITiposFirma;
  notariaFirma: INotariaForForm;
  notariaLocal: INotariaForForm;
  fechaPrevista: Date;
  apoderadosFirma: IApoderado;
  firmanteFirma: IRepresentanteFirma[];
  encabezadoCesion?: string;
  tipoFirma: ITiposFirma;
  numero?: string;
  importePendienteDeEjecutar: number;
}
