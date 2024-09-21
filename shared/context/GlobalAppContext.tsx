import { createContext, Dispatch, SetStateAction } from 'react';

import { IAuthUserPostResponse } from '@shared/interfaces/api/IAuth';

interface IGlobalAppContext {
  userState: IAuthUserPostResponse;
  setUserState: Dispatch<SetStateAction<IAuthUserPostResponse>>;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

const GlobalAppContext = createContext<IGlobalAppContext>(
  {} as IGlobalAppContext
);

export default GlobalAppContext;
