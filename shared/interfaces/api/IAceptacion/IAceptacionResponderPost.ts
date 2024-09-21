interface IAceptacionResponderPost {
  id: string;
  respuesta: string;
  emailsDestinatarios: string[];
  responderALibrado: boolean;
}

interface IAceptacionEnviarPost {
  id: string;
  textoAdicional: string;
  emailsDestinatarios: string[];
  formFiles: Array<{ file: File }>;
}

export type { IAceptacionEnviarPost, IAceptacionResponderPost };
