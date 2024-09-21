import { IEnum } from '@shared/interfaces/IEnum';

import {
  Direccione,
  FormasContacto,
  Gestor,
} from './IEmpresaExternaByRazonSocialIdGet';

interface IEmpresaExternaActiva {
  id: string;
  cif: string;
  cnaeDescripcion: string;
  cnaeId: number;
  direcciones: Direccione[];
  fechaConstitucion: string;
  formasContacto: FormasContacto[];
  industriaId: number;
  paisId: number;
  paisNombre: string;
  razonSocial: string;
  tieneDirecciones: boolean;
  tieneRepresentantes: boolean;
  tipoSociedad: IEnum;
  trazaId: string;
  aceptaComunicacionesAutomaticasComoLibrado: boolean;
  aceptaComunicacionesAutomaticasComoLibrador: boolean;
  aceptaTomasDeRazon: boolean;
  datosSocialesValidados: boolean;
  documentosPendientesAmount: number;
  esPublica: boolean;
  gestor: Gestor;
  riesgo: IEnum;
  tieneKycCompleto: boolean;
  tieneTelefonoYCorreo: boolean;
  urlFicha: string;
  validada: boolean;
}

type IEmpresaExternaActivaP = Promise<IEmpresaExternaActiva>;

export type { IEmpresaExternaActiva, IEmpresaExternaActivaP };
