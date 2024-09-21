import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/components/Legacy/Button';

const LeftButtonTemplate = () => {
  const navigate = useNavigate();
  return (
    <div className="resumen-footer-left">
      <Button
        id="back"
        onClick={() => navigate('/')}
        label="Guardar y salir"
        color="light"
      />
    </div>
  );
};

LeftButtonTemplate.propTypes = {};

export default LeftButtonTemplate;
