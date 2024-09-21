import { createContext } from 'react';

interface IPrasContext {
  empresa: {
    cif: string;
    razonSocial: string;
  };
}

const PrasContext = createContext<IPrasContext>({} as IPrasContext);

export default PrasContext;
