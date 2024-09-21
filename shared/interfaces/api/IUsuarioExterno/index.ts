type IUsuarioExternoPostForLogin = {
  libradorCif: string;
  libradorRazonSocial: string;
  signUpCommand: {
    password: string;
    email: string;
    emailConfirmationUrl: string;
    firstName: string;
    lastName: string;
    product: string;
  };
  telefono: string;
};

type IErrors = {
  code: string;
  description: string;
};

type IToken = {
  expiresIn: number;
  token: string;
};

type IUsuarioExternoPostResponse = {
  errors: IErrors[];
  succeeded: boolean;
  email: string;
  userId: string;
  accessToken: IToken;
  emailConfirmed: boolean;
  firstName: string;
  lastName: string;
  refreshToken: string;
};

type IUsuarioExternoPostResponseP = Promise<IUsuarioExternoPostResponse>;

export type {
  IUsuarioExternoPostForLogin,
  IUsuarioExternoPostResponse,
  IUsuarioExternoPostResponseP,
};
