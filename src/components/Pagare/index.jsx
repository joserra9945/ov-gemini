import { connect } from 'react-redux';

import * as actionEfect from '../../store/actions/actions-effect';
import {
  getCurrentStep,
  setCurrentStep,
} from '../../store/actions/actions-stepper';

import Pagare from './Pagare';

const mapStateToProps = (state, ownProps) => ({
  stepper: state.stepState,
  dataFile: ownProps.dataFile,
  effectsState: state.effectsState,
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

export default connect(mapStateToProps, mapDispatchToProps)(Pagare);
