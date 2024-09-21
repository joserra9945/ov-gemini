import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { tipoStep } from 'utils/stepsConfig/nuevaOperacionFlow';

import LayoutContext from 'context/LayoutContext';
import GenerarContrato from 'components/GenerarContrato';
import ResumenOperacionFlow from 'components/ResumenOperacionFlow';
import Stepper from 'components/Stepper';
import VerContrato from 'components/VerContrato';
import { setSelectedEffects } from 'store/actions/actions-effect';

const NuevaOperacion = ({ stepper, onSetStep, onSetSelectedEffects }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { entryPointFlow } = params;
  const [idOperacion, setIdOperacion] = useState(null);
  const [contratoDocument, setContratoDocument] = useState();
  const context = useContext(LayoutContext);

  const dispatch = useDispatch();

  const changeStep = useCallback(
    (newStep) => {
      onSetStep({ currentStep: newStep, onBoard: true });
    },
    [onSetStep]
  );

  useEffect(() => {
    if (!entryPointFlow) {
      changeStep(tipoStep.CONTRATO);
    }
  }, [entryPointFlow, changeStep]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedEffects([]));
    };
  }, [dispatch]);

  useEffect(() => {
    if (location?.state?.idOperacion !== undefined)
      setIdOperacion(location.state.idOperacion);
  }, [location.state]);

  useEffect(() => {
    context.setHiddenSidebar(true);
    context.setHiddenHeader(true);
    return () => {
      context.setHiddenSidebar(false);
      context.setHiddenHeader(false);
    };
  }, [context]);

  const renderComponent = () => {
    switch (stepper.currentStep) {
      case tipoStep.RESUMEN_INICIAL:
        return (
          <ResumenOperacionFlow
            setParentEfectos={onSetSelectedEffects}
            onNextStep={() => changeStep(tipoStep.CONTRATO)}
          />
        );
      case tipoStep.CONTRATO:
        return (
          <GenerarContrato
            setIdOperacion={setIdOperacion}
            setContratoDocument={setContratoDocument}
            onPreviousStep={() => {
              navigate('/');
            }}
            onNextStep={() => {
              changeStep(tipoStep.VER_CONTRATO);
            }}
          />
        );

      case tipoStep.VER_CONTRATO:
        return (
          <VerContrato
            idOperacion={idOperacion}
            onPreviousStep={() => {
              changeStep(tipoStep.CONTRATO);
            }}
            contratoDocument={contratoDocument}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Stepper />
      <div className="flex justify-center w-full">{renderComponent()}</div>
    </div>
  );
};

export default NuevaOperacion;
