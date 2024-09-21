import { IEnum } from '@shared/interfaces/IEnum';

interface IEmpresaExternaById {
  id: string;
  cif: string;
  cnaeDescripcion: string;
  cnaeId: number;
  direcciones: Direccione[];
  fechaConstitucion: Date;
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
  tieneKycCompleto: boolean;
  tieneTelefonoYCorreo: boolean;
  urlFicha: string;
  validada: boolean;
  riesgo: IEnum;
}
interface Direccione {
  id: string;
  calle: string;
  codigoPostal: string;
  descripcion: string;
  notificacionesActivas: boolean;
  paisId: number;
  paisNombre: string;
  poblacionId: number;
  poblacionNombre: string;
  provinciaId: number;
  provinciaNombre: string;
  tipoDireccion: IEnum;
}

interface FormasContacto {
  id: string;
  descripcion: string;
  etiquetas: IEnum[];
  origen: number;
  tipo: number;
  valor: string;
}

interface Gestor {
  id: string;
  identityId: string;
  nombre: string;
  departamento: string;
  email: string;
  telefonoMovil: string;
}

export type { IEmpresaExternaById };
