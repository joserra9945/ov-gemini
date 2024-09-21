import { connect } from 'react-redux';

import MiDocumentacion from './MiDocumentacion';

const mapStateToProps = (state) => {
  return {
    libradorId: state.userState.libradorId,
  };
};

export default connect(mapStateToProps, null)(MiDocumentacion);
