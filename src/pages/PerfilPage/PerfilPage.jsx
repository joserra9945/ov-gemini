import React from 'react';

import { Perfil } from '../../components/Perfil';
import TablaLibradores from '../../components/Perfil/TablaLibradores';

const PerfilPage = () => {
  return (
    <div className="perfil-page">
      <Perfil />
      <TablaLibradores />
    </div>
  );
};

export default PerfilPage;
