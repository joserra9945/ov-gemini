import { connect } from 'react-redux';

import { clear } from 'store/actions/actions-alert';

import { setFacturaCreada } from '../../store/actions/actions-api';
import * as actionEfect from '../../store/actions/actions-effect';
import { getCurrentLocation } from '../../store/actions/actions-routing';
import {
  getCurrentStep,
  setCurrentStep,
} from '../../store/actions/actions-stepper';

import Operaciones from './OperacionesPage';

const mapStateToProps = (state) => ({
  items: state.alertState.items,
  isFetching: state.apiState.fetching,
  libradorId: state.userState.libradorId,
  isAdUser: state.userState.isAdUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onClear: (itemId) => {
      dispatch(clear(itemId));
    },
    onRoute: (data) => {
      dispatch(getCurrentLocation(data));
    },
    onStep: (data) => {
      dispatch(getCurrentStep(data));
    },
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
    onStepEffect: (data) => {
      dispatch(actionEfect.setCurrentStepEffect(data));
    },
    onSetInfoEffect: (data) => {
      dispatch(actionEfect.setCurrentEffect(data));
    },
    onSetSelectedEffects: (data) => {
      dispatch(actionEfect.setSelectedEffects(data));
    },
    onSetFacturaCreada: (data) => {
      dispatch(setFacturaCreada(data));
    },
  };
};

const OperacionesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Operaciones);

export default OperacionesContainer;
