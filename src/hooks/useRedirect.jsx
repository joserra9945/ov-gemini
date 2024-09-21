import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { logout } from 'store/actions/actions-api';

const MySwal = withReactContent(Swal);

const useRedirect = () => {
  const [authError, setAuthError] = useState(false);
  const dispatch = useDispatch();

  const redirectToAccountsLogin = () => {
    window.location.replace(`${process.env.REACT_APP_MY_ACCOUNT}/login/ops`);
  };

  const handleSharedEntryError = (message) => {
    setAuthError(true);
    MySwal.fire({
      title: '¡Error en autenticación!',
      html: `<p>No se ha podido completar el proceso de autenticación. ¡Vuelve a intentarlo más tarde por favor!</p><p><i><small>(${message})</small></i></p>`,
      icon: 'error',
      confirmButtonText: 'Volver a iniciar sesión',
      customClass: {
        container: 'bg-transparent',
        confirmButton: 'bg-primary shadow-2xl',
        title: 'text-danger',
      },
      allowOutsideClick: false,
    }).then(() => {
      setAuthError(false);
      dispatch(logout());
      redirectToAccountsLogin();
    });
  };

  return {
    authError,
    redirectToAccountsLogin,
    handleSharedEntryError,
  };
};

export default useRedirect;
