import { connect } from 'react-redux';

import { setCurrentStep } from 'store/actions/actions-stepper';

import {
  resetEffects,
  setCurrentEffect,
  setCurrentStepEffect,
  switchEffectView,
} from '../../store/actions/actions-effect';

import Efectos from './Efectos';

const mapStateToProps = (state) => {
  return {
    effectsState: state.effectsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStepEffect: (data) => {
      dispatch(setCurrentStepEffect(data));
    },
    onSetInfoEffect: (data) => {
      dispatch(setCurrentEffect(data));
    },
    onResetEfect: () => {
      dispatch(resetEffects());
    },
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
    switchEffectView: (data) => {
      dispatch(switchEffectView(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Efectos);
