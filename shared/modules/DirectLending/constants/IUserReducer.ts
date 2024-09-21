type IUserReducer = {
  userState: {
    fetching: boolean;
    identityId?: string;
    token: string;
    logged: boolean;
    error: null;
    userName: string;
    lastName: string;
    userEmail: string;
    refreshToken: string;
    libradorId: string;
    formaJuridicaId: string;
    provinciaId: string;
    cif: string;
    validada: boolean;
    razonSocial: string;
    isAdUser: boolean;
    gestor: null;
  };
};
export type { IUserReducer };
