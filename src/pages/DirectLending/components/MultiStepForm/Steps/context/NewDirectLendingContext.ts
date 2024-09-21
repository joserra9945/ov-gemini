import { createContext, Dispatch, SetStateAction } from 'react';

import { IDirectLendingData } from '../../Constants/interfaces';

interface INewDirectLendingContext {
  directLendingData: IDirectLendingData;
  setDirectLendingData: Dispatch<SetStateAction<IDirectLendingData>>;
  setHandleNext: Dispatch<SetStateAction<() => void>>;
  handleNext: () => void;

  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

const NewDirectLendingContext = createContext<INewDirectLendingContext>(
  {} as INewDirectLendingContext
);
export default NewDirectLendingContext;
