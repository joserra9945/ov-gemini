import { connect } from 'react-redux';

import { setCurrentStep } from 'store/actions/actions-stepper';

import TableOperacionesActivas from './TableOperacionesActivas';

const mapDispatchToProps = (dispatch) => {
  return {
    onSetStep: (data) => {
      dispatch(setCurrentStep(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(TableOperacionesActivas);
