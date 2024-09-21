import { createContext } from 'react';
import { AxiosRequestConfig } from 'axios';

interface IPrasContext {
  prasConfig: AxiosRequestConfig;
}

const PrasContext = createContext<IPrasContext>({} as IPrasContext);

export default PrasContext;
