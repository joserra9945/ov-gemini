import { IAuth } from '../IAuth';

import { IRequest } from './IRequest';

export interface IAuthRequest extends IRequest {
  data: IAuth;
}
