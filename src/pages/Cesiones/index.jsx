import { connect } from 'react-redux';

import { getCurrentLocation } from '../../store/actions/actions-routing';

import Cesiones from './Cesiones';

const mapStateToProps = (state) => ({
  Cesiones: state.apiState.Cesiones ? state.apiState.Cesiones : [],
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      // dispatch(getCesionesByEstado(data))
    },
    onRoute: (data) => {
      dispatch(getCurrentLocation(data));
    },
  };
};

const CesionesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cesiones);

export default CesionesContainer;
