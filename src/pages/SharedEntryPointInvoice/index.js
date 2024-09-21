import { connect } from 'react-redux';

import { onModifyCompany, setLoginDataShared } from 'store/actions/actions-api';
import { setCurrentStep } from 'store/actions/actions-stepper';

import SharedEntryPointInvoice from './SharedEntryPointInvoice';

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
      dispatch(setLoginDataShared(payload));
    },
    onModifyCompany: (payload) => {
      dispatch(onModifyCompany(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedEntryPointInvoice);
