import { OverlayPanel } from 'primereact/overlaypanel';

import { IEmpresaExternaById } from '../api/IEmpresaExterna';
import { ILimiteRiesgoByScoringGet } from '../api/ILimiteRiesgo';
import { IEstudioRiesgos } from '../Legacy/IEstudioRiesgos';

export interface IData {
  fechaVencimiento: Date | string;
}

export interface IEstudioDetalleHeaderProps {
  estudio: IEstudioRiesgos;
  fetchEstudio(): Promise<void>;
  librador: IEmpresaExternaById;
  limiteRiesgo?: ILimiteRiesgoByScoringGet;
  setIsShowingDevolverPagareDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export interface IEstudioDetallesHeaderModal {
  libradorRazonSocial: string;
  libradoRazonSocial: string;
  tableToShow: number;
}
export interface IEstudioDetallesHeaderSubMenu {
  onIconClick(arg: number): void;
  overlayRef: React.RefObject<OverlayPanel>;
  estudio: IEstudioRiesgos;
  setIsShowingDevolverPagareDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setmensajeriaInternaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEstudioDetalleSideBar {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  esPublica: boolean;
  isDirectLending?: boolean;
}
