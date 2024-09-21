export type IConfig = {
  producto: string;
  productoSingular: string;
  productoTitulo: string;
  productoTituloSingular: string;
  tipo: number;
};

export interface IData {
  [key: string]: { [key: string]: string | number };
}

export const config: IData = {
  prestamos: {
    producto: 'préstamos',
    productoTitulo: 'Préstamos',
    productoSingular: 'préstamo',
    productoTituloSingular: 'Préstamo',
    tipo: 1,
  },
  ppp: {
    producto: 'PPP',
    productoTitulo: 'PPP',
    productoSingular: 'PPP',
    productoTituloSingular: 'PPP',
    tipo: 2,
  },
  duplifactor: {
    producto: 'Duplifactor',
    productoTitulo: 'Duplifactor',
    productoSingular: 'Duplifactor',
    productoTituloSingular: 'Duplifactor',
    tipo: 3,
  },
};
