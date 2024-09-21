import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@shared/components/Button';
import { ModalCambiarEmail } from '@shared/components/ModalCambiarEmail';
import { useAuthentication } from '@shared/hooks';

import Card from 'components/Hocs/Card';

import './styles.scss';

const Perfil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModalCambiarEmail, setShowModalCambiarEmail] = useState(false);
  const [user, setUser] = useState();
  const { userEmail, userName, lastName, userId } = useSelector(
    (state) => state.userState
  );

  const { authUserGet } = useAuthentication();

  const fetchDataUser = useCallback(async () => {
    setIsLoading(true);
    const res = await authUserGet(userId);
    if (res) {
      setUser(res);
      setIsLoading(false);
    }
  }, [authUserGet, userId]);

  useEffect(() => {
    fetchDataUser();
  }, [fetchDataUser, userId, user?.email]);

  return (
    <Card className="bg-background mb-4">
      <section className="bg-white p-6 rounded-md shadow">
        <h3 className="text-2xl font-medium flex items-center mb-4 text-black">
          Perfil de usuario
        </h3>
        <p className="mb-2">
          Aquí podrás encontrar información relacionada con tu usuario
        </p>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <div className="font-medium">Nombre:</div>
            <div>
              {userName} {lastName}
            </div>
          </div>
          <div className="flex-1 flex-row">
            <div className="font-medium">Email:</div>
            <div className="truncate">{user?.email || userEmail}</div>
          </div>
          <div className="flex flex-row">
            <Button
              text="Cambiar email"
              onClick={() => setShowModalCambiarEmail(true)}
              type="button"
              loading={isLoading}
            />
          </div>
        </div>
      </section>
      {showModalCambiarEmail && (
        <ModalCambiarEmail
          userId={userId}
          showModalCambiarEmail={showModalCambiarEmail}
          handleCloseModalShowCambiarEmail={setShowModalCambiarEmail}
          isLoading={isLoading}
          fetchDataUser={fetchDataUser}
        />
      )}
    </Card>
  );
};

export default Perfil;
