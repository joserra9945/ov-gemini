import {
  IInformeGetResumenByCifG,
  IInformeRAIGetByCifG,
} from '../api/IInforme';

export interface IRenderGraphLine {
  className?: string;
  title?: string;
  asnef: IInformeGetResumenByCifG;
  rai: IInformeRAIGetByCifG;
  legend?: string;
}

export interface ITooltipData {
  [index: number]: {
    dataIndex: number;
  };
}
