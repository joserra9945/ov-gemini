import { connect } from 'react-redux';

import { login, setLoginData } from 'store/actions/actions-api';

import * as actionEfect from '../../store/actions/actions-effect';

import LoginNew from './LoginNew';

const mapStateToProps = (state) => {
  return {
    logged: state.userState.logged,
    isAdUser: state.userState.isAdUser,
    error: state.userState.error,
    fetching: state.userState.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetInfoEffect: (data) => {
      dispatch(actionEfect.setCurrentEffect(data));
    },
    onRequestLogin: (data) => {
      dispatch(login(data));
    },
    setLoginData: (payload) => {
      dispatch(setLoginData(payload));
    },
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginNew);

export default LoginContainer;
