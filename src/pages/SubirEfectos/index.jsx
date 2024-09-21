import { connect } from 'react-redux';

import { setCurrentStep } from 'store/actions/actions-stepper';

import * as actions from '../../store/actions/actions-effect';

import SubirEfectos from './SubirEfectos';

const mapStateToProps = (state) => {
  return {
    effectsState: state.effectsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStepEffect: (data) => {
      dispatch(actions.setCurrentStepEffect(data));
    },
    onSetInfoEffect: (data) => {
      dispatch(actions.setCurrentEffect(data));
    },
    onResetEfect: () => {
      dispatch(actions.resetEffects());
    },
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubirEfectos);
