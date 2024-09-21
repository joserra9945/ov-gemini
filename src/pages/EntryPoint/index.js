import { connect } from 'react-redux';

import { setLoginData } from 'store/actions/actions-api';
import { setCurrentStep } from 'store/actions/actions-stepper';

import EntryPoint from './EntryPoint';

const mapStateToProps = (state) => {
  return {
    logged: state.userState.logged,
    error: state.userState.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
    setLoginData: (payload) => {
      dispatch(setLoginData(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryPoint);
