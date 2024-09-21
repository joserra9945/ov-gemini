import { connect } from 'react-redux';

import { onModifyCompany } from 'store/actions/actions-api';

import UserAdLandingPage from './UserAdLandingPage';

const mapStateToProps = (state) => ({
  identityId: state.userState.identityId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyCompany: (payload) => {
      dispatch(onModifyCompany(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdLandingPage);
