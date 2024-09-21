import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Steps } from 'primereact/steps';
import { items, tipoStep } from 'utils/stepsConfig/nuevaOperacionFlow';

import { tipoDocumentoString } from '@shared/utils/constants';

import { toggleLeftMenu } from 'store/actions/actions-layout';
import { setCurrentStep } from 'store/actions/actions-stepper';

import { urlsSteps } from './steps';

const Stepper = () => {
  const { currentStep } = useSelector((state) => state.stepState);
  const { tipoEfecto } = useSelector((state) => state.effectsState);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkValid = useCallback(() => {
    const res = urlsSteps.find((stepUrl) => stepUrl.indexOf(location.pathname));
    if (!res) return false;
    return true;
  }, [location.pathname]);

  useEffect(() => {
    if (!urlsSteps.includes(location.pathname) && !checkValid()) {
      dispatch(toggleLeftMenu(false));
      dispatch(setCurrentStep({ currentStep: 0, onBoard: false }));
    } else {
      dispatch(toggleLeftMenu(true));
    }
  }, [checkValid, dispatch, location]);

  return (
    <div className="flex w-full my-2 bg-white shadow-sm gap-4 items-center align-middle">
      <figure
        className="h-16 flex justify-center flex-wrap pl-2"
        id="app-logo-button"
        onClick={() => navigate('/', { replace: true })}
      >
        <img alt="Logo de aplicación" src={process.env.REACT_APP_LOGO} />
      </figure>
      <div className="flex justify-center grow">
        <Steps
          activeIndex={currentStep}
          showHeader={false}
          readOnly
          className="w-3/4"
          model={items
            .filter((item) => item.show)
            .map((item) => {
              return {
                label:
                  item.id === tipoStep.ANYADIR_FACTURA_PAGARE
                    ? parseInt(tipoEfecto, 10) ===
                      parseInt(tipoDocumentoString.FACTURA, 10)
                      ? 'Añadir factura'
                      : 'Añadir pagaré'
                    : item.label,
              };
            })}
        />
      </div>
    </div>
  );
};

export default Stepper;
