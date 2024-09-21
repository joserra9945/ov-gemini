import { Dispatch, SetStateAction } from 'react';

import { IDocumentoDeEfectoVistaClienteByEfectoIdGet } from '../api/IDocumentoDeEfecto';
import {
  IEfectoRevisablesByEstudioIdGet,
  IEfectoRevisablesByEstudioIdGetG,
} from '../api/IEfecto';

import { IData } from './IEstudioDetalle';

export interface IEfectosParteDerecha {
  currentPDFDocument: string;
  currentDocument: IEfectoRevisablesByEstudioIdGet;
  efectos: IEfectoRevisablesByEstudioIdGetG;
  fetchEstudio: () => void;
  data: IData;
  showCardEfectos: boolean;
  setShowCardEfectos: Dispatch<SetStateAction<boolean>>;
  currentEndosoPdf?: string;
  endosoDePagare?: IDocumentoDeEfectoVistaClienteByEfectoIdGet[];
}
