import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UsuarioService from 'utils/services/usuario-service';

import './styles.scss';

const userService = new UsuarioService();
const MySwal = withReactContent(Swal);

const ConfirmEmailPage = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userId) {
      userService.confirmEmail(token, userId).then(() => {
        MySwal.fire({
          title: 'Éxito!',
          text: 'Su cuenta se ha validado correctamente',
          icon: 'success',
          confirmButtonText: 'Ir a la página de inicio',
        }).then(() => {
          window.location.replace(
            `${process.env.REACT_APP_MY_ACCOUNT}/login/ops`
          );
        });
      });
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserId(params.get('user'));
    setToken(encodeURIComponent(params.get('token')));
  }, []);

  return (
    <div className="confirm-email-page">
      {/* <div className="card">Confirm page</div> */}
    </div>
  );
};

export default ConfirmEmailPage;
