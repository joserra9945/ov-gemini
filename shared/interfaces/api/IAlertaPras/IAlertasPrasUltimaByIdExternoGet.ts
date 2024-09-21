interface IAlertasUltimaByIdExternoGet {
  id: string;
  fechaUltimaSolicitudActualizacionValor: string;
}

type IAlertasUltimaByIdExternoGetP = Promise<IAlertasUltimaByIdExternoGet>;

export type { IAlertasUltimaByIdExternoGet, IAlertasUltimaByIdExternoGetP };
