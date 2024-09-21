export interface IFormasDeContacto {
  id: string;
  descripcion: string;
  origen: number;
  tipo: number;
  valor: string;
}

export interface IPersona {
  id: string;
  creationTime: Date | string;
  nombre: string;
  apellidos: string;
  departamento: string;
  empresaId: string;
  origen: number;
  puesto: string;
  formasDeContacto: IFormasDeContacto[];
}

export interface IFields {
  id: number;
  title: string;
  body: JSX.Element;
  className?: string;
}
