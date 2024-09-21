import { ICuenta } from 'interfaces/ICuenta/ICuenta';
import { IPago } from 'interfaces/IPago/IPago';

export interface IPagoReducer {
  pagos?: IPago[];
  cuenta?: ICuenta;
  empresaInternaId?: string;
}
