import { connect } from 'react-redux';

import * as actionEfect from '../../store/actions/actions-effect';
import {
  getCurrentStep,
  setCurrentStep,
} from '../../store/actions/actions-stepper';

import Facturas from './Factura';

const mapStateToProps = (state, ownProps) => ({
  stepper: state.stepState,
  dataFile: ownProps.dataFile,
  effectsState: state.effectsState,
  libradorCif: state.userState.cif,
  libradoCif: state?.effectsState?.cif,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onStep: (step) => {
      dispatch(getCurrentStep(step));
    },
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
    onSetCurrentEffect: (data) => {
      dispatch(actionEfect.setCurrentEffect(data));
    },
    switchEffectView: (data) => {
      dispatch(actionEfect.switchEffectView(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facturas);
