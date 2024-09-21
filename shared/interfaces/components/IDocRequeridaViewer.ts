import { IEstudioRiesgos } from '../Legacy/IEstudioRiesgos';

export interface IDocRequeridaViewer {
  estudio: IEstudioRiesgos;
  selectedOption: number;
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  selectedTabEfectos: number;
  setSelectedTabEfectos: React.Dispatch<React.SetStateAction<number>>;
}
