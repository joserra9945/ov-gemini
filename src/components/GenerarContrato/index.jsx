import { connect } from 'react-redux';

import GenerarContrato from './GenerarContrato';

const mapStateToProps = (state) => ({
  libradorId: state.userState.libradorId,
  selectedEfectos: state.effectsState.selectedEfectos,
});

export default connect(mapStateToProps, null)(GenerarContrato);
