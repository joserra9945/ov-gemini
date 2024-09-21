import { IBaseApiReducer } from '../api/IApi/IBaseApiReducer';

export interface IUserReducer<E = boolean> extends IBaseApiReducer<E> {
  id?: string;
  token?: string;
  logged: boolean;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
  role?: string;
  department?: string;
  expiresIn?: number;
  userId?: string;
  email?: string;
  superAdmin?: boolean;
}
