import { connect } from 'react-redux';

import { resetStepper } from '../../store/actions/actions-stepper';

import VerContrato from './VerContrato';

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => {
      dispatch(resetStepper());
    },
  };
};

export default connect(null, mapDispatchToProps)(VerContrato);
