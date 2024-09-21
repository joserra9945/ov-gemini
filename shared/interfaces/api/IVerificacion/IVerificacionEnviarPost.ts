interface IVerificacionEnviarPost {
  id: string;
  textoAdicional: string;
  emailsDestinatarios: string[];
  formFiles: Array<{ file: File }>;
}

interface IVerificacionResponderPost {
  id: string;
  respuesta: string;
  emailsDestinatarios: string[];
  responderALibrado: boolean;
}

export type { IVerificacionEnviarPost, IVerificacionResponderPost };
