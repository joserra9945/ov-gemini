interface ISolicitudDeCompraByCif {
  id: string;
  fecha: string | Date;
  userIdentityId: string;
}

type ISolicitudDeCompraByCifGP = Promise<ISolicitudDeCompraByCif>;

export type { ISolicitudDeCompraByCif, ISolicitudDeCompraByCifGP };
