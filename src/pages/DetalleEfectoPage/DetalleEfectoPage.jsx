import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DetalleEfecto from 'components/DetalleEfecto';

const DetalleEfectoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.tipoEfecto) navigate('/');
  }, [location, navigate]);
  return <DetalleEfecto tipoEfecto={location.state.tipoEfecto} />;
};

export default DetalleEfectoPage;
