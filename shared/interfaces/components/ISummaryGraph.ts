import { IInformeGetByCif, IInformeRAIGetByCifG } from '../api/IInforme';

export interface ISummaryGraph {
  summary: IInformeGetByCif;
  summaryRAI: IInformeGetByCif;
  razonSocial?: string;
  cif?: string;
  informeRAI: IInformeRAIGetByCifG;
}
