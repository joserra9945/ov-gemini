import { connect } from 'react-redux';

import * as actionEfect from '../../store/actions/actions-effect';
import { getCurrentStep } from '../../store/actions/actions-stepper';

import Onboarding from '.';

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
    onStepEffect: (data) => {
      dispatch(actionEfect.setCurrentStepEffect(data));
    },
    onSetInfoEffect: (data) => {
      dispatch(actionEfect.setCurrentEffect(data));
    },
  };
};

const OnboardingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);

export default OnboardingContainer;
