import { connect } from 'react-redux';

import {
  onModifyCompany,
  setLoginAccountsData,
  setLoginDataShared,
} from 'store/actions/actions-api';
import { setCurrentStep } from 'store/actions/actions-stepper';

import SharedEntryPoint from './SharedEntryPoint';

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
    setLoginAccounts: (payload) => {
      dispatch(setLoginAccountsData(payload));
    },
    setLoginData: (payload) => {
      dispatch(setLoginDataShared(payload));
    },
    onModifyCompany: (payload) => {
      dispatch(onModifyCompany(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharedEntryPoint);
