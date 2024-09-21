import { createContext, Dispatch, SetStateAction } from 'react';

import { IPersona } from '@shared/interfaces/IPersona';
import { IRepresentante } from '@shared/interfaces/IRepresentante';

interface IPersonaContext {
  persona: IPersona;
  setPersona: Dispatch<SetStateAction<IPersona>>;
  representanteByPersona: IRepresentante;
  setRepresentanteByPersona: Dispatch<SetStateAction<IRepresentante>>;
  seccionHasData: any;
  setSeccionHasData: Dispatch<
    SetStateAction<boolean[] | { [key: string]: boolean }>
  >;
  esRepresentanteForm: number;
  setEsRepresentanteForm: Dispatch<SetStateAction<number>>;
  comeFromDirectLending: boolean;
}

const PersonaContext = createContext<IPersonaContext>({} as IPersonaContext);
export default PersonaContext;
