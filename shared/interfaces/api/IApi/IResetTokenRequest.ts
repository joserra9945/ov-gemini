import { IResetToken } from '../IAuth/IResetToken';

import { IRequest } from './IRequest';

export interface IResetTokenRequest extends IRequest {
  data: IResetToken;
}
