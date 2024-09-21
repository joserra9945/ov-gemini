import { connect } from 'react-redux';

import { setSelectedEffects } from 'store/actions/actions-effect';
import { setCurrentStep } from 'store/actions/actions-stepper';

import NuevaOperacion from './NuevaOperacion';

const mapStateToProps = (state) => ({
  stepper: state.stepState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
    onSetSelectedEffects: (data) => {
      dispatch(setSelectedEffects(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevaOperacion);
