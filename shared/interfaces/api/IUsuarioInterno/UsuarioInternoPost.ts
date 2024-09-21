interface IUsuarioInternoPost {
  signUpInternalCommand: {
    email: string;
    emailConfirmationUrl: string;
    firstName: string;
    lastName: string;
    department: string;
    username: string;
  };
}

interface IUsuarioInternoPostResponse {
  errors: [
    {
      code: string;
      description: string;
    }
  ];
  succeeded: boolean;
  email: string;
  userId: string;
  hasPassword: boolean;
  requiresConfirmedEmail: boolean;
}

type IUsuarioInternoPostResponseP = Promise<IUsuarioInternoPostResponse>;

export type {
  IUsuarioInternoPost,
  IUsuarioInternoPostResponse,
  IUsuarioInternoPostResponseP,
};
