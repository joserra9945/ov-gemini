import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { faQuestion } from '@fortawesome/pro-light-svg-icons';

import ConfirmDialogModal from '@shared/components/ConfirmDialogModal';
import usePreciseTimer from '@shared/hooks/useTimer';

import { GlobalTokenSender } from 'components/GlobalTokenSender/GlobalTokenSender';
import { resetAlerts } from 'store/actions/actions-alert';
import { logout, resetToken } from 'store/actions/actions-api';

import CreateRoutes from './routes/routes';

import './App.scss';

const SIX_MINUTES = 6;

const App = ({
  logged,
  layoutWidth,
  onResetToken,
  onResetAlerts,
  onLogout,
  stepper,
}) => {
  const [visible, setVisible] = useState(false);
  const [activeTimer, setActiveTimer] = useState(false);
  const { isAdUser } = useSelector((state) => state.userState);

  const accept = () => {
    const refresh = sessionStorage.getItem('r');
    const t = sessionStorage.getItem('token');
    if (!t) {
      onLogout();
      onResetAlerts();
    }
    if (t && refresh) {
      onResetToken(t, refresh);
    }
  };

  const checkExpiracy = () => {
    if (isAdUser) {
      accept();
    } else {
      const expireAt = sessionStorage.getItem('expire');
      if (expireAt) {
        const differenceInMinutes = moment(expireAt).diff(moment(), 'minutes');
        if (differenceInMinutes < 0) {
          onLogout();
          onResetAlerts();
        }
        if (differenceInMinutes < SIX_MINUTES) {
          setVisible(true);
        }
      }
    }
  };

  usePreciseTimer(checkExpiracy, 300000, activeTimer);

  const reject = () => {
    onLogout();
    onResetAlerts();
  };

  useEffect(() => {
    setActiveTimer(logged);
  }, [logged]);

  return (
    <div className="w-full h-full">
      <GlobalTokenSender>
        <CreateRoutes layoutWidth={layoutWidth} stepper={stepper} />
        <ConfirmDialogModal
          isOpen={visible}
          onClose={() => setVisible(false)}
          bodyText="Por seguridad, su sesión está a punto de caducar. ¿Quiere continuar conectado?"
          labelConfirm="Sí"
          labelCancel="No"
          onConfirm={accept}
          onDeny={reject}
          iconHeader={faQuestion}
          colorIconHeader="primary"
        />
      </GlobalTokenSender>
    </div>
  );
};

App.propTypes = {
  logged: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  logged: state.userState.logged,
  token: state.userState.token,
  layoutWidth: state.layoutState.layoutWidth,
  stepper: state.stepState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onResetAlerts: () => {
      dispatch(resetAlerts());
    },
    onResetToken: (token, refreshToken) => {
      dispatch(resetToken(token, refreshToken));
    },
    onLogout: () => {
      dispatch(logout());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
