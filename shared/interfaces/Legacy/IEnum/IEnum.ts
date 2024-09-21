export interface IEnum {
  disabled?: boolean;
  id: number;
  description: string;
}

export interface IEnumPaises {
  id: number;
  nombre: string;
}

export interface IEnumNombreCompleto {
  id: string;
  nombreCompleto: string;
}

type IEnumArrayP = Promise<IEnum[]>;

export type { IEnumArrayP };
