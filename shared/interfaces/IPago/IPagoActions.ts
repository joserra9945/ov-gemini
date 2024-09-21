import { ADD, ADD_CUENTA, ADD_PAGO, RESET } from '@shared/utils/constants';

import { IPagoReducer } from './IPagoReducer';

interface IAdd {
  type: typeof ADD_CUENTA | typeof ADD_PAGO | typeof ADD;
  payload?: IPagoReducer;
}

interface IResetPago {
  type: typeof RESET;
  payload?: any;
}

export type IPagoActions = IAdd | IResetPago;
