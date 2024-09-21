import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePrestamo } from '@shared/hooks';
import useModal from '@shared/hooks/useModal';
import { IPrestamoPost } from '@shared/interfaces/IPrestamo';
import { config as configType } from '@shared/modules/DirectLending/config';

import { IUserReducer } from 'pages/DirectLending/constants/IUserStateReducer';
import { toggleHeader, toggleSidebar } from 'store/reducers/menuReducer';

import { IDirectLendingData } from '../Constants/interfaces';
import { stepForm } from '../Constants/steps';

const useMultiStepForm = () => {
  const { prestamoPost, loading } = usePrestamo();
  const [step, setStep] = useState<number>(stepForm.DIRECT_LENDING);
  const { libradorId } = useSelector((store: IUserReducer) => store.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prestamoRealized, setPrestamoRealized] = useState(false);

  const [config, setConfig] = useState<{ [key: string]: string | number }>({});
  const location = useLocation();

  const handleClick = () => {
    dispatch(toggleHeader(true));
    dispatch(toggleSidebar(true));
    navigate(-1);
  };

  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, toggleModal, closeModal } = useModal(ref);

  const [directLendingData, setDirectLendingData] =
    useState<IDirectLendingData>({} as IDirectLendingData);
  const [handleNext, setHandleNext] = useState<() => void>(() => {});
  const [error, setError] = useState(false);

  const esResumen = useMemo(() => {
    return step === stepForm.RESUMEN;
  }, [step]);

  const changeStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleClickNext = async () => {
    if (step < Object.keys(stepForm).length / 2) {
      switch (step) {
        case stepForm.DIRECT_LENDING:
          handleNext();
          break;
        case stepForm.CESIONES:
          if (!directLendingData.cesiones.length) {
            setError(true);
          } else {
            setError(false);
            setStep(step + 1);
          }
          break;
        case stepForm.FIRMANTES:
          if (!directLendingData.firmantes?.length) {
            setError(true);
          } else {
            setError(false);
            setStep(step + 1);
          }
          break;
        case stepForm.CUENTA_BANCARIA:
          if (!directLendingData.cuentaBancaria?.id) {
            setError(true);
          } else {
            setError(false);
            setStep(step + 1);
          }
          break;
        case stepForm.RESUMEN:
          if (!prestamoRealized) {
            const body: IPrestamoPost = {
              concepto: directLendingData.concepto?.id ?? 0,
              cuentaPagoId: directLendingData.cuentaBancaria.id,
              firmanteIds: directLendingData.firmantes.map(
                (firmante) => firmante.id
              ),
              importeNominal: directLendingData.importe ?? 0,
              libradorId,
              plazoEnMeses: directLendingData.meses?.id ?? 0,
            };
            const res = await prestamoPost(body);
            res && setPrestamoRealized(true);
            res && setStep(step + 1);
          }
          break;
        case stepForm.DOC_REQUERIDA:
          navigate('/prestamos');
          break;
        default:
          setError(false);
          setStep(step + 1);
      }
    }
  };

  const handleClickPrev = () => {
    if (step === stepForm.DIRECT_LENDING) {
      navigate(-1);
    } else {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    dispatch(toggleHeader(false));
    dispatch(toggleSidebar(false));
    return () => {
      dispatch(toggleHeader(true));
      dispatch(toggleSidebar(true));
    };
  }, [dispatch]);

  useEffect(() => {
    if (location && configType) {
      const typeConfig: string = location.pathname
        .slice(1, location.pathname.length)
        .split('/')[0];
      const data = configType[typeConfig];
      if (data) setConfig(data);
    }
  }, [config, location]);

  return {
    handleClick,
    error,
    step,
    config,
    loading,
    setStep,
    changeStep,
    navigate,
    handleClickNext,
    handleClickPrev,
    setDirectLendingData,
    setHandleNext,
    directLendingData,
    handleNext,
    setError,
    isOpen,
    toggleModal,
    closeModal,
    esResumen,
  };
};

export default useMultiStepForm;
