interface UsuarioInternoLoggedGet {
  identityId: string;
  nombre: string;
  id: string;
}

type UsuarioInternoLoggedGetP = Promise<UsuarioInternoLoggedGet>;

export type { UsuarioInternoLoggedGet, UsuarioInternoLoggedGetP };
