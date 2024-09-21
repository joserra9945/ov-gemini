import { ComponentClass, FunctionComponent } from 'react';

export interface PrasTabProps {
  empresa?: { cif: string; razonSocial: string };
  mostrarBotonCargos?: boolean;
  NoDataComponent?: React.ReactNode;
  inactivos?: boolean;
  defaultAccordion?: string;
}

export interface ITabItems {
  label: string;
  id: number;
  fullWidth: boolean;
  body: string | FunctionComponent<any> | ComponentClass<any, any>;
  disabled?: boolean;
}

export interface IRetirLastPurshase {
  fechaUltimaActualizacion: string;
  usuario: string;
  fechaCompra: string;
  error: boolean;
}

export interface IRetirTitularType {
  id: number;
  description: string;
}

export interface IRetirSociedadInterveniente {
  codigoPaisNacionalidad: string;
  denominacion: string;
  domicilio: string;
  nif: string;
  nivel: string;
}

export interface IRetirOwner {
  codigoPaisNacionalidad: string;
  codigoPaisResidencia: string;
  dni: string;
  fechaNacimiento: string;
  nombre: string;
  participacionDirecta: number;
  participacionIndirecta: number;
  tipo: IRetirTitularType;
  sociedadesIntervinientes: IRetirSociedadInterveniente[];
}

export interface IRetirPurshaseProps {
  lastPurshase: IRetirLastPurshase;
  handleTitularesResponse: (data: IRetirOwnersResponse) => void;
  cif: string;
}

export interface IRetirOwnersProps {
  owners: IRetirOwner[];
  company: string;
}

export interface IRetirOwnerProps {
  owner: IRetirOwner;
  company: string;
}

export interface IRetirModalProps {
  modalOpened: string;
  setModalOpened: React.Dispatch<React.SetStateAction<string>>;
  data: IRetirLastPurshase;
  handleTitularesResponse: (data: IRetirOwnersResponse) => void;
  cif: string;
}

export interface IRetirOwnersResponse {
  id: string;
  creationTime: string;
  lastModificationTime: string;
  empresaCif: string;
  fechaUltimaActualizacion: string;
  titulares: IRetirOwner[];
  userIdentityId: string;
}

export interface IRetirUserResponse {
  id: string;
  creationTime: string;
  departmentId: string;
  departmentName: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}
