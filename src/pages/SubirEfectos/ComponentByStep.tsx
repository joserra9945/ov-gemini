import { FC, useCallback, useContext, useEffect, useMemo } from 'react';

import { tipoDocumentoString } from '@shared/utils/constants';

import LayoutContext from 'context/LayoutContext';
import Factura from 'components/Factura';
import OnboardingContainer from 'components/Onboarding/OnboardingContainer';
import Pagare from 'components/Pagare';
import Stepper from 'components/Stepper';

import { CurrentFileContext } from './context';

interface IProps {
  step: any;
  typeOfDocument: any;
  anyadir: any;
}

const ComponentByStep: FC<IProps> = ({ step, typeOfDocument, anyadir }) => {
  const { currentFiles, setCurrentFiles } = anyadir;
  const context = useContext(LayoutContext);

  const contextValue = useMemo(
    () => ({ currentFiles, setCurrentFiles }),
    [currentFiles, setCurrentFiles]
  );

  useEffect(() => {
    context.setHiddenSidebar(true);
    context.setHiddenHeader(true);
    return () => {
      context.setHiddenSidebar(false);
      context.setHiddenHeader(false);
    };
  }, [context]);

  const render = useCallback(() => {
    switch (step) {
      case 0:
        return <OnboardingContainer />;
      case 1:
        if (
          typeOfDocument === parseInt(tipoDocumentoString.FACTURA, 10) ||
          typeOfDocument === parseInt(tipoDocumentoString.FACTURA_PAGARE, 10)
        ) {
          return (
            <CurrentFileContext.Provider value={contextValue}>
              <div className="flex flex-col w-full h-full gap-4">
                <Stepper />
                <Factura />
              </div>
            </CurrentFileContext.Provider>
          );
        }
        if (typeOfDocument === parseInt(tipoDocumentoString.PAGARE, 10)) {
          return (
            <CurrentFileContext.Provider value={contextValue}>
              <div className="flex flex-col w-full h-full gap-4">
                <Stepper />
                <Pagare />
              </div>
            </CurrentFileContext.Provider>
          );
        }
        break;
      default:
        return <OnboardingContainer />;
    }
    return null;
  }, [contextValue, step, typeOfDocument]);

  return render();
};

export default ComponentByStep;
