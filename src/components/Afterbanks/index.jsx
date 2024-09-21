import { connect } from 'react-redux';

import Afterbanks from './Afterbanks';

const mapStateToProps = (state, ownProps) => ({
  onPreviousStep: ownProps.onPreviousStep,
  onNextStep: ownProps.onNextStep,
  cif: state.userState.cif,
  razonSocial: state.userState.razonSocial,
  libradorId: state.userState.libradorId,
  cancelFunc: ownProps.cancelFunc,
  iban: ownProps.iban || false,
  disabledButton: ownProps.disabledButton || false,
});

export default connect(mapStateToProps, null)(Afterbanks);
