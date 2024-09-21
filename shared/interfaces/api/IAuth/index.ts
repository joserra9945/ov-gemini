import { IAuthUserGet, IAuthUserGetP } from './IAuthUserGet';
import { IAuthUserPut } from './IAuthUserPut';

export interface IAuth {
  email: string;
  password: string;
  product?: string;
  ubicacion?: {
    id: string;
  };
  lockoutUrl?: string;
}

export interface IAuthUserPostResponse {
  accessToken: {
    expiresIn: number;
    token: string;
  };
  department: string;
  email: string;
  emailConfirmed: boolean;
  errors: any[];
  firstName: string;
  isAdUser: boolean;
  lastName: string;
  refreshToken: string;
  succeeded: boolean;
  userId: string;
  userName: string;
  superAdmin?: boolean;
}

export interface IRefreshTokenPost {
  accessToken: string;
  product: string;
  refreshToken: string;
}

export interface IRefreshTokenPostResponse {
  accessToken: {
    expiresIn: number;
    token: string;
  };
  refreshToken: string;
  email: string;
  userId: string;
  errors: any[];
  succeded: boolean;
}

type IAuthUserPostResponseP = Promise<IAuthUserPostResponse>;

export type {
  IAuthUserGet,
  IAuthUserGetP,
  IAuthUserPostResponseP,
  IAuthUserPut,
};
